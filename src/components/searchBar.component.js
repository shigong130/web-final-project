import React from 'react';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movieName: ''};

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.movieName);
    }


    render() {
        return (
            <div className="ui segment">
                <div className="ui form">
                    <div className="field">
                        <label>
                            <h5 className="ui center aligned container">Movie Title:</h5>
                            <input type="text"
                                   value={this.state.movieName}
                                   onChange={e => this.setState({movieName: e.target.value})}/>
                        </label>
                        <label>
                            <div className="ui center aligned container">
                                <input className="ui toggle button active" type="button" value="Submit"
                                       onClick={this.onFormSubmit}/>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}