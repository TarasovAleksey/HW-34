import React, { Component } from 'react';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            showPlanets: false,
            title: '',
            to: '',
            text: ''
        };
    }

    componentDidMount() {
        fetch("https://sw-info-api.herokuapp.com/v1/planets")
            .then(response => response.json())
            .then(data => {
                this.setState({ planets: data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', this.state);
        this.setState({ showPlanets: true });
    }

    render() {
        return (
            <div>
                <h1>Contacts</h1>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Title:</td>
                            <td><input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td>To:</td>
                            <td><input type="text" name="to" value={this.state.to} onChange={this.handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td>Text:</td>
                            <td><textarea name="text" value={this.state.text} onChange={this.handleInputChange}></textarea></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit">Send</button></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                {this.state.showPlanets && (
                    <div>

                        {this.state.planets.map(planet => (
                            <div key={planet.id}>
                                <h2>{planet.name}</h2>
                                <p>{planet.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Contacts;