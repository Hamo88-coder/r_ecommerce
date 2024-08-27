import { useContext, useEffect, useState } from 'react'
import CustomContainer from '../../components/container'
import MyLoaderComponent from '../../components/loader/loader';
import { ProductContext } from '../../context/productContext';

function BrandCard(props) {
    const brand = props.brand
    return (
        <div className='col-md-3' >
            <div className="card ">
                <div className="card-img">
                    <img alt="" className="img-fluid" src={brand.image} />
                </div>
                <div className="card-body">
                    <p className="text-center">{brand.name}</p>
                </div>
            </div>
        </div>
    )
}

export default function Brands() {

    const [brands, setBrands] = useState([]);
    const [state, setState] = useState('init');

    let { getAllBrands } = useContext(ProductContext)

    async function getBrands() {
        setState('loading')
        let res = await getAllBrands()
        if (res?.data != null) {
            setBrands(res?.data?.data);
        }
        setState('loaded');
    }

    useEffect(
        () => {
            getBrands()
        }, []
    )

    return (
        <CustomContainer>
            {state === 'loading' ? <MyLoaderComponent /> : null}
            <div className='row g-4' >
                {
                    brands?.map(
                        (value) => {
                            return (<BrandCard key={value._id} brand={value} />);
                        }
                    )
                }
            </div>
        </CustomContainer>
    )
}