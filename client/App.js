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
        this.state = { users: [], messages: [], text: '', name: '', time: new Date().toLocaleTimeString() };
    }
    render() {
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
                            users={this.state.users}
                            time={this.state.time}
                        />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.state.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({ users }) => this.chatUpdate(users));
    }

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
};

export default hot(module)(App);