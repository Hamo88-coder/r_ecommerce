import CustomContainer from "../../components/container";
import * as Yup from 'yup'
import { isString, useFormik } from 'formik'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "../../context/authContext";
import MyLoaderComponent from "../../components/loader/loader";
import { Helmet } from "react-helmet";

export default function SignIn({ saveUserData }) {
    const { signIn } = useContext(AuthContext)

    const [state, setState] = useState('init');
    const [message, setMessageError] = useState('')

    const navigate = useNavigate();

    async function handleLogin(values) {
        setState('loading')
        let res = await signIn(values);
        if (res?.data?.message === 'success') {
            localStorage.setItem('userToken', res.data.token);
            saveUserData();
            navigate('/');
        }
        else {
            setMessageError(
                res?.message
            )
        }
        setState('loaded');
    }

    let validation = Yup.object({
        email: Yup.string().required("email is required").email("email is invalid"),
        password: Yup.string().required("password is required")
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validation,
        onSubmit: handleLogin,
    });


    return (
        <>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <CustomContainer>
                {
                    state === 'loading' ?
                        < MyLoaderComponent />
                        : null
                }
                <h1>Sign in</h1>
                {
                    message.length > 0 ?
                        <div className="alert alert-danger">{message}</div>
                        : null
                }

                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name='email' id='email' />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

                    <label htmlFor="password">Password</label>
                    <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

                    {state === 'loading' ? <button className='btn bg-main text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button> :
                        <div className='d-flex justify-content-between'>
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login</button>
                            <Link className='mt-2' to={`/forgetpassword`}>ForgetPassword ?</Link>
                        </div>}

                </form>
            </CustomContainer>

        </>

    )
}