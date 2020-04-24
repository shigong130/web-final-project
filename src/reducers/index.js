import userReducer from "./user.reducer";
import movieReducer from './movie.reducer'
import reviewReducer from './review.reducer'
import {combineReducers} from 'redux'


export default combineReducers({
    user: userReducer,
    movie: movieReducer,
    review: reviewReducer
})