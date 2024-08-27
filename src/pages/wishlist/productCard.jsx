
import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductCard.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product, showSubcategory }) {

    let { addToCart,
        setNumOfCartItems,
        addToWishList,
        removeItemFromWishList,
        setNumOfFavoriteItems,
        numOfFavoriteItems,
        wishListDetails,
        getLoggedWishList,
        setWishListDetails, } = useContext(CartContext);

    const [isFavorite, setIsFavorite] = useState(false);

    let navigate = useNavigate();
    function getOut() {
        localStorage.removeItem('userToken');
        navigate('/');
    }

    async function addProductToCart(productId) {
    }

    function checkFavorite() {
    }

    async function deleteProductFromWishList(productId) {
    }

    async function addProductToWishList(productId) {
    }

    async function getWishListInfo() {
    }

    useEffect(() => {
        checkFavorite();
    }, []);


    return <>
        <div className='col-6 col-md-4 col-lg-3 col-xl-2 my-3'>
            <div className="product cursor-pointer px-2 pt-2 pb-3">
                <Link to={`/productdetails/${product._id}`}>
                    <img className='w-100' src={product.imageCover} alt="" />
                </Link>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <div>
                        <div className="text-main fw-bold font-sm">{showSubcategory ? product.subcategory[0]?.name : product.category.name}</div>
                        <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                    </div>
                    <i className="d-block fa-solid fa-heart fa-lg pe-1 heart"
                        style={{ color: isFavorite ? '#dc3545' : '#bdbdbd' }}
                        onClick={() => {
                            isFavorite ? deleteProductFromWishList(product._id) : addProductToWishList(product._id);
                        }}></i>
                </div>
                <div className='d-flex justify-content-between mb-2'>
                    <span className='text-muted'>{product.price} EGP</span>
                    <span>
                        <i className='fas fa-star rating-color me-1'></i>
                        {product.ratingsAverage}
                    </span>
                </div>
                <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white w-100 px-0'>
                    <i className="fa-solid fa-cart-plus fa-lg pe-2"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    </>
}