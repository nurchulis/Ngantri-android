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
	KeyboardAvoidingView, 
	PixelRatio, 
	StyleSheet, 
	AsyncStorage,
	Keyboard,
	ScrollView
} from 'react-native'
import { withNavigation } from 'react-navigation'
import jwtDecode from 'jwt-decode'

//import custom components
import Button from '../uicomponents/Button'
import Input from '../uicomponents/Input'

import api from '../../api'
import data from '../../module/data'
import validation from '../../validation'
import service from '../../service'
// import fb from '../../fb'

export default class Login extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Masuk",
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

	    this.a = React.createRef()
	    this.b = React.createRef()

	    this.state = {
	    	email: '',
	    	password: '',
	    	remember:true,
	    	isLoading: false,
	    	error:true
	    }
	}
	
	//fungsi pindah ke halaman daftar
	_registration = () => {
		this.props.navigation.navigate('Registration')
	}

	_client = () => {
		this.props.navigation.navigate('Client')
	}

	_forgotPassword = () => {
		this.props.navigation.navigate('ForgotPassword')	
	}

	//fungsi autentikasi
	async _auth () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		Keyboard.dismiss()
		let user = await service.auth.login(this.state)
		if (user !== false) {
			let users = jwtDecode(user.access_token)
			users = {
				access_token: user.access_token,
				...users
			}
			global.config.headers['X-Access-Token'] = users.access_token
			// global.config.headers['X-FCM-Token'] = await fb.getToken()
			console.log(global.config)
			if (await data.storeData('user', users)) {
				let profile = await service.user.getUserById(users.id, global.config)
				if (profile !== false) {
					this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
					if (await data.storeData('profile',profile)) {
						this._client()
					}
				} else {
					this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
					alert('server error')
				}			}
		} else {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			alert('Email atau password salah !')
		}
	}

	//fungsi cek error form
	_isError () {
		if ( (this.state.errorEmail != '') || (this.state.errorPassword != '') ){
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
					<Input 
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email',text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						onRef={this.a}
						label="Email" 
						errorMessage={ this.state.errorEmail }
						returnKeyType="next" 
						onSubmitEditing={() => this.b.current.focus() }/>

					<Input
						onChangeText={(text) => this.setState({ 
													password: text, 
													errorPassword: validation.validate('password',text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						onRef={this.b} 
						password={ true }  
						errorMessage={ this.state.errorPassword }
						label="Password" />
					<Text onPress={ this._forgotPassword } style={{color: '#04a3e7', marginBottom:20}}>Lupa kata sandi?</Text>
					<Button 
						style={{backgroundColor:'#04a3e7'}} 
						loading={this.state.isLoading} 
						textStyle={{color:'white'}} 
						onPress={ this._auth.bind(this) } 
						title="Masuk" 
						disabled={ this.state.error }/>
					<Text style={ [styles.text,{marginTop:20}] }>Belum punya akun?<Text onPress={ this._registration } style={{color: '#04a3e7'}}> Daftar</Text></Text>
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
		},
		inputBox: {
			flexGrow:1, 
			justifyContent: 'center',
		},
		buttonBox: {
			flexGrow:1, 
			alignItems: 'center', 
		},
		footerBox: {
			justifyContent: 'center',
			alignItems: 'center',
			flexGrow:1,
		},
		text: {  
	        color:'#070707'
	    }
	}
)
