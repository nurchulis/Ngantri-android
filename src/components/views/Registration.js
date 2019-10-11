/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image, Keyboard, AsyncStorage, ScrollView, PixelRatio, Dimensions, StyleSheet, StatusBar} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box'
import jwtDecode from 'jwt-decode'

//import custom components
import Input from '../uicomponents/Input'
import Button from '../uicomponents/Button'

import api from '../../api'
import validation from '../../validation'
import service from '../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window');

export default class Registration extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Daftar",
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
	    this.email = React.createRef()
	    this.name = React.createRef()
    	this.phone = React.createRef()
    	this.password = React.createRef()
    	this.repassword = React.createRef()

    	this.state = { 
    		name: '',
    		email: '',
    		phone: '',
    		password: '',
    		password_repeat: '',
    		isLoading: false,
    		term: false,
    		error: true,
    		remember:true
    	}
	}

	//fungsi pindah ke halaman login
	_login = () => {
		this.props.navigation.navigate('Login')
	}


	_activation = () => {
		this.props.navigation.navigate('Activation', {email:this.state.email})	
	}

	//fungsi register
	async _register () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		Keyboard.dismiss()
		if (await service.auth.register(this.state)) {
			this._activation()
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		} else {
			alert('gagal membuat akun!')
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		}
	}

	//fungsi cek error form
	_isError () {
		// console.log('nama :'+(this.state.errorName != '')+' email :'+(this.state.errorEmail != '')+' phone :'+(this.state.errorPhone != '')+' password :'+(this.state.errorPassword != '')+' repet :'+(this.state.errorRepeatPassword != ''))
		if ( (this.state.errorName != '') || (this.state.errorEmail != '') || (this.state.errorPassword != '') || (this.state.errorPhone != '') || (this.state.errorRepeatPassword != '') || !this.state.term ){
			// console.log('true')
			return true
		} else {
			// console.log('false')
			return false
		}
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<View style={styles.container}>
					<Input 
						onChangeText={(text) => this.setState({ 
													name: text, 
													errorName: validation.validate('name', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorName }
						returnKeyType="next" 
						onRef={this.name}
						onSubmitEditing={() => this.email.current.focus() }
						label="Nama lengkap"/>

					<Input
						onChangeText={(text) => this.setState({ 
													email: text, 
													errorEmail: validation.validate('email', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorEmail }
						onRef={this.email}
						returnKeyType="next" 
						onSubmitEditing={() => this.phone.current.focus() } 
						label="Alamat email"/>

					<Input 
						onChangeText={(text) => this.setState({ 
													phone: text, 
													errorPhone: validation.validate('phone', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorPhone }
						onRef={this.phone}
						returnKeyType="next" 
						onSubmitEditing={() => this.password.current.focus() } 
						label="Nomor telepon"/>

					<Input
						onChangeText={(text) => this.setState({ 
													password: text, 
													errorPassword: validation.validate('password', text)
												}, () => { 
													this.setState({ 
														error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorPassword }
						onRef={this.password}
						returnKeyType="next" 
						onSubmitEditing={() => this.repassword.current.focus() } 
						password={ true }  
						label="Kata sandi"/>

					<Input
						onChangeText={(text) => this.setState({ 
													password_repeat: text, 
													errorRepeatPassword: validation.validate('password_repeat', text+':::::::'+this.state.password)
												}, () => { 
													this.setState({ error: this._isError() 
													}) 
												})} 
						errorMessage={ this.state.errorRepeatPassword }
						onRef={this.repassword}
						returnKeyType="done" 
						password={ true }  
						label="Ulangi kata sandi"/>

					<View style={ styles.checkbox }>
						<CheckBox
						    style={{flex: 1, paddingVertical: 8}}
						    onClick={()=>{
						      	this.setState({
						          	term:!this.state.term
						      	}, () => {
						      		this.setState({ error: this._isError() })
						      	})
						    }}
						    isChecked={this.state.term}
						    rightText={"Saya setuju dengan peraturan dan kebijakan ngantri."}/>
					</View>

					<Button 
						title="Daftar" 
						style={{backgroundColor:'#04a3e7', marginTop:16}} 
						loading={this.state.isLoading} 
						textStyle={{color:'white'}}
						disabled={this.state.error}
						onPress={this._register.bind(this)}/>

					<View style={ styles.footer }>
						<Text style={ styles.text }>Sudah punya akun?<Text onPress={ this._login } style={{ color: '#04a3e7' }}> Masuk</Text></Text>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			marginVertical: 40,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white'
		},
		footer: {
			marginTop: 20,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#FFFFFF'
		},
		text: {
			color: '#070707'
		},
		checkbox: {
			width: (PixelRatio.get() < 1.5) ? width-64 : ( PixelRatio.get() < 2 ) ? width-64 : ( PixelRatio.get() < 3 ) ? width-64 : ( PixelRatio.get() < 3 ) ? width-64 : width-64,
			flexDirection: 'row',  
			alignContent: 'flex-start'
		}
	}
)