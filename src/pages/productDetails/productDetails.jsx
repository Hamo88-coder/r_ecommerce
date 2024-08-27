import { useContext, useEffect, useRef, useState } from "react";
import CustomContainer from "../../components/container";
import MyLoaderComponent from "../../components/loader/loader";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick'

import './productDetails.css';
import { ProductContext } from "../../context/productContext";


export default function ProductDetails() {
    const [product, setProduct] = useState(null)
    const [state, setState] = useState('init')

    let { getProductDetails } = useContext(ProductContext)

    const { pid } = useParams()

    async function getDetails (id){
        setState('loading')
        let res = await getProductDetails(id)
        if (res?.data != null) {
            setProduct(res?.data?.data);
        }
        setState('loaded');
    }

    useEffect(
        () => {
            if( product === null && state !== 'loaded' ){
                getDetails(pid)
            }
        }, [pid, state, product]
    )

    let sliderRef = useRef(null);

    var settings = {
        dots: true,
        infinity: true,
        speed: 500,
        slidesToShow: 1,
        centerMode:true,
        slidesToScroll: 1,
        arrow:false,
        autoPlay:true
    }

    const goNext = ()=>{
        sliderRef.slickNext();
    }
    const goBack = ()=>{
        sliderRef.slickPrev();
    }

    return (
        <CustomContainer>
            {
                state === 'loading' ? <MyLoaderComponent />
                    : state === 'loaded' ? (
                        <div className="row align-items-center" >
                            <div className="col-md-4" >
                                <Slider ref={ (slider)=> sliderRef = slider } {...settings}>
                                    {
                                        product.images.map(
                                            (img,index)=>{
                                                return (
                                                    <div key={index} className="item" >
                                                        <img src={img} className="w-100" alt="" />
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    
                                </Slider>
                                <div className="m-4 d-flex flex-row justify-content-evenly navbtns" >
                                    <button className="btn" onClick={goBack} >perv</button>
                                    <button className="btn" onClick={goNext} >next</button>
                                </div>
                            </div>
                            <div className="col-md-8" >
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <div className="d-flex flex-row justify-content-between mt-4" >
                                    <span> {product.price}EGP </span>
                                    <span>
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
                                        {product.ratingsAverage}
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between mt-4" >
                                    <button className="btn btn-secondary border-0 w-75 mx-auto" >
                                        add to cart
                                    </button>
                                    <FontAwesomeIcon icon={faHeart} size="xl" style={
                                        { color: "#1f513b", }
                                    } />
                                </div>
                            </div>
                        </div>
                    )
                        : null
            }
        </CustomContainer>
    );
}