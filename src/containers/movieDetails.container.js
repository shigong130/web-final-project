import React from 'react';
import {Redirect} from "react-router";
import {deleteMovie, fetchMovie} from "../actions/movie.action";
import {connect} from "react-redux";
import {fetchProfile, updateFav} from "../actions/user.action";
import Review from './review.container'
import {addNewReview, deleteReviewByMovie} from "../actions/review.action";

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', isAdministrator: '', movieDetails: {}, deleteRedirect: false, comments:''};
        this.checkAddFavEligibility = this.checkAddFavEligibility.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    componentDidMount() {
        this.props.onMount()
            .then(response => {
                if(response.status === 200) {
                    this.setState({
                        email: response.data.email,
                        isAdministrator: response.data.isAdministrator
                    })
                }
            });


        this.props.searchMovie(this.props.movieId).
        then(response => {
            if(response.status === 200){
                this.setState({
                    movieDetails: response.data});
            }
        });
    }

    async checkAddFavEligibility(){
        if(this.state.email === ''){
            window.alert('Please login first');
            return false;

        }

        return true;
    }

    handleCommentChange(event){
        console.log('input: ' + event.target.value);
        this.setState({comments: event.target.value})
    }

    generateButtonBasedOnUserType(data, review){
        if(this.state.isAdministrator){
            return(
                <div className="ui segment">
                    <div className="ui form">
                        <div className="field">
                            <label>
                                <div className="ui center aligned container">
                                    <button className="ui toggle button active" disabled={this.props.inFlight}  onClick={
                                        () => {
                                            this.props.deleteMovie(this.state.movieDetails.movieId),
                                                this.props.deleteReviews(this.state.movieDetails.movieId),
                                                window.alert('Delete Successful!'),
                                                this.setState({deleteRedirect : true})}}> Delete movie entry from local database </button>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>);
        }else{

            return(
                <div className="ui segment">
                    <div className="ui form">
                        <div className="field">
                            <div className="ui center aligned container">
                                <label>
                                    <h5 className="ui center aligned container"> Post a new movie review? </h5>
                                </label>
                                <label>
                                    <form>
                                        <div className="ui center aligned container">
                                        <textarea className="ui center aligned container" value={this.state.comments} rows="4" cols="50"
                                                  onChange={this.handleCommentChange} />
                                            <input className="ui toggle button active" type="button" value="Submit Review" onClick={() => {
                                                this.checkAddFavEligibility().then(r => {if(!r) return null;
                                                    this.props.postReview(review),  window.alert('Review Post Successful!'),  location.reload();});}
                                            } />
                                        </div>
                                    </form>
                                </label>
                                <label>
                                    <div className="ui center aligned container">
                                        <button className="ui toggle button active" disabled={this.props.inFlight}
                                                onClick={() => {this.checkAddFavEligibility()
                                                    .then(r => {if(!r) return null;
                                                        this.props.updateFav({favouriteMovies: data}), window.alert('Added to your personal favourite list!')});}
                                                }> Add to favourite </button>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>);
        }
    }

    render(){
        if(this.state.deleteRedirect){
            return <Redirect to='/movie-search/' />
        }
        console.log("movie id: " + this.state.movieDetails.movieId)
        if(this.state.movieDetails.movieId === undefined){
            return (<h5 className="ui center aligned container">Loading...</h5>);
        }

        const data = {title :this.state.movieDetails.title, movieId : this.state.movieDetails.movieId}
        const newReview = {movieId: this.state.movieDetails.movieId, user: this.state.email, review: this.state.comments}

        return(
            <div className="ui segment">
                <div className="ui form">
                    <div className="field">
                        <div className="ui center aligned container">
                            <picture>
                                <img src={this.state.movieDetails.posterPath}  height="400" width="300"/>
                            </picture>
                            <label>
                                <br />
                                <h3 className="ui center aligned container"> <b> Movie Details </b> </h3>
                            </label>
                            <label> <h5 className="ui center aligned container"> <b>Release Date:</b> {this.state.movieDetails.releaseDate} </h5> </label>
                            <label> <h5 className="ui center aligned container"> <b>Title:</b> {this.state.movieDetails.title} </h5> </label>
                            <label> <h5 className="ui center aligned container"> <b>Overview:</b> {this.state.movieDetails.overview} </h5> </label>
                            <label> <h5 className="ui center aligned container"> <b>Vote Average:</b> {this.state.movieDetails.voteAverage} </h5> </label>

                            <label>
                                <br />
                                <h3 className="ui center aligned container"> <b> Reviews </b> </h3>
                            </label>
                            <Review movieId={this.state.movieDetails.movieId}/>
                            {this.generateButtonBasedOnUserType(data, newReview)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        searchMovie: (id) => dispatch(fetchMovie(id)),
        onMount: () => dispatch(fetchProfile()),
        updateFav: (data) => dispatch(updateFav(data)),
        deleteMovie: (id) => dispatch(deleteMovie(id)),
        postReview: (review) => dispatch(addNewReview(review)),
        deleteReviews: (id) => dispatch(deleteReviewByMovie(id))
    }
};
function mapStateToProps(state, props) {
    console.log(state);
    return {
        movieId: props.match.params.path,
        state : state
    }
};

export default MovieDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails);