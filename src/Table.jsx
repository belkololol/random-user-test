import React from "react";
import './App.css';
import User from "./User";
import Autocomplete from "./Autocomplete";
import {deleteUser, filterUser, setUsers, toggleSort} from "./redux-store";
import {connect} from "react-redux";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.sortData = this.sortData.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        const {toggleSort} = this.props;
        toggleSort(false);
    }

    sortData() {
        const {toggleSort, setUsers, users} = this.props;
        const sortedUsers = [...users].sort(function (a, b) {
            const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        setUsers(sortedUsers);
        toggleSort(true);
    }

    deleteUser(id) {
        this.props.deleteUser(id);
    }

    render() {
        const {users, countUsers, isSort, initialUsers, filterUser} = this.props;
        if (!countUsers) return null;
        return (
            <div>
                <table className="table-users">
                    <tbody>
                    <tr>
                        <th>
                            <span>Имя</span>
                            <button className={`${isSort ? "active" : ''} sort`} onClick={this.sortData}/>
                        </th>
                        <th>Пол</th>
                        <th>Email</th>
                        <th/>
                    </tr>
                    <tr>
                        <td>
                            <Autocomplete options={initialUsers}
                                          getOptionLabel={user => user.name}
                                          onSelect={(value) => filterUser({value, column: "name"})}
                                          onChange={(value) => filterUser({value, column: "name"})}/>
                        </td>
                        <td>
                            <Autocomplete options={["женский", "мужской"]}
                                          getOptionLabel={user => user}
                                          onSelect={(value) => filterUser({value, column: "gender"})}
                                          onChange={(value) => filterUser({value, column: "gender"})}/>
                        </td>
                        <td>
                            <Autocomplete options={initialUsers}
                                          getOptionLabel={user => user.email}
                                          onSelect={(value) => filterUser({value, column: "email"})}
                                          onChange={(value) => filterUser({value, column: "email"})}/>
                        </td>
                        <td/>
                    </tr>
                    {users.map((user) => {
                        return <User user={user} key={user.id}/>;
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
    initialUsers: state.initialUsers,
    countUsers: state.countUsers,
    isSort: state.isSort
});

export default connect(mapStateToProps, {setUsers, toggleSort, deleteUser, filterUser})(Table);

