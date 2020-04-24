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
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    FormControl,
    Form,
    Button, NavbarBrand
} from 'react-bootstrap';
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
            <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
                <Navbar.Brand style={{color:'black'}} href="home">MovieReviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link style={{color:'black'}} href={loginUrl}>Login</Nav.Link>
                        <Nav.Link style={{color:'black'}} href={registerUrl}>Register</Nav.Link>
                        <Nav.Link style={{color:'black'}} href={profileUrl}>Profile</Nav.Link>
                        <Nav.Link style={{color:'black'}} href={movieSearchUrl}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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