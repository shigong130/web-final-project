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
            <div className="ui segment">
                <h3 class="text-center"><b>Welcome to Our Movie Review Website!</b></h3>
                <div class="text-center">
                    <img class="img-fluid" src="https://www.midlothianlibrary.org/sitemedia/images/BooksandMedia/moviereview.jpg"
                         alt="Responsive image" />
                </div>
            </div>

        );
    }
}

export default connect(
)(Home)