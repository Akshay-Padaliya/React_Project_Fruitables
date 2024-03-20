import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { TextFieldsTwoTone } from '@mui/icons-material';


function Category(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let contactSchema = object({
        category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(15, 'use a valid name'),
        discription: string().required().min(10, 'Message is  too short')
    });

    const formik = useFormik({
        initialValues: {
            category: '',
            discription: '',
        },
        validationSchema: contactSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

    return (

        <>
            <React.Fragment>
                <div className='m-4 mx-5 d-flex justify-content-end'>
                <Button variant="outlined" color='primary'  onClick={handleClickOpen}>
                    Add Category
                </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            // const formData = new FormData(event.currentTarget);
                            // const formJson = Object.fromEntries(formData.entries());
                            // const email = formJson.email;
                            // console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle className='text-center'>Add Data</DialogTitle>
                    <DialogContent>
                    <div>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="category"
                            label="Enter category"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                        />
                        <span className='error'>{errors.category && touched.category ? errors.category : ''}</span>
                    </div>
                    <div>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name= "discription"
                            label="Enter category discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        <span className='error'>{errors.name && touched.name ? errors.name : ''}</span>
                    </div>
                    <div className='mb-4' >
                                        <input
                                            name='category'
                                            type="text"
                                            className="w-100 form-control border-0 py-3"
                                            placeholder="Your Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.category}
                                        />
                                        <span className='error'>{errors.category && touched.category ? errors.category : ''}</span>
                                    </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
}
export default Category;