

import React from 'react'
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';




import Button from '@mui/material/Button';
import { addReviews } from '../../../Redux/Action/review.action';

export default function Reviews() {

    const dispatch = useDispatch();

    let reviewSchema = object({
        name: string().required(),
        email: string().email().required(),
        review: string().required(),
        rating: number().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: '',
            rating: ''
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(addReviews(values))

            //   alert(JSON.stringify(values, null, 2));
            formik.resetForm()
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik


    return (
        <form action="#" onSubmit={handleSubmit}>
            <h4 className="mb-5 fw-bold">Leave a Reply</h4>
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="border-bottom rounded">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control border-0 me-4"
                            placeholder="Yur Name *"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="border-bottom rounded">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control border-0 me-4"
                            placeholder="Yur email *"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : ''}
                        />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="border-bottom rounded my-4">
                        <textarea
                            type="text"
                            id="review"
                            name="review"
                            className="form-control border-0"
                            cols={30} rows={8}
                            placeholder="Your Review *"
                            spellCheck="false"
                            defaultValue={""}
                            value={values.review}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.review && touched.review ? true : false}
                            helperText={errors.review && touched.review ? errors.review : ''}
                        />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                            <p className="mb-0 me-3">Please rate:</p>
                            <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                <Stack spacing={1}>
                                    <Rating
                                        name="half-rating-read"
                                        defaultValue={0}
                                        precision={0.5}
                                        id="rating"
                                        name="rating"
                                        value={values.rating}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.rating && touched.rating ? true : false}
                                        helperText={errors.rating && touched.rating ? errors.rating : ''}
                                    />
                                </Stack>
                            </div>
                        </div>
                        {/* <a href="#"  type='submit' className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</a> */}
                        <Button className="btn border border-secondary text-primary rounded-pill px-4 py-3" type="submit">Post Comment</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}



{/* <React.Fragment>
<Button variant="outlined" onClick={handleClickOpen}>
  Open form dialog
</Button>
<Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const email = formJson.email;
      console.log(email);
      handleClose();
    },
  }}
>
  <DialogTitle>Subscribe</DialogTitle>
  <DialogContent>
    <DialogContentText>
      To subscribe to this website, please enter your email address here. We
      will send updates occasionally.
    </DialogContentText>
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="email"
      label="Email Address"
      type="email"
      fullWidth
      variant="standard"

    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button type="submit">Subscribe</Button>
  </DialogActions>
</Dialog>
</React.Fragment>
);


 */}
