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


function Category(props) {

    const [open, setOpen] = useState(false);
    const [data , setData] = useState([]);

    const getdata = ()=>{
        let ldata = JSON.parse(localStorage.getItem('category'));

        if(ldata){
            setData(ldata);
        }
    }

    useEffect(()=>{
        getdata();
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let categorySchema = object({
        category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(15, 'use a valid name'),
        discription: string().required().min(10, 'Message is  too short')
    });

    const handleAdd = (data) => {

        const rNo = Math.floor(Math.random()*1000);
        console.log(data);

        let localData = JSON.parse(localStorage.getItem('category'));

        if (localData) {
            localData.push({...data , id: rNo});
            localStorage.setItem('category', JSON.stringify(localData));
        } else {
            localStorage.setItem('category', JSON.stringify([{...data , id: rNo}]));
        }

        getdata();

    }

    const formik = useFormik({
        initialValues: {
            category: '',
            discription: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            handleClose();
            resetForm();
            handleAdd(values);

        },
 
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
                    <DialogTitle className='text-cente/DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent style={{ width: 500 }}>

                            <TextField
                                margin="dense"
                                name="category"
                                label="Enter category"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                                error={errors.category && touched.category ? true : false}
                                helperText={errors.category}
                            />

                            <TextField
                                margin="dense"
                                name="discription"
                                label="Enter category discription"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discription}
                                error={errors.discription && touched.discription ? true : false}
                                helperText={errors.discription}
                            />

                            {/* <form onSubmit={handleSubmit} >
                            <div className='mb-4' >
                                <input
                                    name='category'
                                    type="text"
                                    className="w-100 form-control border-1 py-3"
                                    placeholder="Please enter category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
                                />
                                <span className='error'>{errors.category && touched.category ? errors.category : ''}</span>
                            </div>
                            <div className='mb-4'>
                                <textarea
                                    name='discription'
                                    className="w-100 form-control border-1"
                                    rows={5} cols={10}
                                    placeholder="Your Mess={""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.discription}
                                />
                                <span className='error'>{errors.discription && touched.discription ? errors.discription : ''}</span>
                            </div>

                        </form> */}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </DialogContent>

                    </form>
                </Dialog>
            </React.Fragment>

            <div className='p-5' style={{ width: '100%' }}>
                <DataGrid
                    rows={data}
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