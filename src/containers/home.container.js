import React from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import Axios from "axios";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                <h3 class="text-center"><b>Welcome to Our Movie Review Website!</b></h3>
                <div class="text-center">
                    <img class="img-fluid" src="https://www.midlothianlibrary.org/sitemedia/images/BooksandMedia/moviereview.jpg"
                         alt="Responsive image" />
                </div>
                </div>

                <div className="ui raised very padded text container segment">
                    <div className="text-center">
                        <img className="img-fluid"
                             src="/source.gif"
                             alt="Responsive image" height="500" width="300" />
                    </div>
                </div>

            </div>

        );
    }
}

export default connect(
)(Home)