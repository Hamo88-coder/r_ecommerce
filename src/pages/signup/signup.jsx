
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AuthContext } from '../../context/authContext'

export default function Signup() {

    let { signUp } = useContext(AuthContext);
    const [state, setState] = useState('init');
    const [messageError, setMessageError] = useState('');
    let navigate = useNavigate();

    async function handleRegister(values) {
        setState('loading');
        let res = await signUp(values);
        if (res?.data?.message === 'success') {
            localStorage.setItem('userToken', res?.data.token);
            navigate('/signin');
        }
        else {
            setMessageError(res?.message)
        }
        setState('loaded');
    }

    let validation = Yup.object({
        name: Yup.string()
            .required("name is required")
            .min(3, "name min length is 3")
            .max(15, "name max length is 10"),
        email: Yup.string()
            .required("email is required")
            .email("email is invalid"),
        password: Yup.string()
            .required("password is required")
            .min(8, 'password can\'t be less than 8 chars '),
        rePassword: Yup.string()
            .required("rePassword is required")
            .oneOf([Yup.ref('password')], 'password and rePassword does\'nt matched'),
        phone: Yup.string()
            .required("phone is required")
            .matches(/^01[0125][0-9]{8}$/, 'phone must be valid number'),
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema: validation,
        onSubmit: handleRegister,
    });

    return <>
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <div className="w-75 mx-auto py-5 my-5">
            <h3>Register Now : </h3>
            {
                messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null
            }

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
                {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

                <label htmlFor="email">Email</label>
                <input className='form-control mb-2'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="text" name='email' id='email'
                />
                {
                    formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

                <label htmlFor="password">Password</label>
                <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

                <label htmlFor="rePassword">rePassword</label>
                <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

                <label htmlFor="phone">Phone</label>
                <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
                {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}

                {
                    state === 'loading' ?
                        <button className='btn bg-main text-white'>
                            <i className='fas fa-spinner fa-spin'></i>
                        </button> :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>
                }


            </form>
        </div>
    </>
}
