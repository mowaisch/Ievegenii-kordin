import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, ImageBackground, StatusBar, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../firebaseConfig/config';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [signInLoading, setSignInLoading] = useState(false);

    signin = (email, password) => {
        setSignInLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                setSignInLoading(false);
            })
            .catch(error => {
                alert(error);
                setSignInLoading(false);
            });
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
                <Button style={styles.buttonStyle} mode='contained'
                    // loading={state.signInLoading}
                    onPress={() => signin(email, password)}
                >
                    LOG IN
                </Button>
                <Text style={{ color: '#007EAD', marginTop: 10, alignSelf: 'center' }}>Don't have account! <Text onPress={() => navigation.navigate('Signup')} style={{ color: '#C30332' }}>Signup</Text></Text>
            </View>
        </View>
    );
}

export default LoginScreen;

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