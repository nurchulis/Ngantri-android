/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, AsyncStorage, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation'

import Button from '../uicomponents/Button'
import api from '../../api'
import Data from '../../module/data'
import service from '../../service'

var {height, width} = Dimensions.get('window');

export default class Splash extends Component {
	constructor(props) {
	    super(props)

	    global.config = {
	    	headers: {
		    	'X-Access-Token': ''
		    }	
	    }

	    this._bootstrapAsync()
	    // this.checkPermission()
	}

  	_bootstrapAsync = async () => {
  		let intro = await Data.getData('intro')
	    let user = await Data.getData('user')
	    // This will switch to the App screen or Auth screen and this loading
	    // screen will be unmounted and thrown away.
	    if(intro){
	    	if(user){
	    		global.config.headers['X-Access-Token'] = user.access_token
	    		let profile = await service.user.getUserById(user.id, global.config)
	    		if(profile !== false){
	    			if(await Data.storeData('profile', profile)){
	    				this.props.navigation.navigate('Home')
	    			} else {
	    				alert('gagal menyimpan pengguna !')	
	    			}
	    		} else {
	    			alert('pengguna tidak ditemukan !')
	    		}
	    	} else {
	    		this.props.navigation.navigate('Welcome')
	    	}
	    } else {
	    	this.props.navigation.navigate('Intro')
	    }
	}


	render () {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white'
	}
})
