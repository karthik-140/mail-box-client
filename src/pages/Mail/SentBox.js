import { useEffect } from 'react';
import {Table, Card, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { mailActions } from '../../store/mail-slice';
import ViewMail from './ViewMail';
import useHttp from '../../hooks/use-http';

const SentBox = () =>{
    const {sentMail} = useSelector(state => state.mail)
    const email = useSelector(state => state.auth.email);
    const dispatch = useDispatch();
    const {sendRequest} = useHttp();

    const viewMailHandler = (mail) =>{
        dispatch(mailActions.mailHandler());
        dispatch(mailActions.viewSentMail({mail: {...mail}}));
    }

    // const fetchInboxMail = async () => {
    //     const response = await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${email}.json`)
    //     if (!response.ok) {
    //         throw new Error("Could not fetch mail");
    //     } else {
    //         const data = await response.json();
    //         //console.log(data);
    //         const newData = [];
    //         for (let key in data) {
    //             newData.push({ id: key, ...data[key] });
    //         }
    //         //console.log(newData);
    //         dispatch(mailActions.updateSentMail({ mail: newData }))
    //     }
    // }

    // useEffect(() => {
    //     fetchInboxMail();
    // }, [])

    useEffect(() =>{
        const transformData = (data) =>{
            const newData = [];
            for(let key in data){
                newData.push({id: key, ...data[key]})
            }
            dispatch(mailActions.updateSentMail({mail: newData}))
        };
        sendRequest({
            url: `https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${email}.json`,
        }, transformData)
    }, [dispatch, email, sendRequest])
    

    return (
        <Card>
            <Card.Header style={{ padding: '20px' }}>
                <strong>Sent</strong>
            </Card.Header>
            {sentMail.length === 0 && <h1>No mails to show</h1>}
            {sentMail.length > 0 && <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Content</th>
                        <th>Sent To</th>
                    </tr>
                </thead>
                <tbody>
                    {sentMail.map((mail) => (
                        <tr key={mail.id}>
                            <td>{mail.subject}</td>
                            <td>{mail.body}</td>
                            <td>{mail.sentTo}</td>
                            <td>
                                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                                    View
                                </Button>
                            </td>
                            <ViewMail mail={mail} email={email} type={"sent"} />
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </Card>
    )
}

export default SentBox;