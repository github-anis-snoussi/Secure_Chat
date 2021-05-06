import React, { Component } from 'react'
import packageJson from '../package.json';

export class About extends Component {

    render() {
        return (
            <div>
                <h2>About</h2>
                <p>The description for this app can be found <a target="_blank" rel="noopener noreferrer" href="https://github.com/ansnoussi/Secure_Chat/blob/main/projet_Chat.pdf">here</a> .</p>
                <hr />
                <p>Version <b>{packageJson["version"]}</b></p>
            </div>
        )
    }

    componentDidMount() {
        document.title = "About - My Project";
    }

}
