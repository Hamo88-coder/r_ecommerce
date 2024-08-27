import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(null);

export function CartContextProvider(props) {

    const [cart, setCart] = useState(null)
    const [wishlist, setWishlist] = useState(null)

    const baseUrl = 'https://ecommerce.routemisr.com'

    const api = '/api/v1'

    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function addToCart(id) {
        return await axios.post(
            'https://ecommerce.routemisr.com/api/v1/cart',
            { "productId": id },
            {
                headers: headers
            }
        ).then(
            async (res) => {
                
                await getUserCart()
                return res.data
            }
        ).catch(
            (err) => err
        )
    }

    async function removeFromCart(productId) {
        return await axios.delete(
            'https://ecommerce.routemisr.com/api/v1/cart/' + productId,
            {
                headers: headers
            }
        ).then(
            async (res) => {
                console.log(res.data)
                return res.data
            }
        ).catch(
            (err) => err
        )
    }

    async function getUserCart() {
        return await axios.get(
            "https://ecommerce.routemisr.com/api/v1/cart",
            {
                headers: headers
            }
        )
            .then(
                (res) => {
                    
                    setCart(res.data)
                    return res.data
                }
            ).catch(
                (err) => err
            )
    }

    async function addToWishlist(id) {
        console.log(wishlist)
        return await axios.post(
            baseUrl + api + '/wishlist',
            { "productId": id },
            { headers: headers }
        ).then(
            async (res) => {
                console.log(res.data.data)
                return res.data
            }
        ).catch(
            (err) => err
        )
    }

    async function updateCartItem(productId, count) {
        return await axios.put(
            'https://ecommerce.routemisr.com/api/v1/cart/' + productId,
            {
                "count": count
            },
            {
                headers: headers
            }
        ).then(
            (res) => {
                
                return res
            }
        ).catch(
            (err) => err
        )
    }

    async function removeFromWishlist(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((res) => {
                console.log(res.data)
                return res.data})
            .catch((error) => error);
    }

    async function clearUserCart() {
        return await axios.delete(
            'https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers: headers
            }
        ).then(
            (res) => {
                
                return res.data
            }
        ).catch(
            (err) => err
        )
    }

    async function getUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: headers
        })
            .then((res) => {
            
                setWishlist(res?.data?.data)
                return res.data
            })
            .catch((error) => error);
    }

    async function createCashOrder(formData) {
        return await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cart?.data._id}`,
            {
                "shippingAddress": formData
            },
            {
                headers: headers
            }
        ).then((res) => {
            console.log(res)
            return res.data
        })
            .catch((error) => error);
    }

    return (
        <CartContext.Provider value={
            {
                wishlist,
                setWishlist,
                cart,
                setCart,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearUserCart,
                getUserCart,
                addToWishlist,
                removeFromWishlist,
                getUserWishlist,
                createCashOrder,
            }
        }>
            {props.children}
        </CartContext.Provider>
    )
}