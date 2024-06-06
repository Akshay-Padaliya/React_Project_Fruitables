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
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../../../Redux/Action/category.action';


function Category(props) {

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);

    const dispatch = useDispatch();
    const category = useSelector((state) => state.Categories);
    console.log(category.categories);

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(null);
        formik.resetForm();
    };

    const handleDelete = (id) => {
        // console.log(id);
        dispatch(deleteCategory(id))
    }

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data);
        setOpen(true);

        setUpdate(data._id);

    }

    let categorySchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(20, 'use a valid name'),
        description: string().required().min(10, 'Message is  too short')
    })

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
                dispatch(updateCategory(values))
            } else {
                dispatch(addCategory(values))
            }
        },

    });
    const columns = [
        { field: 'name', headerName: 'category', width: 200 },
        { field: 'description', headerName: 'discription', width: 400 },
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
                    rows={category.categories}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </>
    );
}
export default Category;