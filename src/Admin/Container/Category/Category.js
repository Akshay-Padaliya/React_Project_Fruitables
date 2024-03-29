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


function Category(props) {

    const [open, setOpen] = useState(false);
    const [data , setData] = useState([]);
    const [update , setUpdate] = useState(null);
    // console.log(update);
   
    const getdata = ()=>{
        let ldata = JSON.parse(localStorage.getItem('category'));

        if(ldata){
            setData(ldata);
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

    const handleDelete = (id) =>{
        console.log(id);

        let newData = data.filter((item) => item.id !== id);
        localStorage.setItem('category', JSON.stringify(newData));

        setData(newData);
    }

    const handleEdit = (data) =>{
        console.log(data);
        formik.setValues(data);
        setOpen(true);

        setUpdate(data.id);

    }
    const handleUpdate = (data) =>{
        console.log(data);
        
        let localData = JSON.parse(localStorage.getItem('category'));
        console.log(localData);
  
        let index = localData.findIndex((a)=> a.id == update);
        console.log(index);

        localData[index] = values;
        localStorage.setItem('category', JSON.stringify(localData));

        getdata();
    }

    let categorySchema = object({
        category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(15, 'use a valid name'),
        discription: string().required().min(10, 'Message is  too short')
    })

    const handleAdd = (data) => {

        const rNo = Math.floor(Math.random()*1000);
        console.log(data);

        let localData = JSON.parse(localStorage.getItem('category'));
        console.log(localData);

        if (localData) {
            localData.push({...data , id: rNo});
            localStorage.setItem('category', JSON.stringify(localData));
        } else {
            localStorage.setItem('category', JSON.stringify([{...data , id: rNo}]));
        }

        getdata();

    }

    const formik = useFormik({
        initialValues: {
            category: '',
            discription: '',
        },
        validationSchema: categorySchema,
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
        { field: 'category', headerName: 'category', width: 200 },
        { field: 'discription', headerName: 'discription', width: 200 },
        {
            field: 'action',
            headerName: 'Delete',
            sortable: false,
            renderCell: (params) => (
            <>
            <DeleteIcon onClick={()=>handleDelete(params.row.id)} />
            <EditIcon onClick={()=>handleEdit(params.row)} />
            </>),
        },

    ];  
    
    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

    return (

        <>
            <React.Fragment >
                <div className='m-4 mx-5 d-flex justify-content-end'>
                    <Button variant="outlined" color='primary' onClick={handleClickOpen}>
                        Add Category
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle className='text-cente'> Category </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent style={{ width: 500 }}>

                            <TextField
                                margin="dense"
                                name="category"
                                label="Enter category"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                                error={errors.category && touched.category ? true : false}
                                helperText={errors.category}
                            />

                            <TextField
                                margin="dense"
                                name="discription"
                                label="Enter category discription"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discription}
                                error={errors.discription && touched.discription ? true : false}
                                helperText={errors.discription}
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
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}
export default Category;