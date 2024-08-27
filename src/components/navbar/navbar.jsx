import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ logMethod , cartNum }) {
    let location = useLocation();
    const [logged, setLogged] = useState(false)

    useEffect(
        () => {
            if (location.pathname === '/signin' || location.pathname === '/signup') {
                setLogged(false)
            } else {
                setLogged(true)
            }
        }, [location.pathname, logged]
    )

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 fixed-top" >
            <div className="container justify-content-between" >
                <Link to="/" className="navbar-brand fw-semibold">
                    <FontAwesomeIcon icon={faCartShopping} className="mx-2" color="green" size="xl" />
                    fresh cart
                </Link>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <Link className="nav-link active" to='/' > Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/cart' > cart </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/products' > Products </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/categories' > categories </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/wishlist' > wish list </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/brands' > brands </Link>
                        </li>
                    </ul>
                    {
                        logged ? (
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
                                <li className="nav-item position-relative">
                                    <Link to="/cart" className="nav-link" >
                                        <i className="fa-solid fa-cart-shopping fs-3">
                                        </i>
                                        <FontAwesomeIcon icon={faCartShopping} size="xl" />
                                        <div className="badge position-absolute text-white end-0 bg-main">
                                            {cartNum}
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item position-relative" >
                                    <button className="btn" onClick={logMethod} >
                                        log out
                                    </button>
                                </li>
                            </ul>
                        ) :
                            (
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
                                    <li className="nav-item position-relative" >
                                        <Link className="nav-link" to='/signin'>
                                            sign in
                                        </Link>
                                    </li>
                                    <li className="nav-item position-relative" >
                                        <Link className="nav-link" to='/signup'>
                                            sign up
                                        </Link>
                                    </li>
                                </ul>
                            )
                    }
                </div>

            </div>
        </nav>
    );
}

export default Navbar;