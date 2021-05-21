import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Linking, Modal } from 'react-native';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ScannerScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [scanner, setScanner] = useState();
    const [results, setResults] = useState('');
    onSuccess = e => {
        setVisible(true);
        setResults(e.data);
    };
    return (
        <View style={styles.containerStyle}>
            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.modalView}>
                        <MaterialIcons name="qr-code-scanner" size={180} backgroundColor='#fff' color="#ff805d" />
                        <Text style={styles.successTextStyle}>SUCCESSFUL</Text>
                        <Text>--------- Result ---------</Text>
                        <Text>{results}</Text>
                        <View style={styles.inlineContainerStyle}>
                            <Button
                                style={styles.button2Style}
                                mode={'outlined'}
                                color={'#ff805d'}
                                onPress={() => {
                                    setVisible(false);
                                    navigation.goBack();
                                }}>
                                Cancle
                    </Button>
                            <Button
                                style={styles.buttonStyle}
                                mode={'contained'}
                                onPress={() => {
                                    setVisible(false);
                                    scanner.reactivate();
                                }}>
                                Rescan
                    </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <QRCodeScanner
                ref={(node) => { setScanner(node) }}
                showMarker={true}
                fadeIn={true}
                reactivateTimeout={30}
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
            />
        </View>
    );
}

export default ScannerScreen;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inlineContainerStyle: {
        flexDirection: 'row'
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonStyle: {
        marginHorizontal: 40,
        marginTop: 10,
        backgroundColor: '#ff805d'
    },
    button2Style: {
        marginHorizontal: 40,
        marginTop: 10,
        color: '#ff805d'
    },
    successTextStyle: {
        fontSize: 20,
        color: 'green'
    }
});