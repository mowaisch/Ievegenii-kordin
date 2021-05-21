import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Header = ({ title }) => {
    return (
        <View style={styles.inLineStyle1}>
            <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 5 }}>
                <Image source={require("../assets/logo1.png")} style={{ height: 40, resizeMode: 'contain', width: 40, alignSelf: 'center' }} />
                <Text numberOfLines={1} style={styles.headingStyle}>{title}</Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    inLineStyle1: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        elevation: 3,
    },
    headingStyle: {
        marginLeft: 3,
        fontSize: 20,
        backgroundColor: '#fff'
    },
});