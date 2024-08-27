

export default function CustomContainer (props){
    return (
        <div className="container my-5 py-5" >
            {props.children}
        </div>
    )
}