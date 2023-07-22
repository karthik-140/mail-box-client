import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ComposeMail.css";

import React, { useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

const ComposeEmail = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const email = useSelector((state) => state.auth.email);
  const inputMailRef = useRef();
  const inputSubjectRef = useRef();
  const { sendRequest } = useHttp();

  const editorHandler = (editorState) => {
    setEditorState(editorState);
  };

  const composeMailHandler = (event) => {
    event.preventDefault();
    const receiverEmail = inputMailRef.current.value
      .replace("@", "")
      .replace(".", "");
    const receiverMailData = {
      sender: email,
      subject: inputSubjectRef.current.value,
      body: editorState.getCurrentContent().getPlainText(),
      isRead: false,
    };
    const senderMailData = {
      sentTo: receiverEmail,
      subject: inputSubjectRef.current.value,
      body: editorState.getCurrentContent().getPlainText(),
    };
    // try {
    //     await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${receiverEmail}.json`, {
    //         method: 'POST',
    //         body: JSON.stringify(receiverMailData)
    //     })
    //     await fetch(`https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${email}.json`, {
    //         method: 'POST',
    //         body: JSON.stringify(senderMailData)
    //     })
    // } catch (error) {
    //     alert(error);
    // }
    sendRequest({
      url: `https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${receiverEmail}.json`,
      method: "POST",
      body: receiverMailData,
    });
    sendRequest({
      url: `https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${email}.json`,
      method: "POST",
      body: senderMailData,
    });
    inputMailRef.current.value = "";
    inputSubjectRef.current.value = "";
    setEditorState(null);
  };
  return (
    <div style={{ width: 60 + "%", justifyContent: "center", margin: "auto" }}>
      <Form onSubmit={composeMailHandler} className="text-center mt-5 mr-3 border p-4">
        <Button variant="secondary" type="submit" className="mb-3">
          Send
        </Button>
        <Row>
          <Col xs={1}>
            <Form.Label>To</Form.Label>
          </Col>
          <Col>
            <Form.Control
              ref={inputMailRef}
              type="email"
              placeholder="Enter email"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Control
              ref={inputSubjectRef}
              type="text"
              placeholder="Subject"
            />
          </Col>
        </Row>
        <br />
        <Row className="border border-dark" style={{height: "250px"}} >
          <Col>
            <Editor

              editorState={editorState}
              onEditorStateChange={editorHandler}
              placeholder="start typing..."
              
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ComposeEmail;
