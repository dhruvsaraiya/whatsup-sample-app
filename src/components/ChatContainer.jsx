import React, { useState, useCallback, useEffect, useMemo } from "react";
import { whatsupWidget } from "whatsup-sdk";
import { useHistory } from "react-router-dom";
import {
  Tab,
  Row,
  Col,
  Form,
  FormControl,
  Spinner,
  Card,
} from "react-bootstrap";
import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";

const ChatContainer = function ChatContainer(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  useEffect(() => {
    (async () => {
      if (!whatsupWidget.isWhatsAppConnected()) {
        history.push("/qrscan");
      } else {
        setLoading(true);
        const c = (await whatsupWidget.getChatsList()) || [];
        setChats(c);
        setFilteredChats(c);
        setLoading(false);
      }
    })();
  }, [history]);

  const filterChats = useCallback(
    (searchString) => {
      if (!searchString) {
        setFilteredChats(chats);
        return;
      }
      const fc = chats.filter((ch) => {
        return (
          ch.Name.toUpperCase().includes(searchString.toUpperCase()) ||
          ch.Jid.toUpperCase().includes(searchString.toUpperCase())
        );
      });
      setFilteredChats(fc);
    },
    [chats]
  );

  const onMessageSend = useMemo(() => {
    history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner animation="grow" />
        Fetching Chats...
      </div>
    );
  }
  return (
    <Tab.Container fluid onSelect={setSelectedChat} activeKey={selectedChat}>
      <Row>
        <Col sm={4} style={{ height: "100vh" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="search-chat-form"
          >
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => {
                filterChats(e.target.value);
              }}
            />
          </Form>
          <ChatList chats={filteredChats}></ChatList>
        </Col>
        <Col sm={8}>
          {/* SIDE CHAT VIEW */}
          {selectedChat ? (
            <Tab.Content>
              <Tab.Pane eventKey={selectedChat}>
                <ChatMessage
                  rJid={selectedChat}
                  chat={chats.find((c) => c.Jid === selectedChat)}
                  onMessageSend={onMessageSend}
                />
              </Tab.Pane>
            </Tab.Content>
          ) : (
            <Card body>Select chat to send message.</Card>
          )}
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ChatContainer;
