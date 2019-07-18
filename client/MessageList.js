//Komponent Prezentacyjny
import React from 'react';
import styles from './MessageList.css';

const Message = props => (
    <div>
        <div className={styles.Message}>
            <strong>{props.from} : </strong>
            <span>{props.text}    </span>
            <span className={styles.messageTime}>{props.time}</span>
        </div>
    </div>
);

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message
                        key={i}
                        from={message.from}
                        text={message.text}
                        time={message.time}
                    />
                );
            })
        }
    </div>
);

export default MessageList;