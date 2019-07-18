import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], messages: [], text: '', name: '', time: '', };
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({ users }) => this.chatUpdate(users));
    }

    // messagesUpdateTime() {
    //     this.setState({ time: new Date().toLocaleTimeString() })
    // }

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
    }

    chatUpdate(users) {
        this.setState({ users });
    }

    handleUserSubmit(name) {
        this.setState({ name });
        socket.emit('join', name);
    }

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
        socket.emit('message', message);
    }
    render() {
        this.state.time = new Date().toLocaleTimeString();
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }

    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.state.users}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.state.messages}
                        />
                        <button>x</button>
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.state.name}
                            time={this.state.time}
                        />
                    </div>
                </div>
            </div>
        );
    }
    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
    }
};

export default hot(module)(App);