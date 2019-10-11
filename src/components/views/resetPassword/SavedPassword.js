/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { 
	Text, 
	View, 
	Image, 
	StatusBar,
	PixelRatio, 
	StyleSheet, 
	Keyboard,
	ScrollView,
	Dimensions
} from 'react-native'
import { withNavigation } from 'react-navigation'

import Logo from '../../../static/ASSETS-REV/RESETPASSWORD/1.svg'

//import custom components
import Button from '../../uicomponents/Button'
import Input from '../../uicomponents/Input'

import api from '../../../api'
import data from '../../../module/data'
import validation from '../../../validation'

var {height, width} = Dimensions.get('window')

export default class SavedPassword extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Lupa kata sandi",
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

	    this.state = {
	    	isLoading: false,
	    	error: false
	    }
	}

	_login = () => {
		this.props.navigation.navigate('Login')
	}

	render () {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<View style={ styles.container }>
					<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>

					<Logo height={200}/>

					<Text style={{fontSize:20}}>Kata sandi baru telah tersimpan</Text>

					<View style={{ width:width-32, padding:16, alignItems:'center', marginVertical:16}}>
						<Text style={{textAlign:'center'}}>Selamat kata sandi baru telah berhasil disimpan</Text>
					</View>
					<Button 
						style={{backgroundColor:'#04a3e7'}} 
						loading={this.state.isLoading} 
						onPress={this._login}
						textStyle={{color:'white'}}  
						title="Masuk" 
						disabled={ this.state.error }/>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flexGrow: 1,
			alignItems: 'center',
			backgroundColor: 'white',
			marginVertical: 20,
		}
	}
)
