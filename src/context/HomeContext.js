import createDataContext from './createDataContext';
import { firebase, storageRef } from '../firebaseConfig/config';

const authReducer = (state, action) => {
    switch (action.type) {
        case 's':
            return;
        default:
            return state;
    }
};


const setRoute = dispatch => (route) => {
    console.log(route);
    // dispatch({ type: CHANGE_ROUTE, payload: route });
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { setRoute, },
    {}
);