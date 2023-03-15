import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../components/store/mail-slice";

const ViewMail = (props) => {
    const viewMail = useSelector(state => state.mail.viewMail);
    const dispatch = useDispatch();

    const viewMailHandler = () => {
        dispatch(mailActions.mailHandler());
    }

    const deleteMailHandler = async () =>{
        await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${props.email}/${props.mail.id}.json`,{
            method: 'DELETE'
        })
        dispatch(mailActions.deleteReceivedMail({id: props.mail.id}));
       }

    return (
        <Modal
            show={viewMail}
            onHide={viewMailHandler}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.mail.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={deleteMailHandler}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewMail;