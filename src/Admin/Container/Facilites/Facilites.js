import React from 'react';

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
import { addFacilities } from '../../../Redux/Action/facilities.action';

function Facilites(props) {

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const facilitesVal = useSelector(state => state.addFacilities)
    console.log(facilitesVal);

    const columns = [
        { field: 'firstName', headerName: 'First name', width: 150, editable: true, },
        { field: 'lastName', headerName: 'Last name', width: 150, editable: true, }
    ];
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', },

    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        onSubmit: values => {
            dispatch(addFacilities(values))
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
                    rows={rows}
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