'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {majorVersions: []};
    }

    componentDidMount() {
        client({method: 'GET', path: 'http://localhost:8080/api/majorVersions'}).done(response => {
            this.setState({majorVersions: response.entity._embedded.majorVersions});
        });
    }

    render() {
        return (
            <MajorVersionList majorVersions={this.state.majorVersions}/>
        )
    }
}

class MajorVersionList extends React.Component {
    render() {
        var majorVersions = this.props.majorVersions.map(majorVersion =>
            <MajorVersion key={majorVersion._links.self.href} majorVersion={majorVersion}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Major Versions</th>
                </tr>
                {majorVersions}
                </tbody>
            </table>
        )
    }
}

class MajorVersion extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.majorVersion.majorVersion}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
