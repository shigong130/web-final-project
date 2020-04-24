import React from 'react';
import {Redirect} from "react-router";
import {deleteMovie, fetchMovie} from "../actions/movie.action";
import {connect} from "react-redux";
import {fetchProfile, updateFav} from "../actions/user.action";
import {fetchReviews} from "../actions/review.action";

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reviews: [], isAdministrator: '', movieDetails: {}, deleteRedirect: false};
        // this.checkAddFavEligibility = this.checkAddFavEligibility.bind(this);
    }

    componentDidMount() {
        console.log('search movie id ; ' + this.props.movieId);
        this.props.searchReview(this.props.movieId).
        then(response => {
            console.log('searched review' + JSON.stringify(response));
            if(response.status === 200){
                this.setState({
                    reviews: response.data});
            }
        });
    }

    renderList = () => {
        return this.state.reviews.map((review) => {

            return(
                <div className="ui segment">
                    <div className="ui form">
                        <div className="field">
                            <div className="ui center aligned container">
                                <div className='reviewlist_content' key={review._id} >
                                    <label> <h5 className="ui center aligned container"> <b>User:</b> {review.user} </h5> </label>
                                    <label> <h5 className="ui center aligned container"> <b>Comments:</b> {review.review} </h5> </label>
                                    <label> <h5 className="ui center aligned container"> <b>Date:</b> {review.date} </h5> </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        // if(this.state.deleteRedirect){
        //     return <Redirect to='/movie-search/' />
        // }

        console.log('review: ' + JSON.stringify(this.state.reviews));
        return(
            <div>
                {this.renderList()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        searchReview: (id) => dispatch(fetchReviews(id)),
        deleteReview: (id) => dispatch(deleteMovie(id))
    }
};
function mapStateToProps(state, props) {
    console.log(state);
    return {
        state : state
    }


};

export default Review = connect(
    mapStateToProps,
    mapDispatchToProps
)(Review);