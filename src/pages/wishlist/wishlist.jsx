import CustomContainer from '../../components/container'


import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext.jsx';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MyLoaderComponent from '../../components/loader/loader.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function WishList() {

    let {
        wishlist,
        removeFromWishlist,
        getUserWishlist,
        addToCart
    } = useContext(CartContext);

    const [state, setState] = useState('init');

    async function getWishList() {
        setState('loading');
        await getUserWishlist().then(
            (res) => {
                console.log(res)
                if (res?.status === 'success') {
                    setState('loaded');
                }
                else {
                    setState('error')
                }
            }
        );


    }

    async function deleteItem(productId) {
        setState('loading')
        await removeFromWishlist(productId).then(
            (res)=>{
                if (res?.status === 'success') {
                    toast.success('Item removed Successfully');
                    getWishList();
                    setState('loaded')
                }
                else {
                    if ((res?.response?.data?.message === 'Expired Token. please login again')) {
                        toast.error(res?.response?.data?.message);
                        setState('error');
                    }
                }
            }
        )
    }

    function addtoCart(productId) {
        setState('loading')
        addToCart(productId).then(
            (response) => {
                console.log('from here')
                console.log(response)
                if (response?.data?.status === 'success') {
                    getWishList()
                    toast.success('added')
                    setState('loaded')
                } else {
                    setState('error')
                }
                console.log(state)
            }

        )

    }

    useEffect(
        () => {
            if(wishlist === null){
                getWishList()
            }
        }
        , [wishlist]
    )

    function ItemCard({ product }) {
        return (
            <div key={product._id} className='w-100 bg-light'>
                <div className='row d-flex justify-content-around align-items-center border-bottom py-2 my-3 mx-1 category-slider'>
                    <Link to={`/productdetails/${product._id}`} className="col-9 col-md-3 col-lg-2 mb-2">
                        <img src={product.imageCover} className='w-100' alt="" />
                    </Link>

                    <div className="col-9 col-md-9 col-lg-10">
                        <div className='row d-flex justify-content-between'>
                            <div className='col-10 text-start'>
                                <Link className='btn px-0' to={`/productdetails/${product._id}`}>
                                    <h6>
                                        {product?.title?.split(' ').length > 5 ? product?.title?.split(' ').slice(0, 5).join(' ') : product?.title}
                                    </h6>
                                </Link>
                                <h6 className='text-primary'>{product.price} EGP</h6>
                                <button onClick={() => { deleteItem(product._id) }}
                                    className='btn text-danger border-0' style={{ height: 'fit-content', fontWeight: "600" }}>
                                    <FontAwesomeIcon
                                        className='favBtn added mx-1'
                                        icon={faTrash} />
                                    remove
                                </button>
                            </div>
                            <div className='col-2'>
                                <button
                                    onClick={
                                        () => {
                                            addtoCart(product._id)
                                        }
                                    }
                                    className="btn btn-outline-primary btn-lg">add To Cart</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return <>
        <Helmet>
            <title>Wish List</title>
        </Helmet>
        <div className='text-center' >
            <CustomContainer>
                <h1>Wishlist</h1>
                {
                    state === 'loading' ?
                        <MyLoaderComponent />
                        : state === 'loaded' && wishlist?.length > 0 ?
                            wishlist?.map(
                                (product, index) => {
                                    return (
                                        <ItemCard key={index} product={product} />
                                    )
                                }
                            ) : state === 'loaded' && wishlist.length < 0 ?
                                <div className='mx-auto' >
                                    <h3 className=' my-2' >
                                        you don't have any items in your wishlist
                                    </h3>
                                    <Link className='btn btn-primary border-0 fw-600 p-2 my-2' to='/products'>
                                        go back to the products
                                    </Link>
                                </div>
                                : <div>
                                    <h1> Wrong Here </h1>
                                </div>

                }
            </CustomContainer>
        </div>
    </>
}