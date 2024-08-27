import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import MyLoaderComponent from '../loader/loader.jsx';
import { ProductContext } from '../../context/productContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../pages/products/products.jsx';

export default function FeaturedProducts() {

    let { getAllProducts } = useContext(ProductContext);
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    let navigate = useNavigate();
    function getOut() {
        localStorage.removeItem('userToken');
        navigate('/');
    }

    async function getProducts() {
        setIsLoading(true);
        let res = await getAllProducts();
        if (res?.results > 0) {
            setProducts(res?.data);
        }
        else {
            if(res?.response?.message == 'Expired Token. please login again') getOut();
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

    if (isLoading) {
        return <MyLoaderComponent />
    }

    return <>
        <div className="row col-10 mx-auto">
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
    </>
}
