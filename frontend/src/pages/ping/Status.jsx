import { useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { IsDataObject, IsNumber } from "../../component/utils";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import CircularProgressBar from "../../component/CircularProgressBar";
import { useSocket } from "../../component/useSockets";

export default function Status() {
    const [datas, setDatas] = useState([]);
    const [visible, setVisible] = useState(false);
    const socket = useSocket().socket;

    const resetFileInput = (e) => {
        e.preventDefault();
        const formData = document.getElementById("ipgroup");
        formData.innerHTML = "";
    };

    const dataResult = (items = []) => {
        if (IsDataObject(items)) {
            const result = Object.entries(items).map(([key, value]) => (
                <tr key={value.id + key}>
                    <td>{value.restime}</td>
                    <td>{value.ip}</td>
                    <td>{value.host}</td>
                    <td>{IsNumber(value.time, 3)}</td>
                    <td>{value.output.split(" ")[27]}</td>

                </tr>
            ));
            return result 
        } else {
            return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const dataObj = Object.fromEntries(data.entries());

        const ips = [];
        Object.keys(dataObj).forEach((key) => {
            if (key.includes("ip")) {
                ips.push(dataObj[key]);
            }
        });
        const ints = [];
        Object.keys(dataObj).forEach((key) => {
            if (key.includes("int")) {
                ints.push(dataObj[key]);
            }
        });
        const nodeData = {};
        for (let i = 0; i < ips.length; i++) {
            nodeData[i] = { ip: ips[i], int: ints[i]};
        }

        socket.connect();
        socket.emit("status", nodeData);
        socket.on("nodeStatus", (data) => {
            setDatas((prevData) => ({
                ...prevData,
                [data.id]: data,
            }));
            setVisible(true);
        });
    };

    const handleClose = () => {
        socket.close();
        setVisible(false);
    };

    let count = 1;
    const addIp = () => {
        const input = document.getElementById("ipgroup");
        const div = document.createElement("div");
        const span = document.createElement("span");
        const span2 = document.createElement("span");
        const ipadd = document.createElement("input");
        const intadd = document.createElement("input");

        div.setAttribute("class", "input-group-sm input-group");
        span.setAttribute("class", "input-group-text");
        span.innerHTML = "int";
        intadd.setAttribute("type", "number");
        intadd.setAttribute("name", `int${count++}`);
        intadd.setAttribute("placeholder", "Interval");
        intadd.setAttribute("class", "form-control");
        intadd.setAttribute("value", 1);
        span2.setAttribute("class", "input-group-text");
        span2.innerHTML = "ip";
        ipadd.setAttribute("type", "text");
        ipadd.setAttribute("name", `ip${count++}`);
        ipadd.setAttribute("placeholder", "Ip");
        ipadd.setAttribute("class", "form-control");

        div.appendChild(span);
        div.appendChild(intadd);
        div.appendChild(span2);
        div.appendChild(ipadd);
        input.appendChild(div);
    };

    return (
        <Container>
            <Form
                className="form-group w-50 mx-auto my-3 border border-2 p-3 rounded-3"
                onSubmit={handleSubmit}
            >
                <Form.Group className="btn-group btn-group-sm d-flex justify-content-between accordion mb-2">
                    <Button onClick={addIp} className="btn-group-sm" variant="outline-info">
                        Add Ip
                    </Button>
                    <Button
                        onClick={resetFileInput}
                        className="btn-group-sm "
                        variant="outline-danger"
                    >
                        reset{" "}
                    </Button>
                    <Button type="submit" className="btn-group-sm" variant="outline-success">
                        Submit
                    </Button>
                    <Button
                        onClick={handleClose}
                        className="btn-group-sm "
                        variant="outline-warning"
                    >
                        Close
                    </Button>
                </Form.Group>
                <Form.Group id="ipgroup">
                    <InputGroup className="input-group-sm">
                        <InputGroupText>int</InputGroupText>
                        <Form.Control
                            type="number"
                            name="int"
                            placeholder="Interval"
                            className="form-group"
                            defaultValue={1}
                        />
                        <InputGroupText>ip</InputGroupText>

                        <Form.Control type="text" name="ip" placeholder="Ip" />
                    </InputGroup>
                </Form.Group>
            </Form>

            <Table striped bordered hover variant="" hidden={!visible} size="sm">
                <thead>
                    {datas && (
                        <tr className="text-center align-middle">
                            <th>Res (ms)</th>
                            <th>Host</th>
                            <th>InputHost</th>
                            <th>Time (ms)</th>
                            <th>Output</th>

                        </tr>
                    )}
                </thead>
                <tbody className="text-center align-middle">{dataResult(datas)}</tbody>
            </Table>
            {visible && (
                <Container className="text-center">
                    {Object.values(datas).map((data) => (
                        <span key={data.id} className="mx-2">
                            <CircularProgressBar
                                key={data.id}
                                selectedValue={data?.time && data.time}
                                maxValue={50}
                                radius={50}
                                withGradient
                                anticlockwise
                                activeStrokeColor={"#00ff00"}
                            />
                        </span>
                    ))}
                </Container>
            )}
        </Container>
    );
}
