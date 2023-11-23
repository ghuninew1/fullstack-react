import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
                <div>Oh snap! You got an error!</div>
            </div>
            <div>
                <div>Status: {error.status || error.code}</div>
                <div>Message: {error.statusText || error.message}</div>
            </div>
        </div>
    );
}
