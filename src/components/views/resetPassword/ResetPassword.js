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
import jwtDecode from 'jwt-decode'

import Logo from '../../../static/ASSETS-REV/RESETPASSWORD/1.svg'

//import custom components
import Button from '../../uicomponents/Button'
import Input from '../../uicomponents/Input'

import api from '../../../api'
import data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

var {height, width} = Dimensions.get('window')

export default class ForgotPassword extends Component {

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

	    this._resetPassword.bind(this)

	    this.state = {
	    	new_password: '',
	    	re_password:'',
	    	isLoading: false,
	    	error:true
	    }
	}

	_savedPassword = () => {
		this.props.navigation.navigate('SavedPassword')
	}

	async _resetPassword () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		let data = this.props.navigation.getParam('data')
		console.log(data)
		let config = {
	    	headers: {
		    	'X-Access-Token': data.access_token
		    }	
	    }
		let reset = await service.auth.resetUserPassword(this.state, config)
		if (reset !== false) {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			this._savedPassword()
		} else {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			alert('maaf kata sandi baru gagal disimpan')
		}
	}

	//fungsi cek error form
	_isError () {
		if ( (this.state.errorNew_password != '') || (this.state.errorRe_password != '') ){
			// console.log('true')
			return true
		} else {
			// console.log('false')
			return false
		}
	}

	render () {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<View style={ styles.container }>
					<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>

					<Logo height={200}/>

					<Text style={{fontSize:20}}>Setel kata sandi?</Text>

					<View style={{ width:width-32, padding:16, alignItems:'center', marginVertical:16}}>
						<Text style={{textAlign:'center'}}>Silahkan masukkan kata sandi yang baru</Text>
					</View>

					<Input 
						onChangeText={(text) => this.setState({ 
													new_password: text, 
													errorNew_password: validation.validate('password',text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})}
						label="Kata sandi baru"
						password={true}
						errorMessage={ this.state.errorNew_password }/>
					<Input 
						onChangeText={(text) => this.setState({ 
													re_password: text, 
													errorRe_password: validation.validate('password_repeat', text+':::::::'+this.state.new_password)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})}
						label="Ulangi kata sandi" 
						password={true}
						errorMessage={ this.state.errorRe_password }/>
					<Button 
						style={{backgroundColor:'#04a3e7'}} 
						loading={this.state.isLoading} 
						onPress={ () => this._resetPassword() }
						textStyle={{color:'white'}}  
						title="Simpan Kata sandi baru" 
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
