import React from "react";
import {connect} from 'react-redux';
import {clear, login, selectUser} from '../actions/user.action'
import {Redirect} from "react-router";
import Axios from "axios";

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', loggedIn: false};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.login(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({email: '', password: ''});

        Axios.get('/api/user/loggedIn')
            .then(res => {
                if (res.status === 200) {
                    this.setState({loggedIn: true});
                } else {
                    throw new Error(res.error);
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        if (this.state.loggedIn) {
            return (<Redirect to='/profile/' />)
        }

        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error}</h3>)
        }

        return (
            <div className="ui segment">
                <div className="ui form">
                    <div className="field">
                        <div className="ui center aligned container">
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                {error}
                                <label>
                                    <h5 className="ui center aligned container">Username/Email:</h5>
                                    <input type="text"
                                           disabled={this.props.inFlight}
                                           value={this.state.email}
                                           onChange={(e) => this.handleChange(e, 'email')}/> </label>
                                <label>
                                    <h5 className="ui center aligned container">Password:</h5>
                                    <input type="password"
                                           disabled={this.props.inFlight}
                                           value={this.state.password}
                                           onChange={(e) => this.handleChange(e, 'password')}/> </label>
                                <label>
                                    <div className="ui center aligned container">
                                        <input className="ui toggle button active" type="submit" value="Submit" disabled={this.props.inFlight}/>
                                    </div>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        login: (user) => dispatch(login(user)),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {

    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin)