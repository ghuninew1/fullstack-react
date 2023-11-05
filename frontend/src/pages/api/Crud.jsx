import { useState, useEffect, useRef } from "react";
import { Table, Button, Form, Container } from "react-bootstrap";
import GetData from "../../component/GetData";
import {
    ToLocalTime,
    IsDataArray,
    IsData,
    Image,
    IsConfirm,
    ShowSuccess,
} from "../../component/utils";
import { Link } from "react-router-dom";

const Crud = () => {
    const [datas, setDatas] = useState([]);
    const [message, setMessage] = useState("");
    const [isEdit, setIsEdit] = useState(null);
    const fileRef = useRef(null);
    const {getAllDataRe,removeData} = GetData();
    const { data } = getAllDataRe();

    useEffect(() => {
        if (IsData(data)) {
            setDatas(IsData(data) ? data : []);
        }
    }, [data]);

    const handleDelete = async (id) => {
        if (IsConfirm("Delete")) {
            const res = await removeData(id);
            if (res.status === 200) {
                setDatas(datas.filter((item) => item._id !== id));
                setMessage("Delete Success");
            }
        } else {
            setMessage("Delete Cancel");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = Object.fromEntries(formData);
        const res = await GetData.update(isEdit, body);
        if (res.status === 200) {
            setIsEdit(null);
            setMessage("Update Success");
        } else {
            setMessage("Update Fail");
        }
    };

    const dataValue = (items = []) => {
        if (IsDataArray(items)) {
            return items?.map((item, idx) => (
                <tr key={item._id} className="table-hover w-100">
                    <td>{idx + 1}</td>
                    <td>
                        {isEdit !== item._id ? (
                            item.name
                        ) : (
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="name"
                                defaultValue={item.name}
                            />
                        )}
                    </td>
                    <td>
                        {isEdit !== item._id ? (
                            item.detail
                        ) : (
                            <Form.Control
                                type="text"
                                name="detail"
                                placeholder="detail"
                                defaultValue={item.detail}
                            />
                        )}
                    </td>
                    <td>
                        {isEdit !== item._id ? (
                            item.price
                        ) : (
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="price"
                                defaultValue={item.price}
                            />
                        )}
                    </td>
                    <td id="preview-img" className="text-center">
                        {isEdit !== item._id ? (
                            <>
                                <Image
                                    src={import.meta.env.VITE_API_URL + "/uploads/" + item?.file}
                                    alt={item.name}
                                />
                            </>
                        ) : (
                            <span>
                                <Form.Control
                                    type="file"
                                    name="file"
                                    placeholder="file"
                                    ref={fileRef}
                                />
                                <Image
                                    src={
                                        fileRef.current
                                            ? fileRef.current.files[0] &&
                                              URL.createObjectURL(fileRef.current.files[0])
                                            : import.meta.env.VITE_API_URL +
                                              "/uploads/" +
                                              item?.file
                                    }
                                    alt={item.name}
                                />
                            </span>
                        )}
                    </td>

                    <td>{ToLocalTime(item.updatedAt)}</td>
                    <td>{ToLocalTime(item.createdAt)}</td>
                    <td className="text-center btn-btn-group-vertical">
                        <span className="btn-group">
                            {isEdit === item._id ? (
                                <Button className="btn-primary btn-group-sm" onClick={handleSubmit}>
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    className="btn-warning btn-group-sm"
                                    onClick={() => setIsEdit(item._id)}
                                >
                                    Edit
                                </Button>
                            )}

                            {isEdit === item._id ? (
                                <Button
                                    className="btn-secondary btn-group-sm"
                                    onClick={() => setIsEdit(null)}
                                >
                                    Cancel
                                </Button>
                            ) : (
                                <Button
                                    className="btn-danger btn-group-sm"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Del
                                </Button>
                            )}
                        </span>
                    </td>
                </tr>
            ));
        }
    };
    return (
        <Container>
            {ShowSuccess(message)}
            <Button variant="info" className="float-end">
                <Link to="/api/create" className="text-decoration-none text-dark">
                    Create
                </Link>
            </Button>
            <Table striped bordered hover variant="" hidden={false} className="align-middle">
                <thead>
                    {datas && (
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>detail</th>
                            <th>price</th>
                            <th>file</th>
                            <th>updatedAt</th>
                            <th>createdAt</th>
                            <th>Action</th>
                        </tr>
                    )}
                </thead>
                <tbody className="align-middle">
                    {IsDataArray(datas) ? (
                        dataValue(datas)
                    ) : (
                        <tr>
                            <td colSpan="7">No Data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default Crud;
