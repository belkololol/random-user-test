import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

export const SET_USERS = 'SET_USERS';
export const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';
export const TOGGLE_SORT = 'TOGGLE_SORT';
export const CHANGE_COUNT_USERS = 'CHANGE_COUNT_USERS';
export const DELETE_USER = 'DELETE_USER';
export const SET_INITIAL_USERS = 'SET_INITIAL_USERS';
export const FILTER_USER = 'FILTER_USER';
export const VIEW_USER_CARD = 'VIEW_USER_CARD';
export const HIDE_USER_CARD = 'HIDE_USER_CARD';

let initialState = {
    users: [],
    initialUsers: [],
    isLoading: false,
    countUsers: localStorage.getItem('countUsers') || "",
    isSort: false,
    userCard: null,
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_INITIAL_USERS:
            return {
                ...state,
                initialUsers: action.users,
            }
        case TOGGLE_PRELOADER:
            return {
                ...state,
                isLoading: !state.isLoading
            }
        case CHANGE_COUNT_USERS:
            return {
                ...state,
                countUsers: action.count
            }
        case TOGGLE_SORT:
            return {
                ...state,
                isSort: action.boolean
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        case FILTER_USER:
            return {
                ...state,
                users: state.initialUsers.filter(user => (user[action.obj.column]).toLowerCase().includes(action.obj.value.toLowerCase()))
            }
        case VIEW_USER_CARD:
            return {
                ...state,
                userCard: action.userCard
            }
        case HIDE_USER_CARD:
            return {
                ...state,
                userCard: null
            }
        default:
            return state;
    }
}

export const store = createStore(usersReducer, applyMiddleware(thunk));

export function setUsers(users) {
    return {type: SET_USERS, users};
}

export function setInitialUsers(users) {
    return {type: SET_INITIAL_USERS, users};
}

export function togglePreloader(action) {
    return {type: TOGGLE_PRELOADER, action};
}

export function changeCountUsers(count) {
    return {type: CHANGE_COUNT_USERS, count};
}

export function toggleSort(boolean) {
    return {type: TOGGLE_SORT, boolean}
}

export function deleteUser(id) {
    return {type: DELETE_USER, id}
}

export function filterUser(obj) {
    return {
        type: FILTER_USER, obj
    }
}

export function viewUserCard (userCard) {
    return {
        type: VIEW_USER_CARD, userCard
    }
}

export function hideUserCard (action) {
    return {
        type: HIDE_USER_CARD, action
    }
}

export const getUsers = (count) => async (dispatch) => {
    dispatch(togglePreloader());
    let response = await fetch(`https://randomuser.me/api/?results=${count}`);
    let users = await response.json();
    let correctedUsers = users.results.map((user) => {
        return {
            id: user.login.uuid,
            name: `${user.name.title} ${user.name.first} ${user.name.last}`,
            gender: user.gender === "male" ? "мужской" : "женский",
            email: user.email,
            avatar: user.picture.large,
            cell: user.cell,
            city: user.location.city
        }
    })
    dispatch(setInitialUsers(correctedUsers));
    dispatch(setUsers(correctedUsers));
    dispatch(togglePreloader());
}

export default usersReducer;
