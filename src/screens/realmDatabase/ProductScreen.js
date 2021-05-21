import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { PRODUCT_SCHEMA, PRODUCT } from './EventSchema';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
const Realm = require('realm');

const ProductScreen = () => {

    const isFocused = useIsFocused();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productNameError, setProductNameError] = useState(false);
    const [productPriceError, setProductPriceError] = useState(false);
    const [productDescriptionError, setProductDescriptionError] = useState(false);
    const [events, setEvents] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [realm, setRealm] = useState(null);

    useEffect(() => {
        if (isFocused) {
            Realm.open({ schema: [PRODUCT_SCHEMA], schemaVersion: 1 })
                .then((res) => {
                    let a = [];
                    for (let events of res.objects(PRODUCT)) {
                        a.push(JSON.parse(JSON.stringify(events)));
                    }
                    setRealm(res);
                    setEvents(a);
                })
                .catch(() => { });
        } else {
            if (realm !== null && !realm.isClosed) {
                realm.close();
            }
        }
    }, [isSuccess, isFocused]);

    saveData = () => {
        realm.write(() => {
            realm.create(PRODUCT, {
                key: `${new Date().getTime()}`,
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                createdAt: new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
            });

        });
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setIsSuccess(!isSuccess);
    };

    onPressDelete = (id) => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey(PRODUCT, id));
            let a = [];
            for (let events of realm.objects(PRODUCT)) {
                a.push(JSON.parse(JSON.stringify(events)));
            }
            setEvents(a);
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, }}>
                <View style={{ marginHorizontal: 30 }}>
                    <View style={[styles.inputText, { borderColor: productNameError ? 'red' : 'black' }]}>
                        <TextInput
                            placeholder="Product Name"
                            value={productName}
                            color='#000'
                            placeholderTextColor='#757575'
                            style={{ fontSize: 15, padding: 0, }}
                            onChangeText={(text) => {
                                setProductName(text);
                                setProductNameError(false);
                            }}
                        />
                    </View>
                    <View style={[styles.inputText, { borderColor: productDescriptionError ? 'red' : 'black' }]}>
                        <TextInput
                            placeholder="Product Price"
                            value={productPrice}
                            color='#000'
                            keyboardType='numeric'
                            placeholderTextColor='#757575'
                            style={{ fontSize: 15, padding: 0, }}
                            onChangeText={(text) => {
                                setProductPrice(text);
                                setProductPriceError(false);
                            }}
                        />
                    </View>
                    <View style={[styles.inputText, { borderColor: productDescriptionError ? 'red' : 'black' }]}>
                        <TextInput
                            placeholder="Product Description"
                            value={productDescription}
                            color='#000'
                            placeholderTextColor='#757575'
                            style={{ fontSize: 15, padding: 0, }}
                            onChangeText={(text) => {
                                setProductDescription(text);
                                setProductDescriptionError(false);
                            }}
                        />
                    </View>

                    <Button
                        style={styles.buttonStyle}
                        mode={'contained'}
                        onPress={() => {
                            setProductNameError(!productName.length);
                            setProductDescriptionError(!productDescription.length);
                            setProductPriceError(!productPrice.length);
                            console.log(productNameError);
                            if (!productName.length || !productDescription.length || !productPrice.length) {
                                //show error or something // for now TextInput border color goes red.
                            } else {
                                saveData();
                            }
                        }
                        }>
                        Submit
            </Button>

                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <SwipeListView
                        data={events}
                        keyExtractor={item => item.key.toString()}
                        renderItem={(data, rowMap) => (
                            <View style={styles.listUpperViewStyle} key={`${data.item.key}`}>
                                <View style={{ flex: 1, margin: 10 }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{data.item.productName} <Text style={{ color: '#ff805d', fontWeight: '300' }}> ${data.item.productPrice}</Text></Text>
                                    <Text style={{ fontSize: 15, fontFamily: 'sans-serif' }}>{data.item.productDescription}</Text>
                                    <Text style={{ fontSize: 12, color: '#757575', fontStyle: 'italic' }}>{data.item.createdAt}</Text>
                                </View>
                            </View>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.listLowerViewStyle}>
                                <TouchableOpacity onPress={() => onPressDelete(data.item.key)}>
                                    <MaterialCommunityIcons style={{ color: '#ED1C24', justifyContent: 'center', }} size={35} name={'delete'} />
                                </TouchableOpacity>
                            </View>
                        )}
                        rightOpenValue={-65}
                    />
                </View>
            </View>
        </SafeAreaView>
    );

}

export default ProductScreen;

const styles = StyleSheet.create({
    inputText: {
        height: 46,
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 6,
        borderWidth: 0.5,
        marginTop: 20
    },
    buttonStyle: {
        marginHorizontal: 40,
        marginTop: 40,
        backgroundColor: '#ff805d'
    },
    listUpperViewStyle: {
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#fff',
        elevation: 5,
        marginVertical: 18,
        borderRadius: 10,
    },
    listLowerViewStyle: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 18,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 15,
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 10
    }
});