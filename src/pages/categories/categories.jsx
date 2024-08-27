import { useContext, useEffect, useState } from 'react';
import CategoryCard from '../../components/category_card/categoryCard';
import MyLoaderComponent from '../../components/loader/loader';
import { ProductContext } from '../../context/productContext';

export default function Categories() {
    const [state, setState] = useState('init');

    let { getAllCategories,
        categories,
        setCategories} = useContext(ProductContext)

    async function getcategories() {
        setState('loading')
        let res = await getAllCategories()
        if (res?.data != null) {
            setCategories(res?.data?.data);
        }
        setState('loaded');
    }

    useEffect(() => {
        getcategories();
    }, []);

    return (
        <div className='container my-5 py-5' >
            {state === 'loading' ? <MyLoaderComponent /> : null}
            <div className='row g-4' >
                {
                    categories?.map(
                        (category) => {
                            return <CategoryCard key={category._id} category={category} />
                        }
                    )
                }
            </div>
        </div>
    );
}