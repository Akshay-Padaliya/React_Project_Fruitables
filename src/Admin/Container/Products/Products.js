import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { mixed, number, object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { filteredSubCategory, getSubCategories } from '../../../Redux/Slice/subcategory.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../Redux/Action/category.action';
import { addproduct, deleteproduct, getproducts, updateproduct } from '../../../Redux/Slice/products.slice';


function Products(props) {

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);



    const category = useSelector((state) => state.Categories);
    console.log(category.categories);

    const subc = useSelector((state) => state.SubCategories)
    console.log(subc.subCategories);


    const productsDATA = useSelector((state) => state.products);
    console.log(productsDATA.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getproducts());
        dispatch(getCategories());
        dispatch(getSubCategories());
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

    const handleCategory = (event) => {
        let id = event.target.value
        // console.log(id);
        setFieldValue('category_id', id);
        setFieldValue('subcategory_id', '');
        dispatch(filteredSubCategory(id));
    }

    let subcategorySchema = object({
        name: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(30, 'use a valid name'),
        description: string().required().min(10, 'Message is  too short'),
        category_id: string().required(),
        subcategory_id: string().required(),
        price: number().required(),
        product_image: mixed().required('A file is required')
            .test('file size', 'file size too large', (value) => {
                if (value?.size) {
                    return value && value.size <= 1024 * 1024 * 2;
                }
                return true
            })
            .test('format', 'file not supported', (value) => {
                if (value?.type) {
                    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                }
                return true
            })
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            category_id: '',
            subcategory_id: '',
            product_image: '',
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
            field: 'category_id', headerName: 'Category', width: 100,
            renderCell: (params) => {
                const categ = category.categories.find((v) => v._id == params.row.category_id)
                // console.log(categ);
                return categ ? categ.name : ''
            }
        },
        {
            field: 'subcategory_id', headerName: 'SubCategory', width: 100,
            renderCell: (params) => {
                const subcateg = subc.subCategories.find((v) => v._id == params.row.subcategory_id)
                // console.log(categ);
                return subcateg ? subcateg.name : ''
            }
        },
        {
            field: 'product_image', headerName: 'Image', width: 150
            , renderCell: (params) => {
                console.log(params.row.product_image.url);
                return <img src={params.row.product_image.url} alt={params.row.name} width={50} />
            }
        },
        { field: 'name', headerName: 'Product', width: 150 },
        { field: 'description', headerName: 'discription', width: 300 },
        { field: 'price', headerName: 'Price', width: 150 },
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
    const handleimg = (event) => {
        console.log(event.currentTarget.files[0]);
        formik.setFieldValue("product_image", event.currentTarget.files[0])
    }

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;

    return (

        <>
            <React.Fragment >
                <div className='m-4 mx-5 d-flex justify-content-start'>
                    <Button variant="outlined" color='primary' onClick={handleClickOpen}>
                        Add Product
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle className='text-cente'> Product </DialogTitle>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        <DialogContent style={{ width: 500 }}>
                            <FormControl variant="standard" sx={{ minWidth: 450 }}>
                                <InputLabel id="demo-simple-select-error-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="category_id"
                                    margin="dense"
                                    name="category_id"
                                    label="category"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleCategory}
                                    // onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category_id}
                                    error=
                                    {errors.category_id && touched.category_id ? true : false}
                                >
                                    {category.categories.map((v) => (
                                        <MenuItem value={v._id}> {v.name} </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.category_id}</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" sx={{ minWidth: 450 }}>
                                <InputLabel id="demo-simple-select-error-label">SubCategory</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    margin="dense"
                                    name="subcategory_id"
                                    label="Subcategory"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.subcategory_id}
                                    error=
                                    {errors.subcategory_id && touched.subcategory_id ? true : false}
                                >
                                    {subc.subCategories.map((v) => (
                                        <MenuItem value={v._id}> {v.name} </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.subcategory_id}</FormHelperText>
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
                                label="Enter description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={errors.description}
                            />
                            <TextField
                                margin="dense"
                                name="price"
                                label="Enter price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={errors.price && touched.price ? true : false}
                                helperText={errors.price}
                            />

                            {/* <input type="file" name="product_image"  onChange={handleimg} /> */}
                            <input
                                margin="dense"
                                name="product_image"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={handleimg}
                                onBlur={handleBlur}
                                error={errors.product_image && touched.product_image ? true : false}
                                helperText={errors.product_image}
                            />
                            {
                                values?.product_image &&
                                <img src={
                                    values?.product_image.url ?
                                        values?.product_image.url :
                                        URL.createObjectURL(values.product_image)
                                } width={50} height={50} />
                            }
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