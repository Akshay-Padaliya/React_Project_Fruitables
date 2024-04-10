import React from 'react'
import { object, string, number } from 'yup';
import { useFormik } from 'formik';
import { useDispatch} from 'react-redux';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { addReviews } from '../../../Redux/Action/review.action';

export default function Reviews({id}) {

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
          rating: '',
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
    
          dispatch(addReviews({ ...values, productId: id, date: new Date().toLocaleDateString()}));
    
          resetForm()
        },
      });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik

    return (
        <form onSubmit={handleSubmit}>
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
                        />
                      </div>
                      <p className='text-danger'>{errors.name && touched.name ? errors.name : ''}</p>
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
                        />
                      </div>
                      <p className='text-danger'>
                      {errors.email && touched.email ? errors.email : ''}
                      </p>
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
                        />
                      </div>
                      <p className='text-danger'>
                      {errors.review && touched.review ? errors.review : ''}
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-3">Please rate:</p>
                          <div style={{ fontSize: 12 }}>
                            <Stack spacing={1}>
                              <Rating
                                defaultValue={0}
                                precision={0.5}
                                id="rating"
                                name="rating"
                                value={values.rating}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.rating && touched.rating ? true : false}
                              />
                            </Stack>
                            <p className='text-danger'>{errors.rating && touched.rating ? errors.rating : ''}</p>
                          </div>
                        </div>
                        <Button className="btn border border-secondary text-primary rounded-pill px-4 py-3" type="submit">Post Comment</Button>
                      </div>

                    </div>
                  </div>
                </form>
    )
}
