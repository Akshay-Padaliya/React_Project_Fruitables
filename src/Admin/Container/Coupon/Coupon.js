import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addCouponData, deleteCouponData, editCouponData, getCouponData } from '../../../Redux/Slice/coupon.slice';


export default function Coupon() {

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };
    const handleEdit = (raw) => {

        handleClickOpen();
        formik.setValues(raw);
        setUpdate(true);
    }

    const handleDelete = (id) => {
        dispatch(deleteCouponData(id));
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCouponData());
    },[])

    const couponData = useSelector((state)=>state.coupons)
    console.log(couponData.coupon);
    

    const columns = [
        { field: 'name', headerName: 'Coupon', width: 150, editable: true, },
        { field: 'discount', headerName: 'Discount(%)', width: 150, editable: true, },
        { field: 'expiry', headerName: 'expiry Date', width: 150, editable: true, },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) =>
                <div>
                    <Button className='py-1 border'><EditIcon className='text-success' onClick={() => handleEdit(params.row)} /></Button>
                    <Button><DeleteIcon className='text-danger' onClick={() => handleDelete(params.row.id)} /></Button>  
                </div>,
            editable: false,
        }
    ];

    

    let couponSchema = object({
        name: string().required(),
        discount: number().required().positive().integer(),
        expiry: date().required(),
        createdOn: date().default(() => new Date()),
      });
      

    const formik = useFormik({
        initialValues: {
            name: '',
            discount: '',
            expiry: '',
            createdOn : '',
        },
        validationSchema: couponSchema,
        onSubmit: (values, {resetForm}) => {
            if (update) {
                dispatch(editCouponData(values));

            } else {
                // const id = Math.floor(Math.random() * 1000)
                dispatch(addCouponData({...values, createdOn: new Date().toLocaleDateString() }))
             
            }
            resetForm();
           handleClose()

        //   alert(JSON.stringify({...values, createdOn: new Date().toLocaleDateString() }, null, 2));
        },
      });

      const {handleSubmit,handleChange,handleBlur,values,errors,touched} = formik

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Coupon
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Add Counpon</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Enter Coupon"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={errors.name && touched.name ? true : false}
                                helperText={errors.name && touched.name ? errors.name : ''}
                            />
                            <TextField
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="Enter discount"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discount}
                                error={errors.discount && touched.discount ? true : false}
                                helperText={errors.discount && touched.discount ? errors.discount : ''}
                            />
                            <TextField
                                margin="dense"
                                id="expiry"
                                name="expiry"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expiry}
                                error={errors.expiry && touched.expiry ? true : false}
                                helperText={errors.expiry && touched.expiry ? errors.expiry : ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={couponData.coupon}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    )
}
