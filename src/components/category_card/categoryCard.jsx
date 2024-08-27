import './style.css';

export default function CategoryCard(props) {
    const category = props.category
    let imgStyle = {
        "objectFit": "cover",
        "height": "300px"
    }
    return (
        <div className="col-md-4" >
            <div className='card  categ-card' >
                <div className="card-img">
                    <img alt="" className="img-fluid ratio-4x3" src={category.image} style={imgStyle} />
                </div>
                <div className="card-body">
                    <p className="text-success h3 text-center">
                        { category.name }
                    </p>
                </div>
            </div>
        </div>
    );
}