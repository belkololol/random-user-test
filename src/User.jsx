import React from "react";
import {connect} from "react-redux";
import {deleteUser, viewUserCard} from "./redux-store";

function User(props) {

    const {user, deleteUser, viewUserCard, userCard} = props;
    const isActiveUserCard = !!userCard;
    return (
        <tr onClick={() => viewUserCard(user)}>
            <td>{user.name}</td>
            <td>{user.gender}</td>
            <td>{user.email}</td>
            <td>
                <button className="delete" onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(user.id)
                }} disabled={isActiveUserCard}/>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({
    userCard: state.userCard
})

export default connect(mapStateToProps, {deleteUser, viewUserCard})(User);
