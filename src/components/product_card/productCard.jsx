import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function ProductCard({ product }) {
    return (
        <div className="col-md-6 col-lg-3 ng-star-inserted">
            <div className="product px-2 py-4 rounded">
                <Link to={'/productDetails/' + product._id} >
                    <img alt="" className="w-100 rounded" src={product.imageCover} />
                    <p className="main">{product.slug}</p>
                    <h2 className="h6">{product.title}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                        <span >{product.price} EGp</span>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
                            <span >4.8</span>
                        </div>
                    </div>
                </Link>
                <div className="d-flex align-items-center justify-content-center">
                    <button className="w-75 btn mt-4"> + Add</button>
                    <FontAwesomeIcon
                        className="m-1 favBtn"
                        icon={faHeart}
                        size="xl"
                    />
                </div>
            </div>
        </div>
    );
}