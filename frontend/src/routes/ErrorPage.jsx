import { Alert, Form } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <Form className="d-flex flex-column justify-content-center align-items-center">
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            </Alert>
            <Alert variant="warning">
                <Alert.Heading>Status: {error.status || error.code}</Alert.Heading>
                <Alert.Heading>Message: {error.statusText || error.message}</Alert.Heading>
            </Alert>
        </Form>
    );
}
