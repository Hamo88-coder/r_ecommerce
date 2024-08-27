import { React } from "react";
import Container from "../../components/container";



function ErrorPage(props) {
    return (
        <Container>
            <h1> Error {props.error} </h1>
        </Container>
    );
}

export default ErrorPage;