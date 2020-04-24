import React from 'react';
import SearchBar from '../components/searchBar.component'
import Axios from 'axios'
import {Redirect} from "react-router";
import {addNewMovieToDb} from "../actions/movie.action";
import {connect} from "react-redux";

class MovieSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state ={movies : [], nowShowingMovies: []}
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
    }

    componentDidMount() {
        return Axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=97955aee2e16b77841811d1c69f4daa3&language=en-US&page=1')
            .then(response => {
                    this.setState({nowShowingMovies: response.data.results})},
                error => {console.log(error)}
            );
    }

    onSearchSubmit = async (movieName) => {
        const response =
            await Axios.get(  'https://api.themoviedb.org/3/search/movie?api_key=97955aee2e16b77841811d1c69f4daa3&language=en-US&query=' + movieName + '&page=1&include_adult=false') // We used Axios last week!
        this.setState({movies: response.data.results});

    }

    renderList = (result) => {
        return result.map((movie) => {
            let posterUrl = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
            let redirect = '/movie-details/' + movie.id;
            if(!movie.poster_path){
                posterUrl = "/noPicture.png"
            }
            let request = {
                movieId: movie.id,
                title: movie.title,
                overview: movie.overview,
                voteAverage: movie.vote_average,
                releaseDate: movie.release_date,
                posterPath: posterUrl};

            return(
                <div className="ui segment">
                    <div className="ui form">
                        <div className="field">
                            <div className="ui center aligned container">
                                <div className='movielist_content' key={movie.id} >
                                    <picture>
                                        <img src={posterUrl}  height="400" width="300"/>
                                    </picture>
                                    <label>
                                        <h5 className="ui center aligned container"><b>Title</b>: {movie.title} </h5>
                                    </label>
                                    <label>
                                        <div className="ui center aligned container">
                                            <button className="ui toggle button active" disabled={this.props.inFlight}
                                                    onClick={() => {this.props.saveMovie(request)
                                                        .then(r=>{window.location.href= redirect;})}}> Show More Details </button>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }


    render(){



        if(Array.isArray(this.state.movies) && this.state.movies.length === 0){

            return(
                <div>
                    <SearchBar onSubmit={this.onSearchSubmit} />
                    {this.renderList(this.state.nowShowingMovies)}

                </div>
            );
        }

        return(
            <div>
                <SearchBar onSubmit={this.onSearchSubmit} />
                {this.renderList(this.state.movies)}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        saveMovie: (request) => dispatch(addNewMovieToDb(request))
    }
};

function mapStateToProps(state, props) {

    return state;
};

export default MovieSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieSearch);