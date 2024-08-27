import { useContext, useEffect, useRef, useState } from "react";

import './products.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";

import toast from "react-hot-toast";
import CustomContainer from "../../components/container";
import MyLoaderComponent from "../../components/loader/loader.jsx";

export function ProductCard({ product, addToWishlist, removeFromWishlist, addToCart, fav }) {

    let favbtnClasses = 'm-1 favBtn'

    if (fav) {
        favbtnClasses += ' added'
    }
    return (
        <div className="col-md-6 col-lg-3 ng-star-inserted">
            <div className="product px-2 py-4 rounded">
                <Link to={'/productDetails/' + product._id} >
                    <img alt="" className="w-100 rounded" src={product.imageCover} />
                    <p className="main">{product.category.name}</p>
                    <h2 className="h6">{product.title}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                        <span >{product.price} EGp</span>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
                            <span >{product.ratingsAverage}</span>
                        </div>
                    </div>
                </Link>
                <div className="d-flex align-items-center justify-content-around">
                    <button onClick={
                        () => addToCart(product._id)
                    } className="w-75 btn mt-4"> + Add</button>
                    <FontAwesomeIcon
                        className={favbtnClasses}
                        icon={faHeart}
                        size="xl"
                        onClick={
                            () => {
                                if (fav) {
                                    removeFromWishlist(product._id)
                                } else {
                                    addToWishlist(product._id)
                                }
                            }
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default function Products() {
    let { getAllProducts } = useContext(ProductContext);

    let { wishlist, addToWishlist, removeFromWishlist, addToCart } = useContext(CartContext)
    const [products, setProducts] = useState(null);
    const [serachedProducts, setSearchProducts] = useState(null);
    const [favs, setFavs] = useState([])
    const [state, setState] = useState('init');

    function updateFavlist() {
        setState('loading')
        console.log(wishlist)
        setFavs(
            wishlist?.map(
                (product) => product.id
            )
        )
        console.log(favs)
        setState('loaded')
    }

    let searchInp = useRef();

    useEffect(
        () => {
            if (products === null) {
                setState('loading')
                getAllProducts().then(
                    (response) => {
                        if (response?.data !== null) {
                            if (searchInp.current?.value !== (null || '')) {
                                console.log(true)
                            } else {
                                setProducts(response.data);
                            }
                            setState('loaded')
                        } else {
                            setState('error')
                            toast.error('something goes wrong')
                        }
                    }
                )
            }
            if (
                (wishlist?.length !== favs?.length) ||
                (wishlist !== null && favs === null)
            ) {
                console.log(wishlist)
                updateFavlist()

            }
        }, [
        products,
        getAllProducts,
        wishlist,
        favs,
        searchInp.current
    ]
    )

    function addtoWishList(productId) {
        setState('loading')
        addToWishlist(productId).then(
            (res) => {
                console.log('here')
                console.log(wishlist)
                if (res?.status === 'success') {
                    toast.success('added to wishlist')
                    updateFavlist()
                    setState('loaded')
                } else {
                    setState('error')
                    toast.error('failed')
                }
            }
        )
    }

    function removefromWishlist(productId) {
        setState('loading')
        removeFromWishlist(productId).then(
            (res) => {
                console.log('here')
                console.log(wishlist)
                if (res?.status === 'success') {
                    toast.success('removed to wishlist')
                    setState('loaded')
                } else {
                    setState('error')
                    toast.error('failed')
                }
            }
        )
    }

    function search(ev) {
        console.log('started')
        let input = ev.target.value ?? ''
        if (input === null || input === '') {
            setSearchProducts(products)
        }
        setSearchProducts(
            products.filter(
                function (value) {
                    if (value.title.includes(input)  ) {
                        return value
                    }
                }
            )
        )
    }


    return (
        <CustomContainer>
            <div>
                <input className="form-control search-bar"
                    placeholder="search by product name"
                    name="q"
                    ref={searchInp}
                    onInput={search}
                />
            </div>
            {
                state === 'loading' ? <MyLoaderComponent />
                    : state === 'loaded' ? (
                        <div className='row g-4' >
                            {
                                (serachedProducts ?? products)?.map(
                                    (product) => {
                                        let fav = favs?.includes(product._id)
                                        return <ProductCard
                                            key={product._id}
                                            product={product}
                                            addToWishlist={addtoWishList}
                                            removeFromWishlist={removefromWishlist}
                                            addToCart={addToCart}
                                            fav={fav}
                                        />
                                    }
                                )
                            }
                        </div>
                    )
                        : null
            }
        </CustomContainer>
    );
}