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
                var date = new Date().toLocaleTimeString()
                console.log('coto', props.time)
                return (
                    <Message
                        key={i}
                        from={message.from}
                        text={message.text}
                        time={date}
                    />
                );
            })
        }
    </div>
);

export default MessageList;