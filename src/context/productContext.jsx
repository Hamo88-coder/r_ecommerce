import { createContext, useState } from "react";
import axios from "axios";


export let ProductContext = createContext(null);

export function ProductContextProvider(props) {


    const [categories, setCategories] = useState(null)

    let header = {
        token: localStorage.getItem('userToken')
    }

    const baseUrl = 'https://ecommerce.routemisr.com'
    const api = '/api/v1'
    
    async function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/`)
            .then((res) => res).catch((error) => error);
    }

    async function getAllProducts() {
        return await axios.get(
            baseUrl + api + '/products'
        ).then(
            ((res) => {
                
                return res.data
            })
        ).catch((error) => error);
    }

    async function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories?limit=100`)
            .then((res) => res).catch((error) => error);
    }

    async function getProductDetails(id) {
        return await axios.get(
            baseUrl + api + `/products/${id}`
        ).then(
            ((res) => {
                
                return res
            })
        ).catch((error) => error);
    }

    return (
        <ProductContext.Provider value={
            {
                getAllProducts,
                getProductDetails,
                getAllBrands,
                getAllCategories,
                categories,
                setCategories,
            }
        } >
            {props.children}
        </ProductContext.Provider>
    )
}