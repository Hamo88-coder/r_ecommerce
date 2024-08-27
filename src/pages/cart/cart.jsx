

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CustomContainer from "../../components/container";
import MyLoaderComponent from "../../components/loader/loader";

export default function Cart() {

    let { cart, getUserCart, updateCartItem, removeFromCart } = useContext(CartContext);
    const [state, setState] = useState('init');

    function getCart() {
        setState('loading');
        getUserCart().then(
            (res) => {
                if (!res?.data?.status === 'success') {
                    if (res?.response?.data?.message === 'Expired Token. please login again') {

                    }
                    setState('error')
                } else {
                    setState('loaded');
                }
            }
        );

    }

    function deleteFromCart(productId) {
        setState('loading')
        removeFromCart(productId).then(
            (response) => {
                if (response?.status === 'success') {
                    getCart()
                    setState('loaded')
                } else {
                    setState('error')
                }
            }
        )

    }

    useEffect(() => {
        console.log(cart)
        if (cart === null) {
            getCart();
        } else {
            setState('loaded')
        }
    }, [cart]);

    function updateProductQuant(productId, count) {
        console.log('started ')
        setState('loading');
        updateCartItem(productId, count).then(
            (res) => {
                if (res?.data?.status === 'success') {
                    setState('loaded')
                    getCart()
                } else {
                    setState('error')
                }
            }
        ).catch(
            (err) => toast.error(err?.message)
        )
    }

    function EmptyCard() {
        return (
            <>
                <div className='row justify-content-center my-5'>
                    <div className='col-md-8'>
                        <h5 className='h3 text-main fw-bold text-center my-4 fs-lg'>Cart is empty</h5>
                    </div>
                </div>
            </>
        )
    }

    return <>
        <Helmet>
            <title>Cart Details</title>
        </Helmet>
        <CustomContainer>
            {
                state === 'loading' ?
                    <MyLoaderComponent /> :
                    state !== 'loading' && cart !== null && cart?.data?.products?.length > 0 ?
                        <div className="bg-main-light p-3 p-md-4 my-4 position-relative">
                            <div className='row d-flex justify-content-center align-items-center'>
                                <div className='col-11 col-md-9 col-lg-10'>
                                    <h3>Shop Cart: </h3>
                                    <h6 className='text-main'>Total Cart Price: {cart?.data.totalCartPrice} EGP</h6>
                                </div>
                                <button className='col-11 col-md-3 col-lg-2 bg-main btn btn-lg '
                                    style={{ height: 'fit-content' }}>
                                    <Link className='text-white h5' to={'/checkout'}>
                                        Checkout
                                        <i className="fa-solid fa-basket-shopping fa-lg ms-2"></i>
                                    </Link>
                                </button>
                            </div>


                            {cart?.data.products?.map((product) => <div key={product.product._id} className='row d-flex justify-content-center align-items-center border-bottom py-2 my-3'>
                                <Link to={`/productdetails/${product.product._id}`} className="col-9 col-md-2 col-lg-1 mb-2">
                                    <img src={product.product.imageCover} className='w-100' alt="" />
                                </Link>
                                <div className="col-9 col-md-10 col-lg-11 ">
                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-md-10'>
                                            <Link to={`/productdetails/${product.product._id}`}><h6 >{product.product.title} </h6></Link>
                                            <h6 className='text-main'>price: {product.price}</h6>
                                            <button onClick={() => {
                                                deleteFromCart(product.product._id)
                                            }} className='btn m-0 p-0'>
                                                <i className='fa-regular fa-trash-can text-main me-1'></i>
                                                Remove
                                            </button>
                                        </div>
                                        <div className='col-md-2 d-flex flex-row-reverse'>
                                            <button onClick={() => {
                                                updateProductQuant(product.product._id, product.count + 1)
                                            }} className='btn border-main btn-sm' style={{
                                                height: 'fit-content'

                                            }}>+</button>
                                            <span className='mx-3'>{product.count}</span>
                                            <button onClick={() => {
                                                product.count > 1 ?
                                                    updateProductQuant(product.product._id, product.count - 1)
                                                    : deleteFromCart(product.product._id)
                                            }
                                            } className='btn border-main btn-sm' style={{ height: 'fit-content' }}>-</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                            <div className='my-5'></div>
                            <button className='btn btn-danger p-2 position-absolute' style={{ bottom: '15px', right: '15px' }}>
                                Clear Cart
                                <i className='fa-regular fa-trash-can fa-lg ms-2'></i>
                            </button>
                        </div> :
                        <EmptyCard />
            }
        </CustomContainer>
    </>
}
