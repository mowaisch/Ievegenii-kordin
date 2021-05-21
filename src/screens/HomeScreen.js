import React, { useEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Linking } from 'react-native';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';

const HomeScreen = ({ navigation }) => {
    const { state, setRoute, getUserData, uploadFile, logOut } = useContext(AuthContext);
    const [seletedFile, setSelectedFile] = useState();

    const chooseFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedFile(res);
            uploadFile(res, state.user_id);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    useEffect(() => {
        getUserData(state.user_id);
    }, []);

    return (
        <View style={styles.containerStyle}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle={'dark-content'}
            />
            <Header title='Home' />
            <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => chooseFile()}>
                    <View style={styles.chooseFileContainerStyle}>
                        {seletedFile ? (<Text numberOfLines={1} style={{ flex: 1, paddingHorizontal: 5, color: '#757575' }} > {seletedFile.name} </Text>) :
                            (<Text style={{ flex: 1, paddingHorizontal: 5, color: '#757575' }} />)}
                        <View style={{ backgroundColor: '#C0CCDA' }}>
                            <Text style={{ padding: 4, color: '#757575' }}> Choose File *</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            {state.isUploading ? <Text style={styles.textStyle}>Uploading : {state.uploadingProgress} %</Text> : null}

            {state.user_data && state.user_data.file ?
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(state.user_data.file).catch(err => console.error('An error occured', err));
                    }}
                >
                    <Text style={styles.textStyle}>Show file from firebase</Text>
                </TouchableOpacity>
                :
                <Text style={styles.textStyle}>No file uploaded yet.</Text>
            }

            <Button
                style={styles.buttonStyle}
                mode={'contained'}
                onPress={() => navigation.navigate('CategoryScreen')}>
                Categories
            </Button><Button
                style={styles.buttonStyle}
                mode={'contained'}
                onPress={() => navigation.navigate('ProductScreen')}>
                Products
            </Button>
            <Button
                style={styles.buttonStyle}
                mode={'contained'}
                onPress={() => navigation.navigate('ScannerScreen')}>
                Scan Code
            </Button>
            <Button
                style={styles.button2Style}
                mode={'outlined'}
                color={'#ff805d'}
                onPress={() => logOut()}>
                Logout
            </Button>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonStyle: {
        marginHorizontal: 40,
        marginTop: 40,
        backgroundColor: '#ff805d'
    },
    button2Style: {
        marginHorizontal: 40,
        marginTop: 10,
        color: '#ff805d'
    },
    textStyle: {
        fontSize: 15,
        color: '#4F5CC8',
        marginLeft: 12
    },
    chooseFileContainerStyle: {
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 2,
        alignItems: 'center',
    }
});