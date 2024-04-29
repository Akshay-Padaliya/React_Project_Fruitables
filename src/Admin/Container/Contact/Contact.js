import React, { useContext, useEffect, useState } from 'react'
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
import { contactContex } from '../../../Context/ContactContex';
import { idID } from '@mui/material/locale';


export default function Contact() {

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
        contact.deletcontact(id)
    }

    useEffect(() => {
        contact.getcontact()
    }, [])

    const contact = useContext(contactContex);
    console.log(contact);
 


    const columns = [
        { field: 'address', headerName: 'Address', width: 150, editable: true, },
        { field: 'email', headerName: 'Email', width: 150, editable: true, },
        { field: 'phoneNo', headerName: 'phoneNo', width: 150, editable: true, },
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
        address: string().required(),
        phoneNo: number().required().positive().integer(),
        email: string().email().required(),
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            phoneNo: '',
            email: '',
            createdOn: new Date().toLocaleDateString()
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (update) {
               contact.updatecontact(values)
            } else {
                contact.addcontact(values)
            }
            resetForm();
            handleClose();

        
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik

    return (
        <>
            {/* {couponData.isLoding ? (<h3>Loading....</h3>) :
                couponData.error ? (<h3>couponData.error</h3>) : */}
                <>
                    <React.Fragment>
                        <Button variant="outlined" onClick={handleClickOpen} className='my-3'>
                            Add Contact
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Add Contact</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="address"
                                        name="address"
                                        label="Enter address"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                        error={errors.address && touched.address ? true : false}
                                        helperText={errors.address && touched.address ? errors.address : ''}
                                    />
                                     <TextField
                                        margin="dense"
                                        id="phoneNo"
                                        name="phoneNo"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phoneNo}
                                        error={errors.phoneNo && touched.phoneNo ? true : false}
                                        helperText={errors.phoneNo && touched.phoneNo ? errors.phoneNo : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        name="email"
                                        label="Enter email"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={errors.email && touched.email ? true : false}
                                        helperText={errors.email && touched.email ? errors.email : ''}
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
                            rows={contact.contact}
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
            {/* } */}
        </>
    )
}
