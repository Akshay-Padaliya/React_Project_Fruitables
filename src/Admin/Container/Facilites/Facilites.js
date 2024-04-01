import React, { useState } from 'react';

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
import { addFacilities, deleteRow, editedData } from '../../../Redux/Action/facilities.action';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Facilites(props) {

    const [open, setOpen] = useState(false);
    const [update , setUpdate] = useState();

    const dispatch = useDispatch();

    const facilitesVal = useSelector(state => state.addFacilities)
    console.log(facilitesVal);

    const columns = [
        { field: 'name', headerName: 'Name', width: 150, editable: true, },
        { field: 'discription', headerName: 'Discription', width: 150, editable: true, },
        { field: 'Action', 
        headerName: 'Action', 
        width: 150,
        renderCell: (params) => 
        <div>
            <EditIcon onClick = {()=>handleEdit(params.row)} />
            <DeleteIcon onClick = {()=>handleDel(params.row.id)}/>
            </div>,
        editable: false, }
    ];
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit  = (raw) =>{
        dispatch(editedData(raw));
        handleClickOpen();
        formik.setValues(raw);
        setUpdate(raw.id);
    }

    const handleDel =(id)=>{
        console.log('dadad');
        dispatch(deleteRow(id));

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
        onSubmit: (values , { resetForm }) => {
           const  id = Math.floor(Math.random() * 1000) 
            dispatch(addFacilities({...values, id }))

            formik.resetForm();
            setOpen(false);
        }
    });

    const { handleSubmit, handleBlur, handleChange, errors, values, touched } = formik;
    return (
        <div>
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
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </DialogContent>

                </form>
            </Dialog>
            <br></br>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={facilitesVal.Facilities}
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
        </div>
    );
}

export default Facilites;