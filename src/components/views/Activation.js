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

import Button from '../uicomponents/Button'

import logoAktivation from '../../static/assets/aktivasi/aktivasi.png'

var {height, width} = Dimensions.get('window')

export default class Activation extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Aktivasi",
    	headerTintColor: 'white',
    	headerTitleStyle: {
        	fontWeight: 'bold',
        	color: 'white',
        	fontSize:16
      	},
      	headerStyle: {
	        elevation: 1,
	        backgroundColor: '#04a3e7',
	        height: 50
	    },
  	}

	constructor(props) {
	    super(props)
	}

	render () {
		let email = this.props.navigation.getParam('email')
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<Image
				   style={{marginTop:80, marginBottom:20}}
			       width={width-100} // height will be calculated automatically
			       source={logoAktivation}
			    />
				<Text style={{fontSize:20,fontWeight:'bold', marginVertical:16}}>Selangkah lagi!</Text>
				<Text>Sebuah email aktivasi telah dikirim ke</Text>
				<Text style={{fontWeight:'bold'}}>{email}</Text>
				<View style={{potition:'absolute', top:'6%', alignItems: 'center'}}>
					<Button title="Buka email sekarang" textStyle={{color:'white'}} style={{backgroundColor:'#04a3e7'}} onPress={ this._login }/>
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
