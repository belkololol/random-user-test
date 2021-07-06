import './App.css';
import React from "react";
import {connect} from "react-redux";
import {hideUserCard} from "./redux-store";
import UsersContainer from "./Users";

function App(props) {
    const {userCard, hideUserCard} = props;
    return (
        <div className="app-container">
            <h1 className="title">Список пользователей</h1>
            <UsersContainer/>
            {userCard && <div className="background-modal" onClick={hideUserCard}/>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    userCard: state.userCard
});

export default connect(mapStateToProps, {hideUserCard})(App);
