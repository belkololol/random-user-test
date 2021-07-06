import React from "react";
import {connect} from "react-redux";
import {hideUserCard} from "./redux-store";

function UserCard(props) {
    const {userCard, hideUserCard} = props;
    return (
        <div className="user-card-wrapper">
            <div className="user-card">
                <div className="user-card-container">
                    <div className="user-avatar">
                        <img src={`${userCard.avatar}`} alt="avatar"/>
                    </div>
                    <div className="user-info">
                        <ul>
                            <li className="user-name">{userCard.name} </li>
                            <li><b>Gender:</b> {userCard.gender} </li>
                            <li><b>Email:</b> {userCard.email} </li>
                            <li><b>Cell:</b> {userCard.cell} </li>
                            <li><b>City:</b> {userCard.city} </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button className="close" onClick={hideUserCard}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userCard: state.userCard
})

export default connect(mapStateToProps, {hideUserCard})(UserCard);
