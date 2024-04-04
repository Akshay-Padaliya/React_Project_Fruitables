import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { object, string, number, date, InferType } from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addFacilities, deleteFacilities,  editFacilities,  getFacilities } from '../../../Redux/Action/facilities.action';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Facilites(props) {

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const facilitesVal = useSelector(state => state.addFacilities)
    console.log(facilitesVal);

    useEffect(() => {
        dispatch(getFacilities())
    }, [])


    const columns = [
        { field: 'name', headerName: 'Name', width: 150, editable: true, },
        { field: 'discription', headerName: 'Discription', width: 150, editable: true, },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) =>
                <div>
                    <EditIcon onClick={() => handleEdit(params.row)} />
                    <DeleteIcon onClick={() => handleDelet(params.row.id)} />
                </div>,
            editable: false,
        }
    ];

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
        // getdata();
    }

    const handleDelet = (id) => {
        dispatch(deleteFacilities(id));
    }


    let facilitesSchema = object({
        name: string().required(),
        discription: string().required()

    });

    const formik = useFormik({
        initialValues: {
            name: '',
            discription: '',

        },
        validationSchema: facilitesSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editFacilities(values));
            } else {
                const id = Math.floor(Math.random() * 1000)
                dispatch(addFacilities({ ...values, id }))
                // getdata();
            }
            resetForm();
            setOpen(false);
        }
    });

    console.log(facilitesVal.isLoding);

    const { handleSubmit, handleBlur, handleChange, errors, values, touched } = formik;
    return (
        <>
            {facilitesVal.isLoding ?
                (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="success" />
                </Stack>
                )
                :
                (<div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Facilites
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}

                    >
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Facilites</DialogTitle>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Add Facilites"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.name}
                                    onChange={handleChange}

                                    onBlur={handleBlur}
                                    error={errors.name && touched.name ? true : false}
                                    helperText={errors.name && touched.name ? errors.name : ''}
                                />
                                <TextField
                                    margin="dense"
                                    id="discription"
                                    name="discription"
                                    label="Add Facilites discription"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.discription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.discription && touched.discription ? true : false}
                                    helperText={errors.discription && touched.discription ? errors.discription : ''}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                </DialogActions>
                            </DialogContent>

                        </form>
                    </Dialog>
                    <br></br>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={facilitesVal.Facilities}
                            // rows={data}
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
                </div>)
            }
        </>
    );
}

export default Facilites;