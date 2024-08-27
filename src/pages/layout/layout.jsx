import { useContext, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/cartContext";

export default function Layout({ userData, setUserData, saveUserData }) {

    const navigate = useNavigate();

    let { cart,wishList , setCart, getUserWishlist , getUserCart } = useContext(CartContext);

    function getOut() {
        setUserData(null)
        localStorage.removeItem('userToken')
        setTimeout(
            () => {
                navigate('/signin')
            }, 1000
        )
    }

    let location = useLocation()

    useEffect(
        () => {
            let token = localStorage.getItem('userToken');

            if (token !== null) {
                if (userData === null) { saveUserData() }
            }
            if (userData === null && token === null) {
                if (
                    !['/signin', '/signup', '/forgetpassword']
                        .includes(location.pathname)) {
                    navigate('/signin')
                }
            } else {
                if(wishList === null || cart === null){
                    getUserCart()
                    getUserWishlist()
                }
            }
        },
        [userData,wishList , cart]
    )

    return (
        <>
            <Navbar logMethod={getOut} cartNum={cart?.numOfCartItems}  />
            <Toaster />
            <Outlet />
        </>
    );
}