import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';


function SubCategory(props) {

    const [open, setOpen] = useState(false);
    const [data , setData] = useState([]);
    const [categories , setCategories] = useState([]);
    const [update , setUpdate] = useState(null);
   
    const getdata = async()=>{
     
        try {
            await axios.get("http://localhost:9000/api/v1/subcategories/list-subcategories")
            .then((response)=>{
                console.log(response.data.data);
                setData(response.data.data);
            })
            .catch((error)=>{
                console.log(error);
            })  
        } catch (err) {
            console.log(err);
        }
        try {
            await axios.get("http://localhost:9000/api/v1/categories/list-categories")
            .then((response)=>{
                console.log(response.data.data);
                setCategories(response.data.data);
            })
            .catch((error)=>{
                console.log(error);
            }) 

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getdata();
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(null);
        formik.resetForm();
    };

    const handleDelete = async(id) =>{
        console.log(id);
        try {
            await axios.delete("http://localhost:9000/api/v1/subcategories/delete-subcategory/" + id)
            .then((response)=>{
                console.log(response.data.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
        getdata();
    }

    const handleEdit = (data) =>{
        console.log(data);
        formik.setValues(data);
        setOpen(true);

        setUpdate(data._id);

    }
    const handleUpdate = async(data) =>{
        console.log(data);

        try {
            await axios.put("http://localhost:9000/api/v1/subcategories/update-subcategory/" + data._id, data)
            .then(res => {
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
        } catch (error) {
            console.log(error);
        }
        getdata();
        
    }
    const handleAdd = async(data) => {

        try {
            await axios.post("http://localhost:9000/api/v1/subcategories/add-subcategory",data)
            .then((response)=>{
                console.log(response.data.data);
            })
            .catch((error)=>{
               console.log(error);
            })
        } catch (err) {
            console.log(err);
        }
        getdata();

    }
    let subcategorySchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(30, 'use a valid name'),
        description: string().required().min(10, 'Message is  too short')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            categories_id: ''
        },
        validationSchema: subcategorySchema,
        onSubmit: (values, { resetForm }) => {
            handleClose();
            resetForm();

            if(update){
                handleUpdate(values);
            }else{
                handleAdd(values);
            }
        },
 
    });
    const columns = [
        { field: 'categories_id', headerName: 'Category', width: 300 },
        { field: 'name', headerName: 'Subcategory', width: 200 },
        { field: 'description', headerName: 'discription', width: 600 },
        {
            field: 'action',
            headerName: 'Delete',
            sortable: false,
            width: 250,
            renderCell: (params) => (
            <>
             <Button className='py-1 border'><DeleteIcon className='text-danger' onClick={()=>handleDelete(params.row._id)} /></Button>
             <Button className='py-1 border'><EditIcon className='text-success' onClick={()=>handleEdit(params.row)} /></Button>
            </>),
        },

    ];  
    
    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

    return (

        <>
            <React.Fragment >
                <div className='m-4 mx-5 d-flex justify-content-end'>
                    <Button variant="outlined" color='primary' onClick={handleClickOpen}>
                        Add SubCategory
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle className='text-cente'> SubCategory </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent style={{ width: 500 }}>
                        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                         margin="dense"
                         name="categories_id"
                         label="category"
                         fullWidth
                         variant="standard"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         error={errors.categories_id && touched.categories_id ? true : false}
                         >
                            {categories.map((v)=>(
                                <MenuItem value = {v._id}> {v.name} </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.categories_id}</FormHelperText>

                            <TextField
                                margin="dense"
                                name="name"
                                label="Enter name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={errors.name && touched.name ? true : false}
                                helperText={errors.name}
                            />

                            <TextField
                                margin="dense"
                                name="description"
                                label="Enter category description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={errors.description}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </DialogContent>

                    </form>
                </Dialog>
            </React.Fragment>

            <div className='p-5' style={{ width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    checkboxSelection
                    getRowId={(row)=>row._id}
                />
            </div>
        </>
    );
}
export default SubCategory;