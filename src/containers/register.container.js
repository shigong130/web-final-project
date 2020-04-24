import React from "react";
import {connect} from 'react-redux';
import {clear, register, validate} from '../actions/user.action'
import {Redirect} from "react-router";
import Axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', validatePassword: '', loggedIn: false, isAdministrator: true};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.validate(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({
            email: '',
            password: '',
            validatePassword: '',
        })

        Axios.get('/api/user/loggedIn')
            .then(res => {
                if (res.status === 200) {
                    this.setState({loggedIn: true});
                } else {
                    console.log('info','loggedin error: ' + JSON.stringify(res.error));
                    console.log('logged in check: '+ JSON.stringify(res.error));
                    throw new Error(res.error);
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {

            this.props.register(this.state.email, this.state.password, this.isAdministrator).then(response => {
                if(response.data){
                    window.alert('Great! ' + response.data.email + ' is registered successful!')
                }else{
                    window.alert(JSON.stringify(response));
                }})
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (<Redirect to='/profile/' />)
        }

        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error || this.props.valid.message) {
            error = (<h3>{this.props.error || this.props.valid.message}</h3>)
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
                                    <h5 className="ui center aligned container">Validate Password:</h5>
                                    <input type="password"
                                           disabled={this.props.inFlight}
                                           value={this.state.validatePassword}
                                           onChange={(e) => this.handleChange(e, 'validatePassword')}/> </label>
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
        register: (email, password) => dispatch(register(email, password)),
        clear: () => dispatch(clear()),
        validate: (user) => dispatch(validate(user)),
    }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)