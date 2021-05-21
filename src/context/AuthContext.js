import { CHANGE_ROUTE, SIGN_IN_LOADING, SIGN_UP_LOADING, SET_USER_ID, USER_DATA, SET_UPLOADING_PROGRESS, IS_UPLOADING_FILE } from '../strings';
import createDataContext from './createDataContext';
import { firebase, storageRef } from '../firebaseConfig/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            return { ...state, routeFlow: action.payload }
        case SIGN_UP_LOADING:
            return { ...state, signUpLoading: action.payload }
        case SIGN_IN_LOADING:
            return { ...state, signInLoading: action.payload }
        case USER_DATA:
            return { ...state, user_data: action.payload }
        case SET_USER_ID:
            return { ...state, user_id: action.payload }
        case SET_UPLOADING_PROGRESS:
            return { ...state, uploadingProgress: action.payload }
        case IS_UPLOADING_FILE:
            return { ...state, isUploading: action.payload }
        default:
            return state;
    }
};

const signup = dispatch => (name, email, password) => {
    console.log(name);
    dispatch({ type: SIGN_UP_LOADING, payload: true });
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            console.log('registered')
            const uid = response.user.uid;
            const data = {
                name,
                email,
            };
            firebase.database().ref('Users/' + uid).set(
                data
            ).then((data) => {
                dispatch({ type: SIGN_UP_LOADING, payload: false });
            }).catch((error) => {
                dispatch({ type: SIGN_UP_LOADING, payload: false });
                console.log('error ', error)
            })
        })
        .catch((error) => {
            dispatch({ type: SIGN_UP_LOADING, payload: false });
            alert(error);
        });
};

const signin = dispatch => async (email, password, remember_me) => {

    dispatch({ type: SIGN_IN_LOADING, payload: true });

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid;
            dispatch({ type: SIGN_IN_LOADING, payload: false });
        })
        .catch(error => {
            dispatch({ type: SIGN_IN_LOADING, payload: false });
            alert(error);
        });
    // if (remember_me) {
    //     await AsyncStorage.setItem('email', email);
    //     await AsyncStorage.setItem('password', password);
    // }
};

const localSignUp = dispatch => () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            dispatch({ type: SET_USER_ID, payload: user.uid });
            dispatch({ type: CHANGE_ROUTE, payload: 'SignedIn' });
        } else {
            dispatch({ type: CHANGE_ROUTE, payload: 'auth' });
        }
    });
};

const logOut = dispatch => () => {
    firebase.auth()
        .signOut();
};

const getUserData = dispatch => () => {

    var user = firebase.auth().currentUser;

    firebase.database().ref('Users/' + user.uid).on('value', function (snapshot) {
        console.log(snapshot.val());
        dispatch({ type: USER_DATA, payload: snapshot.val() });
    });
};

const uploadFile = dispatch => async (file, uid) => {
    try {
        console.log(firebase.auth().currentUser.uid);
        dispatch({ type: IS_UPLOADING_FILE, payload: true });
        dispatch({ type: SET_UPLOADING_PROGRESS, payload: '' });
        const response = await fetch(file.uri)
        const blob = await response.blob();
        var uploadTask = storageRef.ref('files/' + `${new Date().getTime()}-${file.name}`).put(blob);

        // // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                dispatch({ type: SET_UPLOADING_PROGRESS, payload: progress.toFixed(2) });
            },
            (error) => {
                dispatch({ type: IS_UPLOADING_FILE, payload: false });
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const data = {
                        file: downloadURL
                    };
                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid).update(
                        data
                    ).then((data) => {
                        dispatch({ type: IS_UPLOADING_FILE, payload: false });
                        console.log('data ', data)
                    }).catch((error) => {
                        dispatch({ type: IS_UPLOADING_FILE, payload: false });
                        console.log('error ', error)
                    })
                });
            }
        );
    } catch (e) {
        console.log(e);
    }
};



const setRoute = dispatch => (route) => {
    console.log(route);
    dispatch({ type: CHANGE_ROUTE, payload: route });
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { setRoute, signup, signin, getUserData, uploadFile, localSignUp, logOut },
    { routeFlow: '', fistRouteFlow: 'notDone', signInLoading: false, signUpLoading: false, user_data: null, user_id: '', isUploading: false, uploadingProgress: null }
);