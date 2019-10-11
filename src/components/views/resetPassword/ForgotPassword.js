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

	    this.state = {
	    	email: '',
	    	isLoading: false,
	    	error:true
	    }
	}

	_verifyAccount = (data) => {
		this.props.navigation.navigate('VerifyAccount',{data:data})
	}

	async _forgotPassword () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		Keyboard.dismiss()
		let reset = await service.auth.forgotPassword(this.state)
		if (reset !== false) {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			let user = jwtDecode(reset.reset_token)
			user = {
				email: this.state.email,
				reset_token: reset.reset_token,
				...user
			}
			this._verifyAccount(user)
		} else {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			alert('gagal meminta reset')
		}
	}

	//fungsi cek error form
	_isError () {
		if ( (this.state.errorEmail != '') ){
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

					<Text style={{fontSize:20}}>Lupa kata sandi?</Text>

					<View style={{backgroundColor: '#f3f3f3',borderRadius:8, width:width-32, padding:16, alignItems:'center', marginVertical:20}}>
						<Text style={{textAlign:'center'}}>Agar dapat menyetel ulang kata sandi, anda perlu memasukkan kode rahasia yang akan dikirim ke alamat email anda.</Text>
						<Text style={{textAlign:'center'}}>Jangan beritahukan kode rahasia tersebut kepada siapapun demi keamanan akun anda.</Text>
					</View>

					<Input 
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email',text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})}
						label="Alamat email" 
						errorMessage={ this.state.errorEmail }/>
					<Button 
						style={{backgroundColor:'#04a3e7'}} 
						loading={this.state.isLoading} 
						onPress={this._forgotPassword.bind(this)}
						textStyle={{color:'white'}}  
						title="Kirim kode sekarang" 
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
