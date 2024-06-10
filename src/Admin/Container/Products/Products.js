import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { filteredSubCategory } from '../../../Redux/Slice/subcategory.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../Redux/Action/category.action';
import { addproduct, deleteproduct, getproducts, updateproduct } from '../../../Redux/Slice/products.slice';


function Products(props) {

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);

    const subc = useSelector((state) => state.SubCategories)
    console.log(subc.subCategories);

    const category = useSelector((state) => state.Categories);
    console.log(category.categories);

    const productsDATA = useSelector((state) => state.products);
    console.log(productsDATA.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getproducts())
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

    const handleDelete = async (id) => {
        // console.log(id);
        dispatch(deleteproduct(id))
    }

    const handleEdit = (data) => {
        // console.log(data);
        formik.setValues(data);
        setOpen(true);

        setUpdate(data._id);

    }

    const handleCategory = () => {
       const id =  document.getElementsByName("categories_id").value
        console.log(values.categories_id,id);
        dispatch(filteredSubCategory(id));
    }

    let subcategorySchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(30, 'use a valid name'),
        description: string().required().min(10, 'Message is  too short')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            categories_id: '',
        },
        validationSchema: subcategorySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateproduct(values))
            } else {
                dispatch(addproduct(values))
            }
            handleClose();
            resetForm();

        },

    });
    const columns = [
        {
            field: 'categories_id', headerName: 'Category', width: 300,
            renderCell: (params) => {
                const categ = category.categories.find((v) => v._id == params.row.categories_id)
                // console.log(categ);
                return categ ? categ.name : ''
            }
        },
        { field: 'name', headerName: 'Subcategory', width: 200 },
        { field: 'description', headerName: 'discription', width: 600 },
        {
            field: 'action',
            headerName: 'Delete',
            sortable: false,
            width: 250,
            renderCell: (params) => (
                <>
                    <Button className='py-1 border'><DeleteIcon className='text-danger' onClick={() => handleDelete(params.row._id)} /></Button>
                    <Button className='py-1 border'><EditIcon className='text-success' onClick={() => handleEdit(params.row)} /></Button>
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
                            <FormControl variant="standard" sx={{ minWidth: 450 }}>
                                <InputLabel id="demo-simple-select-error-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    margin="dense"
                                    name="categories_id"
                                    label="category"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleCategory}
                                    onBlur={handleBlur}
                                    value={values.categories_id}
                                    error=
                                    {errors.categories_id && touched.categories_id ? true : false}
                                >
                                    {category.categories.map((v) => (
                                        <MenuItem value={v._id}> {v.name} </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.categories_id}</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" sx={{ minWidth: 450 }}>
                                <InputLabel id="demo-simple-select-error-label">SubCategory</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    margin="dense"
                                    name="subcategories_id"
                                    label="category"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.subcategories_id}
                                    error=
                                    {errors.subcategories_id && touched.subcategories_id ? true : false}
                                >
                                    {/* {subc.subCategories.map((v) => (
                                        <MenuItem value={v._id}> {v.name} </MenuItem>
                                    ))} */}
                                </Select>
                                <FormHelperText>{errors.subcategories_id}</FormHelperText>
                            </FormControl>
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
                    rows={productsDATA.products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </>
    );
}
export default Products;