import React, { Component } from 'react';
import { Join } from "./components/Join/Join"
import { Chat } from "./components/Chat/Chat"

export class ChatApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step : "auth", // can be : auth | chat
            room: "",
            name: ""
        };
        
        this.startChat = this.startChat.bind(this)


    }

    componentDidMount() {
        this.setState({name : this.props.profile.first_name })
    }

    startChat(room) {
        this.setState({room : room, step : 'chat'})
    }

    render() {

        return (
            this.state.step === "auth"
            ?
            <Join setRoom={this.startChat} />
            :
            <Chat name={this.state.name} room={this.state.room} />
        );
    }
}

export default ChatApp;