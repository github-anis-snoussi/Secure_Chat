import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import {
    ChatList,
    MessageList,
    Input,
    Button,
    SideBar,
} from 'react-chat-elements';


import Identicon from 'identicon.js';

export class ChatApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
        };

        this.addMessage = this.addMessage.bind(this);
    }


    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    token() {
        return (parseInt(Math.random() * 10 % 8));
    }

    photo(size) {
        return new Identicon(String(Math.random()) + String(Math.random()), {
            margin: 0,
            size: size || 20,
        }).toString()
    }

    random() {

        // status can be:  sent | received | read

        const mtype = 'text';
        const status = 'received';

            return {
                    position: (this.token() >= 1 ? 'right' : 'left'),
                    forwarded: true,
                    replyButton: true,
                    removeButton: true,
                    retracted: false,
                    reply: this.token() >= 1 ? ({
                        photoURL: this.token() >= 1 ? `data:image/png;base64,${this.photo(150)}` : null,
                        title: "Lorem ipsum",
                        titleColor: this.getRandomColor(),
                        message: "Lorem",
                    }) : null,
                    meeting: this.token() >= 1 ? ({
                        subject: "Lorem ipsum",
                        title: "Lorem ipsum",
                        date: +new Date(),
                        collapseTitle: "Lorem ipsum",
                        participants: Array(this.token() + 6).fill(1).map(x => ({
                            id: parseInt(Math.random() * 10 % 7),
                            title: "Lorem",
                        })),
                        dataSource: Array(this.token() + 5).fill(1).map(x => ({
                            id: String(Math.random()),
                            avatar: `data:image/png;base64,${this.photo()}`,
                            message: "Lorem ipsummmm",
                            title: "Lorem ipsum",
                            avatarFlexible: true,
                            date: +new Date(),
                            event: {
                                title: "Lorem ipsum",
                                avatars: Array(this.token() + 2).fill(1).map(x => ({
                                    src: `data:image/png;base64,${this.photo()}`,
                                    title: "react, rce"
                                })),
                                avatarsLimit: 5,
                            },
                            record: {
                                avatar: `data:image/png;base64,${this.photo()}`,
                                title: "Lorem",
                                savedBy: 'Kaydeden: Lorem ipsum',
                                time: new Date().toLocaleString(),
                            },
                        })),
                    }) : null,
                    type: mtype,
                    theme: 'white',
                    view: 'list',
                    title: "Lorem ipsum",
                    titleColor: this.getRandomColor(),
                    text: "Lorem ipsummmmmmmm",
                    data: {
                        videoURL: this.token() >= 1 ? 'https://www.w3schools.com/html/mov_bbb.mp4' : 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
                        audioURL: 'https://www.w3schools.com/html/horse.mp3',
                        uri: `data:image/png;base64,${this.photo(150)}`,
                        status: {
                            click: true,
                            loading: 0.5,
                            download: mtype === 'video',
                        },
                        size: "100MB",
                        width: 300,
                        height: 300,
                        latitude: '37.773972',
                        longitude: '-122.431297',
                        staticURL: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY',
                    },
                    onLoad: () => {
                        console.log('Photo loaded');
                    },
                    status: status,
                    date: +new Date(),
                    onReplyMessageClick: () => {
                        console.log('onReplyMessageClick');
                    },
                    onRemoveMessageClick: () => {
                        console.log('onRemoveMessageClick');
                    },
                    avatar: `data:image/png;base64,${this.photo()}`,
            };

    }

    addMessage() {
        var list = this.state.messageList;
        list.push(this.random());
        this.setState({
            messageList: list,
        });
    }

    render() {
        var arr = [];
        for (var i = 0; i < 5; i++)
            arr.push(i);

        var chatSource = arr.map(x => this.random('chat'));

        return (
            <div className='chat-container'>
                <div
                    className='chat-list'>
                    <SideBar
                        top={
                            <div>
                                <Button
                                    type='transparent'
                                    color='black'
                                    text={'Active Users'}
                                />
                            </div>
                        }
                        center={<ChatList dataSource={chatSource} />}
                        />
                </div>
                <div
                    className='right-panel'>
                    <MessageList
                        className='message-list'
                        lockable={true}
                        downButtonBadge={10}
                        dataSource={this.state.messageList} 
                    />

                    <Input
                        placeholder="Write Clear Text Message"
                        defaultValue=""
                        ref='input'
                        multiline={true}
                        onKeyPress={(e) => {
                            if (e.shiftKey && e.charCode === 13) {
                                return true;
                            }
                            if (e.charCode === 13) {
                                e.preventDefault();
                                this.addMessage();
                                return false;
                            }
                        }}
                        rightButtons={
                            <Button
                                text='Send'
                                onClick={() => this.addMessage()} />
                        }   />
                </div>
            </div>
        );
    }
}

export default ChatApp;