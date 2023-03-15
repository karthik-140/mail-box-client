import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card, Button } from 'react-bootstrap';

import { mailActions } from "../../components/store/mail-slice";
import ViewMail from "./ViewMail";

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

    const viewMailHandler = async (mail) =>{
        //console.log(mail.id)
     await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${email}/${mail.id}.json`,{
        method: 'PUT',
        body: JSON.stringify({...mail, isRead: true})
     });
     dispatch(mailActions.viewMailHandle({id: mail.id}));
    }

    return (
        <Card>
            <Card.Header style={{ padding: '20px' }}>
                <strong>Inbox</strong>
            </Card.Header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Subject</th>
                        <th>Content</th>
                        <th>Sender</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedEmail.map((mail) => (
                        <tr key={mail.id}>
                            <td style={{ color: "blue", fontSize: "40px", textAlign: 'center' }}>
                                {!mail.isRead && "."}
                            </td>
                            <td>{mail.subject}</td>
                            <td>{mail.body}</td>
                            <td>{mail.sender}</td>
                            <td>
                                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                                    View
                                </Button>
                            </td>
                            <ViewMail mail={mail} email={email} type={"received"} />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}

export default Inbox;