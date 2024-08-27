import { useFormik } from 'formik'
import CustomContainer from '../../components/container'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {

    let { createCashOrder } = useContext(CartContext)

    const [isLoading, setIsLoading] = useState(false);
    const [selectButton, setSelectButton] = useState('');

    let navigate = useNavigate();

    async function handleSubmit(values) {
        setIsLoading(true);
        let res = await createCashOrder(values);
        if (res?.data?.status === 'success') {
            toast.success('order success');
            navigate('/');
        }
        else {
            if ((res?.response?.data?.message === 'Expired Token. please login again' ||
                res?.response?.data?.message === 'You are not logged in. Please login to get access'))
                toast.error('Failed Order');
        }
        setIsLoading(false);
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: handleSubmit
    })

    return (
        <CustomContainer>
            <form id='paymentDataForm' onSubmit={formik.handleSubmit} >
                <input className='form-control my-2' placeholder='details' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" value={formik.values.details} name='details' />
                <input className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='phone' type="text" value={formik.values.phone} name='phone' max={11} min={11} />
                <input className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='city' type="text" value={formik.values.city} name='city' />

                <input type="submit" className='btn btn-primary' value='confirm' />
            </form>
        </CustomContainer>
    )
}