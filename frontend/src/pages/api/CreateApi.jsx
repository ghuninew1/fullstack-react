import { useState, useRef } from "react";
import GetData from "../../component/GetData";
import { useNavigate } from "react-router-dom";
import { Image, ShowSuccess } from "../../component/utils";

const CreateApi = () => {
    const [check, setCheck] = useState(false);
    const nameRef = useRef(null);
    const detailRef = useRef(null);
    const priceRef = useRef(null);
    const fileRef = useRef(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [upload, setUpload] = useState("");
    const navigate = useNavigate();
    const { createData } = GetData();

    const resetFileInput = (e) => {
        e.preventDefault();
        fileRef.current.value = null;
        nameRef.current.value = null;
        detailRef.current.value = null;
        priceRef.current.value = null;
        setCheck(false);
    };

    const hendleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            detail: detailRef.current.value,
            price: priceRef.current.value,
            file: fileRef.current.files[0],
        };

        const fromData = new FormData();
        fromData.append("name", data.name);
        fromData.append("detail", data.detail);
        fromData.append("price", data.price);
        fromData.append("file", data.file);

        const onUploadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
            setUploadPercentage(percent);
        };

        setCheck(true);
        const res = createData(fromData, onUploadProgress);
        res.then((res) => {
            console.log("res", res);
        });
        setTimeout(() => {
            setCheck(false);
            setUploadPercentage(0);
            navigate("/api/get");
        }, 1000);
    };

    return (
        <div>
            {ShowSuccess(upload)}
            <form
                onSubmit={hendleSubmit}
                className="form-group w-50 mx-auto my-5 border border-2 p-5 rounded-3"
            >
                <div className="form-group">
                    <div className="form-group mb-3">
                        <div>name</div>

                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            ref={nameRef}
                        />
                    </div>
                    <div className="form-group-input mb-3">
                        <div>detail</div>
                        <input
                            type="text"
                            name="detail"
                            placeholder="detail"
                            ref={detailRef}
                        />
                    </div>
                    <div className="form-group-input mb-3">
                        <div>price</div>
                        <input
                            type="number"
                            name="price"
                            placeholder="price"
                            ref={priceRef}
                        />
                    </div>
                    <div className="form-group-input mb-3">
                        <div>File</div>
                        <input
                            type="file"
                            name="file"
                            placeholder="file"
                            ref={fileRef}
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    setCheck(true);
                                } else {
                                    setCheck(false);
                                }
                            }}
                        />
                        <button onClick={resetFileInput} />
                    </div>
                    <div className="form-group-input mb-3">
                        <button
                            onClick={() => navigate("/api/get")}
                            className="btn-group w-50 form-control"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="btn-group w-50 form-control d-flex justify-content-end"
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div
                    className="form-group form-text text-center"
                    id="preview-img"
                >
                    {check && (
                        <Image
                            src={URL.createObjectURL(fileRef.current.files[0])}
                            alt="preview"
                        />
                    )}

                    {check && (
                        <div>
                            <div>{upload}</div>
                            <progress
                                max="100"
                                value={uploadPercentage}
                                hidden={!check}
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateApi;
