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
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(null);
    // console.log(update);

    const getdata = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/v1/categories/list-categories");
            const data = await res.json();
            console.log(data.data);
            setData(data.data);

        } catch (err) {
            console.log(err);
        }
        // let ldata = JSON.parse(localStorage.getItem('category'));

        // if(ldata){
        //     setData(ldata);
        // }

    }

    useEffect(() => {
        getdata();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(null);
        formik.resetForm();
    };

    const handleDelete = async (id) => {

        try {
            await fetch("http://localhost:8000/api/v1/categories/delete-categories/" + id, {
                method: "DELETE"
            });
        } catch (error) {
            console.log(error);
        }

        getdata();


        // console.log(id);

        // let newData = data.filter((item) => item.id !== id);
        // localStorage.setItem('category', JSON.stringify(newData));

    }

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data);
        setOpen(true);

        setUpdate(data._id);

    }
    const handleUpdate = async (data) => {
        console.log(data);

        try {
            await fetch("http://localhost:8000/api/v1/categories/update-categories/" + data._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }
        getdata();
    }

    let categorySchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(15, 'use a valid name'),
        description: string().required().min(10, 'Message is  too short')
    })

    const handleAdd = async (data) => {
        try {
            await fetch("http://localhost:8000/api/v1/categories/add-categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            })
        } catch (err) {
            console.log(err);
        }
        getdata();

    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            handleClose();
            resetForm();

            if (update) {
                handleUpdate(values);
            } else {
                handleAdd(values);
            }
        },

    });
    const columns = [
        { field: 'name', headerName: 'category', width: 200 },
        { field: 'description', headerName: 'discription', width: 200 },
        {
            field: 'action',
            headerName: 'Delete',
            sortable: false,
            renderCell: (params) => (
                <>
                    <DeleteIcon onClick={() => handleDelete(params.row._id)} />
                    <EditIcon onClick={() => handleEdit(params.row)} />
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
                                name="name"
                                id="name"
                                label="Enter category"
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
                                id="description"
                                label="Enter category discription"
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
                    getRowId={(row) => row._id}
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