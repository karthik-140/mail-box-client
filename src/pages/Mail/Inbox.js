import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card } from 'react-bootstrap';

import { mailActions } from "../../components/store/mail-slice";

const Inbox = () => {
    const email = useSelector(state => state.auth.email);
    const receivedEmail = useSelector(state => state.mail.receivedMail)
    const dispatch = useDispatch();
    //console.log(email);

    const fetchInboxMail = async () => {
        const response = await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${email}.json`)
        if (!response.ok) {
            throw new Error("Could not fetch mail");
        } else {
            const data = await response.json();
            //console.log(data);
            const newData = [];
            for (let key in data) {
                newData.push({ id: key, ...data[key] });
            }
            //console.log(newData);
            dispatch(mailActions.updateReceiverMail({ mail: newData }))
        }
    }

    useEffect(() => {
        fetchInboxMail();
    }, [])

    return (
        <Card>
            <Card.Header style={{ padding: '20px' }}>
                <strong>Inbox</strong>
            </Card.Header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Content</th>
                        <th>Sender</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedEmail.map((mail) => (
                        <tr key={mail.id}>
                            <td>{mail.subject}</td>
                            <td>{mail.body}</td>
                            <td>{mail.sender}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}

export default Inbox;