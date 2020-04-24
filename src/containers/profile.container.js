import React from "react";
import {connect} from 'react-redux';
import {fetchProfile, logout, succeedLogIn} from '../actions/user.action'
import {Redirect} from "react-router";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {error: '', email:'', isAdministrator: false, favouriteMovies: []};
    }

    componentDidMount() {
        this.props.onMount()
            .then(response => {
                if(response.status === 200){
                    this.setState({email: response.data.email,
                        isAdministrator: response.data.isAdministrator,
                        favouriteMovies: response.data.favouriteMovies});
                    this.props.success(response.data);
                }else{
                    this.setState({error:response.message});}

            });
    }

    handleSubmit(event) {
        this.props.logout();
    }

    renderList = () => {

        return this.state.favouriteMovies.map((movie) => {
            let redirect = '/movie-details/' + movie.movieId;
            return(
                <div className='favlist_content' key={movie.id} >
                    <a href={redirect}> {movie.title}</a>
                </div>
            );
        });
    }

    renderFavMovie = () =>{
        if(!this.state.isAdministrator){
            return(
                <div> Favourite Movie: {this.renderList()}</div>
            );
        }
        return null;
    }

    render() {

        if (this.state.error) {
            return <Redirect to='/login/' />
        }

        let userType = 'Member';

        if(this.state.isAdministrator){
            userType = 'Administrator';
        }

        if(this.state.email){
            return(
                <div className="ui segment">
                    <div className="ui form">
                        <div className="field">
                            <div className="ui center aligned container">
                                <label> <h5 className="ui center aligned container"> Username/Email: {this.state.email} </h5> </label>
                                <label> <h5 className="ui center aligned container"> User Group: {userType} </h5> </label>
                                <label> <h5 className="ui center aligned container"> Favourite Movies: {this.renderList()} </h5> </label>
                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <label>
                                        <div className="ui center aligned container">
                                            <input className="ui toggle button active" type="submit" value="Logout" disabled={this.props.inFlight}/>
                                        </div>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );}

        // if(this.state.email){
        //     return(<div>
        //         <div> Email : {this.state.email}</div>
        //         <div> User Group: {userType} </div>
        //         {this.renderFavMovie()}
        //         <form onSubmit={(e) => this.handleSubmit(e)}>
        //             <input type="submit" value="Logout" disabled={this.props.inFlight}/>
        //         </form>
        //     </div>);}


        return null;
    }
}


function mapDispatchToProps(dispatch, props) {
    return ({
        logout: () => dispatch(logout()),
        success: (data) => dispatch(succeedLogIn(data)),
        onMount: () => dispatch(fetchProfile())
    })
};


function mapStateToProps(state, props) {
    return {state};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)