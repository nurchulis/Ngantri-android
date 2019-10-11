/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import firebase from 'react-native-firebase'

import api from '../../../api'
import Data from '../../../module/data'
import fb from '../../../fb'

//import custom components
import Button from '../../uicomponents/Button'

export default class Notification extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data:[],
      isLoading: false,
    }
  }

  _keyExtractor = (item, index) => item.id

  _renderItem = ({item}) => {
    return (
      <View style={{borderBottomWidth:0.5, borderColor:'#afafaf', marginBottom:0.5}}>
        <TouchableOpacity style={{height:48, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} onPress={ () => this._updateService(item) }>
          <Text>{item.name}</Text>
          <Icon name="keyboard-arrow-right" size={20}/>
        </TouchableOpacity>
      </View>
    )
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    alert(body)
  }

  async componentDidMount () {
    if(!(await fb.checkPermission())){
      fb.requestPermission()
    }
    this.createNotificationListeners()
  }

  componentWillUnmount() {
    this.notificationListener()
    this.notificationOpenedListener()
  }

	render () {
    if(this.state.isLoading){
      return (
        <View style={{ ...styles.container,justifyContent:'center' }}>
          <ActivityIndicator size="large" color="#4ae0b5"/>
        </View>
      )
    } else {
  		return (
  			<View style={styles.container}>
          <FlatList
              extraData={this.state}
              data={this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
        </View> 
  		)
    }
	}
}

const styles = StyleSheet.create(
	{
		container: {
			paddingHorizontal:16,
			flex: 1,
			backgroundColor: 'white'
		}
	}
)