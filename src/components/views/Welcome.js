/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation'
import Image from 'react-native-scalable-image'

import logoWelcome from '../../static/assets/welcome/logoWelcome.png'

import Button from '../uicomponents/Button'

var {height, width} = Dimensions.get('window')

export default class Welcome extends Component {
	constructor(props) {
	    super(props)
	}

	_registration = () => {
		this.props.navigation.navigate('Registration')
	}

	_login = () => {
		this.props.navigation.navigate('Login')
	}

	render () {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<Image
			       width={width} // height will be calculated automatically
			       source={logoWelcome}
			    />
				<Text style={{fontSize:20, fontWeight:'bold', marginTop:60}}>Selamat datang</Text>
				<Text style={{marginTop:6}}>Rasakan pengalaman ngantri tanpa ribet</Text>
				<View style={{potition:'absolute', top:'10%', alignItems: 'center'}}>
					<Button title="Masuk" textStyle={{color:'white'}} style={{backgroundColor:'#04a3e7'}} onPress={ this._login }/>
					<Text style={{marginTop: 20}}>Belum punya akun? <Text style={{color:'#04a3e7'}} onPress={this._registration}>Daftar</Text></Text>
				</View>
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