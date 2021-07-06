import './App.css';
import Table from "./Table";
import React from "react";
import {connect} from "react-redux";
import {getUsers, changeCountUsers,} from "./redux-store";
import Preloader from "./Preloader";
import UserCard from "./UserCard";

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.changeCountUsers = this.changeCountUsers.bind(this);
    }

    componentDidMount() {
        const {getUsers, countUsers} = this.props;
        getUsers(countUsers);
    }

    changeCountUsers(e) {
        const {getUsers, changeCountUsers} = this.props;
        changeCountUsers(e.target.value);
        getUsers(e.target.value);
        localStorage.setItem('countUsers', e.target.value);
    }

    render() {
        const {
            countUsers,
            isLoading,
            userCard,
        } = this.props;
        return (
            <div className="users-container">
                <input className="count-users" type="text" onChange={this.changeCountUsers}
                       value={countUsers} placeholder="Сколько пользователей показать?"/>
                {isLoading ? <Preloader/> : <Table/>}
                {userCard && <UserCard/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    countUsers: state.countUsers,
    userCard: state.userCard
});

export default connect(mapStateToProps, {getUsers, changeCountUsers})(Users);
