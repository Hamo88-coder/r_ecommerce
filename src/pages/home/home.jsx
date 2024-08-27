
import React from 'react'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts.jsx'
import CategorySlider from '../../components/CategorySlider/CategorySlider.jsx'
import MainSlider from '../../components/MainSlider/MainSlider.jsx'
import { Helmet } from 'react-helmet'
import BrandSlider from '../../components/BrandSlider/BrandSlider.jsx'

export default function Home() {

    return <>
        <Helmet>
            <title>Fresh Cart</title>
        </Helmet>
        <div>
            <MainSlider />
            <div className='px-2 pt-1 pb-3'>
                <CategorySlider />
            </div>
            <FeaturedProducts />
            <div className='px-2 pb-4'>
                <BrandSlider />
            </div>
        </div>
        
    </>
}