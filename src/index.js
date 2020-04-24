import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import Home from "./containers/home.container";
import UserLogin from "./containers/login.container";
import UserProfile from './containers/profile.container';
import LoggedInComponent from './components/loggedin.component'
import Register from "./containers/register.container";
import MovieSearch from './containers/searchMovie.container'
import MovieDetails from './containers/movieDetails.container'

// import Register from "./containers/register.container";
// import LoggedInComponent from './components/loggedin.component'

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));
const hostUrl = "https://shi-gong-web-final.herokuapp.com"
const loginUrl = hostUrl + "/login"
const registerUrl = hostUrl + "/register"
const profileUrl = hostUrl + "/profile"
const movieSearchUrl = hostUrl + "/movie-search"

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <a className="navbar-brand" href="home"><b>MovieReviews</b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href={loginUrl}>Login<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={registerUrl}>Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={profileUrl}>Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={movieSearchUrl}>Search</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/*
            <Link to={'/login'}> Login </Link>
            <Link to={'/register'}> Register </Link>
            <Link to={'/movie-search'}> Search Movie </Link>
// <<<<<<< HEAD
            */}
            <Switch>
                {/*<Route path="/welcome" component={Welcome}/>*/}
                <Route path="/home" component={Home}/>
{/*=======*/}
{/*            <Link to={'/profile'}> Profile </Link>*/}
{/*            <Switch>*/}
{/*>>>>>>> 266989e3e86ecb302a550a35fbc44bcb2c97c8b1*/}
                <Route path="/login" component={UserLogin}/>
                <Route path="/profile" component={LoggedInComponent(UserProfile)} />
                <Route path="/register" component={Register}/>
                <Route path="/movie-search" component={MovieSearch}/>
                <Route path="/movie-details/:path/" component={MovieDetails}/>

{/*<<<<<<< HEAD*/}
                {/*<Route path="/pokemon" component={LoggedInComponent(Pokemons)}/>*/}
                <Redirect exact from="/" to="home"/>
{/*=======*/}
{/*                <Redirect exact from="/" to="movie-search"/>*/}
{/*>>>>>>> 266989e3e86ecb302a550a35fbc44bcb2c97c8b1*/}
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);