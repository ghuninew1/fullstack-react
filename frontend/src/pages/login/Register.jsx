import GetData from "../../component/GetData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const userRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    const emailRef = useRef();
    const navigator = useNavigate();
    const { signupData } = GetData();

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
            <form
                className="form-signin w-100 mx-auto border rounded-3 p-5 shadow-lg mt-3"
                onSubmit={handleSubmit}
                style={{ maxWidth: "500px" }}
            >
                <div className="h1 mb-3 fw-normal">Register</div>
                <div className="mb-2">
                    <input
                        type="username"
                        name="username"
                        className="form-control login"
                        placeholder="Username"
                        ref={userRef}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control rounded-3"
                        placeholder="Email"
                        ref={emailRef}
                    />
                </div>
                <div className="mb-1">
                    <input
                        type="password"
                        name="password"
                        className="form-control rounded-3"
                        placeholder="Password"
                        ref={passRef}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        name="confirm"
                        className="form-control rounded-3"
                        placeholder="Confirm Password"
                        onInput={(e) => {
                            if (e.target.value !== passRef.current.value) {
                                e.target.setCustomValidity(
                                    "Password does not match"
                                );
                            } else {
                                e.target.setCustomValidity("");
                            }
                        }}
                        checked={passConfirmRef.current?.value}
                        ref={passConfirmRef}
                    />
                </div>
                <button
                    className="w-100 mb-2 btn btn-lg rounded-3 btn-success"
                    type="submit"
                >
                    Register
                </button>
                <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                    <Link to="/signin" className="text-decoration-none">
                        Sign in
                    </Link>
                </small>
                <hr className="my-4" />
                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                <button
                    className="w-100 py-2 mb-2 btn btn-warning rounded-3"
                    type="submit"
                >
                    <svg className="bi me-1" width="16" height="16">
                        <use xlinkHref="#twitter" />
                    </svg>
                    Sign in with Twitter
                </button>
                <button
                    className="w-100 py-2 mb-2 btn btn-primary rounded-3"
                    type="submit"
                >
                    <svg className="bi me-1" width="16" height="16">
                        <use xlinkHref="#facebook" />
                    </svg>
                    Sign in with Facebook
                </button>
                {/* <button
                                className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                                type="submit"
                            >
                                <svg className="bi me-1" width="16" height="16">
                                    <use xlinkHref="#github" />
                                </svg>
                                Sign in with GitHub
                            </button> */}
                <hr className="my-4" />
                <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                </small>
            </form>
        </>
    );
};

export default Register;
