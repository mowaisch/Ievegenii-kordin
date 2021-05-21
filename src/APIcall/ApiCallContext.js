import createDataContext from '../context/createDataContext';
import API from '../APIcall/API';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'YOUR_ACTION_TYPE':
            return;
        default:
            return state;
    }
};

const postCallToApi = dispatch => async (name, email, details) => {
    try {
        var request = new FormData();
        request.append("name", name);
        request.append("email", email);
        request.append("details", details);
        /*    .............NOTE.................
        if you want to push array in formData. 
         yourArray.forEach((item) => {
                request.append("myArray[]", item);
              });
        appending array directly like:
         request.append("myArray", yourArray); || request.append("myArray[]", yourArray);
         this is through 'Network Error
        */

        await API.post('END_POINT_HERE', request).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    } catch (err) {
        console.log(err);
    }
    /* .............NOTE.................
    this will dispatch values and actions to the reducer defined above that will handle the state change. You have to pass the type and payload.
    dispatch({ type: 'YOUR_ACTION_TYPE', payload: true });
    */
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { postCallToApi },
    {}
);