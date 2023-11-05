import { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
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

const GetApi = () => {
    const [datas, setDatas] = useState([]);
    const [message, setMessage] = useState("");
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

    const dataValue = (items = []) => {
        if (IsDataArray(items) && items.length > 0) {
            return items?.map((item,idx) => (
                <tr key={item._id} className="align-middle">
                    <td>{idx +1}</td>
                    <td>{item.name}</td>
                    <td>{item.detail}</td>
                    <td>{item.price}</td>
                    {item.file && (
                    <td id="preview-img" className="text-center">
                        <Image
                            src={import.meta.env.VITE_API_URL + "/uploads/" + (item?.file &&  item.file)}
                            alt={item.name}
                        />
                    </td>
                    )}
                    <td>{ToLocalTime(item.updatedAt)}</td>
                    <td>{ToLocalTime(item.createdAt)}</td>
                    <td className="text-center btn-btn-group-vertical">
                        <span className="btn-group">
                            <Button className="btn-warning">
                                <Link
                                    to={"/api/edit/" + item._id}
                                    className="text-decoration-none text-dark"
                                >
                                    Edit
                                </Link>
                            </Button>
                            <Button className="btn-danger"
                            onClick={() => handleDelete(item._id)}>
                                Del
                            </Button>
                        </span>
                    </td>
                </tr>
            ));
        }
    };
    return (
        <Container>
            {ShowSuccess(message)}
            <Button variant="outline-info" className="float-end">
                <Link to="/api/create" className="text-decoration-none text-info">
                    Create
                </Link>
            </Button>
            <Table striped bordered hover variant="" hidden={false}>
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
                <tbody>
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

export default GetApi;
