import { useState, useRef } from "react";
import GetData from "../../component/GetData";

const Upload = () => {
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [showProgressBar, setProgressBarVisibility] = useState(false);
    const [files, setFiles] = useState(null);
    const [name, setName] = useState("");
    const [upload, setUpload] = useState("");

    const inputRef = useRef(null);
    const { uploadData } = GetData();

    const resetFileInput = () => {
        inputRef.current.value = null;
        setFiles(null);
        setName("");
        setUpload("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setProgressBarVisibility(true);
        const formData = new FormData();

        const onUploadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
            setUploadPercentage(percent);
        };

        formData.append("file", files[0]);
        formData.append("name", name);

        const res = uploadData(formData, onUploadProgress);
        setUpload(res.message + res.duration + "ms");

        setTimeout(() => {
            setProgressBarVisibility(false);
            setUploadPercentage(0);
        }, 3000);
    };

    return (
        <div className="text-center vh-50 d-flex align-items-center justify-content-center">
            <form className="w-50" onSubmit={onSubmit}>
                {files && files.length > 0 && (
                    <div>
                        <h3>File Details:</h3>
                        {files[0].name && <p>File Name: {files[0].name} </p>}
                        {files[0].type && <p>File Type: {files[0].type} </p>}
                        {files[0].lastModifiedDate && (
                            <p>
                                File Last Modified:{" "}
                                {files[0].lastModifiedDate.toDateString()}{" "}
                            </p>
                        )}
                        {files[0].size && (
                            <p>File Size: {files[0].size / 1000} KB</p>
                        )}
                        {files[0].type.includes("image") && (
                            <img
                                src={URL.createObjectURL(files[0])}
                                alt="preview"
                                style={{ width: "200px", height: "auto" }}
                            />
                        )}
                    </div>
                )}
                <div controlId="formFile" className="mb-3">
                    <div>{upload}</div>
                    <div className="mb-3">
                        <div>Name</div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div>Upload</div>
                        <input
                            type="file"
                            name="file"
                            className="form-control"
                            aria-label="Upload"
                            formEncType="multipart/form-data"
                            disabled={showProgressBar}
                            ref={inputRef}
                            onChange={(e) => setFiles(e.target.files)}
                        />
                        <button
                            variant="outline-secondary"
                            onClick={resetFileInput}
                        >
                            Clear
                        </button>
                    </div>
                    <button variant="outline-success" type="submit">
                        Submit
                    </button>
                    <br />
                    <ProgressBar
                        max="100"
                        now={uploadPercentage}
                        hidden={!showProgressBar}
                        label={`${uploadPercentage}%`}
                        variant="success"
                    />
                </div>
            </form>
        </div>
    );
};

export default Upload;
