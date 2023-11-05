import { useRef } from "react";
import GetData from "../../component/GetData";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../store/DataContext";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Login = () => {
    const userRef = useRef();
    const passRef = useRef();
    const navigator = useNavigate();
    const { userCheck } = UseUser();
    const {signinData} = GetData();

    const handleCreate = async (e) => {
        e.preventDefault();

        const userData = { username: userRef.current.value, password: passRef.current.value };
        try {
            await signinData(userData).then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", res.data.username);
                userCheck(res.data);
                alert("Login Success ");
                navigator("/");
            });
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
                <Form
                    className="form-signin w-100 mx-auto border rounded-3 p-5 shadow-lg mt-3"
                    onSubmit={handleCreate}
                    style={{ maxWidth: "500px" }}
                >
                        <Form.Label className="h1 mb-3 fw-normal">Login</Form.Label>
                            <Form.Group className="mb-2" >
                                <Form.Control
                                    type="username"
                                    name="username"
                                    className="form-control login"
                                    placeholder="Username"
                                    ref={userRef}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className="form-control rounded-3"
                                    placeholder="Password"
                                    ref={passRef}
                                />
                            </Form.Group>
                        <Button
                            variant="success"
                            type="submit"
                            className="w-100 py-2 mb-2 btn btn-primary rounded-3"
                        >
                            Submit
                        </Button>
                        <Form.Text className="d-flex justify-content-center">
                            Don&apos;t have an account yet?
                            <Link to="/signup" className="text-decoration-none">
                                {" "}
                                Sign up
                            </Link>
                        </Form.Text>
                        <hr className="my-3" />
                        <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                        <Button
                            className="w-100 py-2 mb-2 btn btn-warning rounded-3"
                            type="submit"
                        >
                            <svg className="bi me-1" width="16" height="16">
                                <use xlinkHref="#twitter" />
                            </svg>
                            Sign in with Twitter
                        </Button>
                        <Button className="w-100 py-2 mb-2 btn btn-primary rounded-3" type="submit">
                            <svg className="bi me-1" width="16" height="16">
                                <use xlinkHref="#facebook" />
                            </svg>
                            Sign in with Facebook
                        </Button>
                        {/* <Button
                            className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                            type="submit"
                        >
                            <svg className="bi me-1" width="16" height="16">
                                <use xlinkHref="#github" />
                            </svg>
                            Sign in with GitHub
                        </Button> */}
                        <hr className="my-4" />
                        <Form.Text className="text-muted">
                            &copy; 2021
                            <a href=" " className="text-decoration-none">
                                {" "}
                                by Team 2
                            </a>
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#bootstrap" />
                            </svg>
                        </Form.Text>
                </Form>
        </>
    );
};

export default Login;
