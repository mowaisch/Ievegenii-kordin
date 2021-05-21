import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { CATEGORY_SCHEMA, CATEGORY } from './EventSchema';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
const Realm = require('realm');

const CategoryScreen = () => {

  const isFocused = useIsFocused();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [categoryDescriptionError, setCategoryDescriptionError] = useState(false);
  const [events, setEvents] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    if (isFocused) {
      Realm.open({ schema: [CATEGORY_SCHEMA], schemaVersion: 1 })
        .then((res) => {
          let a = [];
          for (let events of res.objects(CATEGORY)) {
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
      realm.create(CATEGORY, {
        key: `${new Date().getTime()}`,
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        createdAt: new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
      });
    });
    setCategoryName('');
    setCategoryDescription('');
    setIsSuccess(!isSuccess);

  };

  onPressDelete = (id) => {
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey(CATEGORY, id));
      let a = [];
      for (let events of realm.objects(CATEGORY)) {
        a.push(JSON.parse(JSON.stringify(events)));
      }
      setEvents(a);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, }}>
        <View style={{ marginHorizontal: 30 }}>
          <View style={[styles.inputText, { borderColor: categoryNameError ? 'red' : 'black' }]}>
            <TextInput
              placeholder="Category Name"
              value={categoryName}
              color='#000'
              placeholderTextColor='#757575'
              style={{ fontSize: 15, padding: 0, }}
              onChangeText={(text) => {
                setCategoryName(text);
                setCategoryNameError(false);
              }}
            />
          </View>
          <View style={[styles.inputText, { borderColor: categoryDescriptionError ? 'red' : 'black' }]}>
            <TextInput
              placeholder="Category Description"
              value={categoryDescription}
              color='#000'
              placeholderTextColor='#757575'
              style={{ fontSize: 15, padding: 0, }}
              onChangeText={(text) => {
                setCategoryDescription(text);
                setCategoryDescriptionError(false);
              }}
            />
          </View>

          <Button
            style={styles.buttonStyle}
            mode={'contained'}
            onPress={() => {
              setCategoryNameError(!categoryName.length);
              setCategoryDescriptionError(!categoryDescription.length);
              console.log(categoryNameError);
              if (!categoryName.length || !categoryDescription.length) {
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
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{data.item.categoryName}</Text>
                  <Text style={{ fontSize: 15 }}>{data.item.categoryDescription}</Text>
                  <Text style={{ fontSize: 12, color: '#757575' }}>{data.item.createdAt}</Text>
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

export default CategoryScreen;

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