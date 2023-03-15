import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './ComposeMail.css';

import React, { useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { useSelector } from "react-redux";

const ComposeEmail = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const email = useSelector(state => state.auth.email)
    const inputMailRef = useRef()
    const inputSubjectRef = useRef();

    const editorHandler = (editorState) => {
        setEditorState(editorState)
    }

    const composeMailHandler = async (event) => {
        event.preventDefault();
        const receiverEmail = inputMailRef.current.value.replace('@', '').replace('.', '');
        const receiverMailData = {
            sender: email,
            subject: inputSubjectRef.current.value,
            body: editorState.getCurrentContent().getPlainText()
        }
        const senderMailData = {
            sentTo: receiverEmail,
            subject: inputSubjectRef.current.value,
            body: editorState.getCurrentContent().getPlainText()
        }
        try {
            await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${receiverEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(receiverMailData)
            })
            await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${email}.json`, {
                method: 'POST',
                body: JSON.stringify(senderMailData)
            })
        } catch (error) {
            alert(error);
        }
        inputMailRef.current.value = '';
        inputSubjectRef.current.value = '';
        setEditorState(null);
    }
    return (
        <div style={{ width: 60 + "%", justifyContent: "center", margin: "auto" }}>
            <Form onSubmit={composeMailHandler} className="text-center mt-2 mr-3">
                <Button variant="secondary" type="submit" className="mt-2, mb-3">Send</Button>
                <Row >
                    <Col xs={1}>
                        <Form.Label>To</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control ref={inputMailRef} type="email" placeholder="Enter email" />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Form.Control ref={inputSubjectRef} type="text" placeholder="Subject" />
                    </Col>
                </Row>
                <hr />
                <Row className="border-1 editor-class">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={editorHandler}
                    />
                </Row>
            </Form>
        </div>
    );
};

export default ComposeEmail;