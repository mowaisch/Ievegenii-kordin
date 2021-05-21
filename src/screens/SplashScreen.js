import React, { useEffect, useContext } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
const SplashScreen = ({ navigation }) => {

    const { state, setRoute, localSignUp } = useContext(AuthContext);
    useEffect(() => {
        let timer = setInterval(() => {
            localSignUp();
            clearInterval(timer)
        }, 5000);
    }, []);
    console.log(state.routeFlow);
    return (
        <View style={styles.topContainerStyles}>
            <StatusBar
                backgroundColor="#fff" />
            <View style={styles.innerContainerStyles}>
                <Image source={require('../assets/logo1.png')} resizeMode='contain' style={styles.logoStyles} />
            </View>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    topContainerStyles: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainerStyles: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoStyles: {
        height: 220,
        width: 220
    }
});