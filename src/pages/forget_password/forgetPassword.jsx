import { useContext, useEffect, useState } from 'react';
import CustomContainer from '../../components/container'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import { AuthContext } from '../../context/authContext';

import toast, { Toaster } from 'react-hot-toast';
import MyLoaderComponent from '../../components/loader/loader';

function submitBtn(props) {
    return props.state === 'loading' ?
        <button className='btn bg-main text-white mt-2'>
            <i className='fas fa-spinner fa-spin'></i>
        </button>
        :
        <div className='d-flex justify-content-between'>
            <button disabled={props.disabled}
                type='submit'
                className='btn bg-main text-white mt-2'>{props.name}</button>
        </div>
}

export default function ForgetPassword() {
    let { sendVerificationCode, getVerificationCode , resetPassword } = useContext(AuthContext);

    const [state, setState] = useState('init');
    const [formType, setFormType] = useState('mail');
    const [message, setMessage] = useState(null)

    useEffect(
        () => {
            if (message !== null) {
                if (state === 'error') {
                    toast.error(message)
                } else {
                    toast.success(message)
                }
            }
        },
        [message, state]
    )

    let navigate = useNavigate()

    function startCount() {
        setTimeout(
            () => {
                if (formType === 'code') {
                    setFormType('mail')
                    setMessage('token has expired')
                }
            },
            1000 * 60 * 10
        )
    }

    function sendVerification(formData) {
        setState('loading')
        formData.resetCode = formData.resetCode.toString()

        sendVerificationCode(formData).then(
            (res) => {
                
                if ((res?.data.status ?? '').toLowerCase() === 'success') {
                    setFormType('pass')
                    setState('loaded')
                } else {
                    setMessage(res?.message)
                    setState('error')
                }
            }
        )
    }

    function getVerification(formData) {
        setState('loading')
        let res = getVerificationCode(formData)
        setMessage(res?.message)
        if (res?.statusMsg !== 'fail') {
            setFormType('code')
            startCount()
            setState('loaded')
        } else {
            setState('error')
        }
    }

    function updatePassword(formData) {
        setState('loading')
        let res = resetPassword(formData)
        setMessage(res?.message)
        if (res?.data?.token !== null) {
            setState('loaded')
            setMessage('Password reset successfully')
            setTimeout(
                () => navigate('/signin'),
                1000
            )
        }
        else {
            setState('error')
            setMessage(res?.response?.data?.message ? res?.response?.data?.message : "Failed Operation")
        }
    }

    let mailValidation = Yup.object({
        email: Yup.string()
            .required("email is required")
            .email("email is invalid"),
    });

    let newPassValidation = Yup.object({
        email: Yup.string()
            .required("email is required")
            .email("email is invalid"),
        newPassword: Yup.string()
            .required("password is required")
            .min(8, 'password must be min 8 characters'),
    })

    let formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: mailValidation,
        onSubmit: getVerification,
    })

    let formik1 = new useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: sendVerification,
    })

    let formik2 = new useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        validationSchema: newPassValidation,
        onSubmit: updatePassword
    })

    let title = () => {
        let text = formType === 'pass' ? ('enter the new password')
            : formType === 'code' ? ('enter the code you have received')
                : ('enter the email')
        return (
            <h3> {text} </h3>
        )
    }

    return (
        <CustomContainer>
            <Toaster />
            {
                state === 'loading' ? <MyLoaderComponent />
                    : (<div className='row'>
                        {
                            title()
                        }
                        {
                            (formType === 'mail') ?
                                (
                                    <form id='sendMailForm' onSubmit={formik.handleSubmit} >
                                        <div className='form-group'>
                                            <input
                                                className='form-control mb-2'
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                type="text"
                                                name='email'
                                                id='email'
                                            />
                                        </div>
                                        {
                                            state === 'loading' ?
                                                <button className='btn bg-main text-white mt-2'>
                                                    <i className='fas fa-spinner fa-spin'></i>
                                                </button>
                                                :
                                                <div className='d-flex justify-content-between'>
                                                    <button disabled={!(formik.isValid && formik.dirty)}
                                                        type='submit'
                                                        className='btn bg-main text-white mt-2'>Send Code</button>
                                                </div>
                                        }
                                    </form>
                                ) : formType === 'code' ? (
                                    <form id='sendCodeForm' onSubmit={formik1.handleSubmit} >
                                        <input
                                            type='text'
                                            name='resetCode'
                                            value={formik1.values.resetCode}
                                            onChange={formik1.handleChange}
                                            onBlur={formik1.handleBlur}
                                            className='form-control'
                                        />
                                        {submitBtn({
                                            state: state,
                                            disabled: !(formik1.isValid && formik1.dirty),
                                            name: "send Code"
                                        })}
                                    </form>
                                ) :
                                    (
                                        <form id='newPassForm' onSubmit={formik2.handleSubmit}>
                                            <input
                                                type='email'
                                                className='form-control'
                                                name='email'
                                                value={formik2.values.email}
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                            />
                                            <input
                                                type='password'
                                                className='form-control'
                                                name='newPassword'
                                                value={formik2.values.newPassword}
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                placeholder='new password'
                                            />
                                            {
                                                submitBtn({
                                                    name: 'confirm',
                                                    state: state,
                                                    disabled: !(formik.isValid && formik.dirty)
                                                })
                                            }
                                        </form>
                                    )
                        }
                    </div>)
            }
        </CustomContainer>
    )
}