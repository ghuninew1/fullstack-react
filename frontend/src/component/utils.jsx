import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export const ToLocalDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("th-TH");
};

export const ToLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString("th-TH");
};

export const IsData = (data) => {
    if (data !== null && data !== undefined && data) return data;
};

export const IsDataArray = (data) => {
    if (data !== null && data !== undefined && data.length > 0) return data;
};

export const IsDataObject = (data) => {
    if (data !== null && data !== undefined && Object.keys(data).length > 0) return data;
};

export const IsDataObjectArray = (data) => {
    if (data !== null && data !== undefined && data.length > 0 && Object.keys(data[0]).length > 0)
        return data;
};

export const IsHidden = (data) => {
    if (data === null || data === undefined || data === "") return data ? true : false;
};
export const OnMessage = (message) => {
    // setTimeout(() => {
    //     message.onClose();
    // } , 1000);
    return (
        <Alert variant={message.variant} onClose={message.onClose} dismissible>
            {message.message}
        </Alert>
    );
};

export const Image = ({ src, alt, width, maxHeight }) => {
    const showImage = (e) => {
        e.preventDefault();
        const img = document.createElement("img");
        img.src = e.target.src;
        img.style.maxWidth = "80%";
        img.style.maxHeight = "80%";
        img.style.position = "fixed";
        img.style.top = 0;
        img.style.left = 0;
        img.style.marginLeft = "10%";
        img.style.marginTop = "5%";
        img.style.zIndex = 1000;
        img.style.backgroundColor = "rgba(0,0,0,0.5)";
        img.style.cursor = "zoom-out";
        img.style.borderRadius = "5px";
        img.style.boxShadow = "0 0 10px 0 rgba(0,0,0,0.5)";
        img.onclick = () => {
            img.remove();
        };

        document.getElementById("preview-img").appendChild(img);
        return false;
    };

    return (
        <img
            src={src ? src : "/images/404.png"}
            alt={alt ? alt : "404"}
            style={{
                width: width ? width : "auto",
                maxHeight: maxHeight ? maxHeight : "40px",
                cursor: "zoom-in",
            }}
            className="img-fluid transition"
            onClick={(e) => showImage(e)}
        />
    );
};

export const IsNumber = (data, tf=6) => {
    if (data !== null && data !== undefined && data !== "" && !isNaN(data))
        return Number(data && data).toFixed(tf ? tf : 3);
};

export const IsConfirm = (message) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm === true) {
        return message;
    } else {
        return false;
    }
};

export const ShowEerror = (error) => {
    if (error) {
        return (
            <Alert variant="danger" onClose={() => {}} dismissible>
                {error}
            </Alert>
        );
    }
};

export const ShowLoading = (loading) => {
    if (loading) {
        return (
            <Alert variant="info" onClose={() => {}} dismissible>
                Loading...
            </Alert>
        );
    }
};

export const ShowSuccess = (success) => {
    if (success) {
        return (
            <Alert variant="success" onClose={() => {}} dismissible>
                Success... {success}
            </Alert>
        );
    }
};
export const ResTime = (start) => {
    if (!start) return performance.now();
    const end = performance.now() - start;
    const responseTime = end.toFixed(2);
    return responseTime;
};

IsNumber.propTypes = {
    data: PropTypes.string,
    tf: PropTypes.number,
};

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    maxHeight: PropTypes.string,
};
