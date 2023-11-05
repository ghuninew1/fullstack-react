import { useState, useRef } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import GetData from "../../component/GetData";

export default function Ping() {
    const [datas, setDatas] = useState([]);
    const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isIp, setIsIp] = useState("1.0.0.1");
    const { getIp, getPingRe } = GetData();

    const inputRef = useRef(null);
    const resetFileInput = () => {
        inputRef.current.value = null;
    };


    const dataResult = (items = []) => {
        if (items?.length > 1) {
            items.slice(1);
            return items?.map((item) => (
                <tr key={item.inputHost.toString()}>
                    <td>{item.host}</td>
                    <td>{item.inputHost}</td>
                    <td>{item.avg}</td>
                    <td>{item.max}</td>
                    <td>{item.min}</td>
                    <td>{item.time}</td>
                    <td>{item.packetLoss}</td>
                </tr>
            ));
        } else {
            return Object.entries(items).map((item, index) => (
                <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                </tr>
            ));
        }
    };
    // const ip = inputRef.current.value;
    const {data} = getPingRe(isIp);

    const hendleSubmit = async (e) => {
        e.preventDefault();
        const ip = inputRef.current.value;
        if (check) {
            setIsIp(ip);
            setDatas(data);
            setVisible(true);

        } else {
            const res = await getIp(ip);
            setDatas(res.data);
            setVisible(true);
        }
    };

    return (
        <Container>
            <Form
                onSubmit={hendleSubmit}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{check ? "Ping" : "IP"}</InputGroup.Text>

                        <Form.Control
                            type="text"
                            name="ip"
                            placeholder="Ip"
                            aria-label="Ip"
                            ref={inputRef}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={resetFileInput}
                            className="btn-sm"
                        />

                        <Button variant="outline-info" type="submit" className="btn-sm">
                            Submit
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="ms-3 mb-3 input-group justify-content-center align-items-center">
                    <Form.Check type="checkbox" onChange={() => setCheck(!check)} />
                    <div className="vr mx-2" />
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="" hidden={!visible} className="table-responsive">
                <thead>
                    {datas?.length > 1 ? (
                        <tr>
                            <th>Host</th>
                            <th>InputHost</th>
                            <th>Avg</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Time</th>
                            <th>PacketLoss</th>
                        </tr>
                    ) : (
                        <tr>
                            <th>#</th>
                            <th>Value</th>
                        </tr>
                    )}
                </thead>
                <tbody>{datas && dataResult(datas)}</tbody>
            </Table>
        </Container>
    );
}
