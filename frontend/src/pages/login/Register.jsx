import GetData from "../../component/GetData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Register = () => {
    const userRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    const emailRef = useRef();
    const navigator = useNavigate();
    const {signupData} = GetData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: userRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
        };
        try {
            await signupData(body).then((res) => {
                alert("Register Success " + res.data.username);
                navigator("/signin");
            });
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <>
            <Form
                className="form-signin w-100 mx-auto border rounded-3 p-5 shadow-lg mt-3"
                onSubmit={handleSubmit}
                style={{ maxWidth: "500px" }}
            >
                <Form.Label className="h1 mb-3 fw-normal">Register</Form.Label>
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
                        type="email"
                        name="email"
                        className="form-control rounded-3"
                        placeholder="Email"
                        ref={emailRef}
                    />
                </Form.Group>
                <Form.Group className="mb-1" >
                    <Form.Control
                        type="password"
                        name="password"
                        className="form-control rounded-3"
                        placeholder="Password"
                        ref={passRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control
                        type="password"
                        name="confirm"
                        className="form-control rounded-3"
                        placeholder="Confirm Password"
                        onInput={(e) => {
                            if (e.target.value !== passRef.current.value) {
                                e.target.setCustomValidity("Password does not match");
                            } else {
                                e.target.setCustomValidity("");
                            }
                        }}
                        checked={passConfirmRef.current?.value}
                        ref={passConfirmRef}
                    />
                </Form.Group>
                <Button className="w-100 mb-2 btn btn-lg rounded-3 btn-success" type="submit">
                    Register
                </Button>
                <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                    <Link to="/signin" className="text-decoration-none">
                        Sign in
                    </Link>
                </small>
                <hr className="my-4" />
                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                <Button className="w-100 py-2 mb-2 btn btn-warning rounded-3" type="submit">
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
                <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                </small>
            </Form>
        </>
    );
};

export default Register;
