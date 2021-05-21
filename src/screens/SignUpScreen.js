import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, StatusBar, Text, TextInput } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { Context as AuthContext } from '../context/AuthContext';
import { firebase } from '../firebaseConfig/config';
import { Button } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
    // const { state, setRoute, signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [errorEmpty, setErrorEmpty] = useState(false);
    const [samePassword, setSamePassword] = useState(true);


    onSignupPress = (name, email, password) => {
        if (name != '' && email != '' && password != '' && confirmPassword != '') {
            setErrorEmpty(false);
            if (samePassword) {
                setSignUpLoading(true);
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
                            setSignUpLoading(false);
                            // done firebase will change navigation route in AuthContext
                        }).catch((error) => {
                            console.log('error ', error)
                            setSignUpLoading(false);
                        })
                    })
                    .catch((error) => {
                        setSignUpLoading(false);
                        alert(error);
                    });
            }
        } else {
            setErrorEmpty(true)
        }
    }

    return (
        <View style={styles.topContainerStyle}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle={'dark-content'}
            />
            <View style={styles.contaianer1Style}>
                <Image
                    style={styles.logoStyle}
                    source={require('../assets/logo1.png')}
                />
                <View style={styles.inputContainerStyle}>
                    <MaterialIcons name="person" size={25} backgroundColor='#fff' color="#ff805d" />
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Name"
                        placeholderTextColor="#757575"
                        style={styles.textInputStyle}
                    />
                </View>
                <View style={styles.inputContainerStyle}>
                    <MaterialIcons name="email" size={25} backgroundColor='#fff' color="#ff805d" />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        placeholderTextColor="#757575"
                        style={styles.textInputStyle}
                    />
                </View>
                <View style={styles.inputContainerStyle}>
                    <MaterialIcons name="lock" size={25} backgroundColor='#fff' color="#ff805d" />
                    <TextInput
                        secureTextEntry={hidden}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor="#757575"
                        style={styles.textInputStyle}
                    />
                    <Octicons onPress={() => setHidden(!hidden)} name={hidden ? 'eye' : 'eye-closed'} size={18} backgroundColor='#fff' color="#757575" />
                </View>
                <View style={styles.inputContainerStyle}>
                    <MaterialIcons name="lock" size={25} backgroundColor='#fff' color="#ff805d" />
                    <TextInput
                        secureTextEntry={hidden}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor="#757575"
                        style={styles.textInputStyle}
                        onChangeText={text => {
                            setConfirmPassword(text);
                            if (password != text) {
                                setSamePassword(false);
                            } else {
                                setSamePassword(true);
                            }
                        }}
                    />
                    <Octicons onPress={() => setHidden(!hidden)} name={hidden ? 'eye' : 'eye-closed'} size={18} backgroundColor='#fff' color="#757575" />
                </View>

                {errorEmpty ? <Text style={styles.errorTextSyle}>Please fill all the value</Text> : null}
                {samePassword ? null : <Text style={styles.errorTextSyle}>Both Passwords are not same</Text>}
                <View style={styles.contaianer2Style}>
                    <Button style={styles.buttonStyle} mode='contained'
                        loading={signUpLoading}
                        onPress={() => onSignupPress(name, email.toLowerCase(), password)}
                    >
                        SIGN UP
                </Button>
                </View>
                <Text style={{ color: '#000', marginTop: 10, alignSelf: 'center' }}>Already user! <Text onPress={() => navigation.navigate('Login')} style={{ color: '#C30332' }}>Sign in</Text></Text>
            </View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    topContainerStyle: {
        flex: 1,
    },
    backgroundImgStyle: {
        height: '100%',
        width: '100%',
    },
    logoStyle: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginBottom: 100,
    },
    contaianer1Style: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    contaianer2Style: {
        marginHorizontal: 30
    },
    errorTextSyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    },
    inputContainerStyle: {
        height: 50,
        backgroundColor: '#fff',
        elevation: 3,
        marginHorizontal: 35,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 30
    },
    textInputStyle: {
        flex: 1,
        color: '#000'
    },
    buttonStyle: {
        marginHorizontal: 50,
        borderRadius: 30,
        backgroundColor: '#ff805d'
    }
});