import { createContext, useState } from "react";
import axios from "axios";

/**
 * {
    "_id": "66c8731aed0dc0016c0ec648",
    "name": "amr",
    "email": "oamr97715@gmail.com",
    "createdAt": "2024-08-23T11:31:38.811Z"
    },
 */

export let AuthContext = createContext(null);

export function AuthContextProvider(props) {
    const [email, setEmail] = useState('');

    const baseUrl = 'https://ecommerce.routemisr.com'

    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function signIn(values) {
        return await axios.post(
            baseUrl + "/api/v1/auth/signin",
            values
        )
            .then((res) => {
                
                return res
            })
            .catch((err) => err);
    }

    async function signUp(formData) {
        return await axios.post(
            baseUrl + "/api/v1/auth/signup",
            formData
        )
            .then((res) => {
                
                return res
            })
            .catch((err) => err);
    }

    async function getVerificationCode(formData) {
        return await axios.post(
            baseUrl + '/api/v1/auth/forgotPasswords',
            formData
        )
            .then(
                (res) => {
                    
                    return res.data
                }
            ).catch((err) => err);
    }

    async function sendVerificationCode(formData) {
        return await axios.post(
            baseUrl + '/api/v1/auth/verifyResetCode',
            formData
        )
            .then(
                (res) => {
                    
                    return res
                }
            ).catch((err) => err);
    }

    async function resetPassword(formData) {
        return await axios.put(
            baseUrl + '/api/v1/auth/resetPassword',
            formData
        )
            .then(
                (res) => {
                    
                    return res
                }
            ).catch((err) => err);
    }


    return (
        <AuthContext.Provider value={{
            email,
            setEmail,
            signIn,
            signUp,
            sendVerificationCode,
            getVerificationCode,
            resetPassword
        }} >
            {props.children}
        </AuthContext.Provider>
    )

}