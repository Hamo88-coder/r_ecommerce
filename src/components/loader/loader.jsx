import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import { RotatingLines } from 'react-loader-spinner'
import './loader.css';

const MyLoaderComponent = () => {
    return (
        <>
            <div className='load-screen' >
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </>
    );
};

export default MyLoaderComponent; 