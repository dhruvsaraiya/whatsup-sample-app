import React from 'react';
import { Nav } from 'react-bootstrap';

const ChatList = function ChatList(props) {
    const { chats } = props;
    return (
        <Nav variant="pills" className="flex-column">
            {(chats || []).map((ch) => {
                let display = ch.Name;
                display = display || ch.Jid.replace(/@s.whatsapp.net/g, "");
                return (
                    <Nav.Item key={ch.Jid} >
                        <Nav.Link as="div" eventKey={ch.Jid} key={ch.Jid} style={{overflow: 'auto'}}><div style={{ float: 'left' }}>{display}</div><div style={{ float: 'right' }}>{ch.Unread}</div></Nav.Link>
                    </Nav.Item>
                )
            })}
        </Nav>
    )
}

export default ChatList;