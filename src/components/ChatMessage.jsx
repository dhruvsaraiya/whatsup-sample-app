import React, { useCallback, useState } from "react";
import { whatsupWidget } from "whatsup-sdk";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";

const ChatMessage = function ChatMessage(props) {
  const { chat, onMessageSend } = props;
  const [sending, setSending] = useState(false);
  const [error, setError] = useState();
  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      const { message } = values;
      if (!message) return;
      setSending(true);
      try {
        await whatsupWidget.sendTextMessage(chat.Jid, message);
      } catch (e) {
        setError(e.message);
        setSending(false);
        return;
      }
      onMessageSend && onMessageSend();
      setSending(false);
    },
    [chat.Jid, onMessageSend]
  );

  if (error) {
    return (
      <Alert variant="danger" onClose={() => setError()} dismissible>
        <Alert.Heading>Oops, message not sent!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }
  return (
    <Formik onSubmit={onSubmit} initialValues={{ message: "" }}>
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMessage">
            <Form.Label>Message to {chat && chat.Name}</Form.Label>
            <Form.Control
              name="message"
              type="textarea"
              placeholder="Type message here..."
              value={values.message}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={sending || !values.message}
          >
            {sending ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />
                <span>Loading...</span>
              </>
            ) : (
              "Send"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatMessage;
