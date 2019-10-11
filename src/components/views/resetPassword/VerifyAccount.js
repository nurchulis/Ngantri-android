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
	Dimensions,
	TextInput
} from 'react-native'
import { withNavigation } from 'react-navigation'
import jwtDecode from 'jwt-decode'

import Logo from '../../../static/ASSETS-REV/RESETPASSWORD/2.svg'

//import custom components
import Button from '../../uicomponents/Button'
import Input from '../../uicomponents/Input'

import api from '../../../api'
import data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

var {height, width} = Dimensions.get('window')

export default class VerifyAccount extends Component {

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

	    this.a = React.createRef()
	    this.b = React.createRef()
	    this.c = React.createRef()
	    this.d = React.createRef()

	    this._verifyAccount.bind(this)

	    this.state = {
	    	i1:'',
	    	i2:'',
	    	i3:'',
	    	i4:'',
	    	pin:'',
	    	time: 1,
	    	second: 0,
	    	isLoading: false,
	    	error:true
	    }
	}

	_resetPassword = (data) => {
		this.props.navigation.navigate('ResetPassword', {data:data})
	}

	_setPin () {
		if (this.state.i1 != '' && this.state.i2 != '' && this.state.i3 != '' && this.state.i4 != '') {
			this.setState({pin:this.state.i1+this.state.i2+this.state.i3+this.state.i4,error:!this.state.error})
		} else {
			this.setState({error:true})
		}
	}

	_remainTime () {
		setInterval( () => {
			if(this.state.second === 0){
				if (this.state.second === 0 && this.state.time === 0) {
					this.setState({time: 0, second: 0})
				} else {
					this.setState({time:this.state.time - 1, second: 59})
				}
			} else {
				this.setState({second:this.state.second - 1})
			}
		}, 1000)
	}

	async _verifyAccount () {
		let data = this.props.navigation.getParam('data')
		let config = {
	    	headers: {
		    	'X-Reset-Token': data.reset_token
		    }	
	    }
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		let token = await service.auth.verifyAccount(this.state ,config)
		if (token !== false) {
			this._resetPassword(token)
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		} else {
			alert('pin salah silahkan cek kembali pin yang anda dapat')
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})			
		}

	}

	componentDidMount () {
		this._remainTime()
	}

	render () {
		let data = this.props.navigation.getParam('data')
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<View style={ styles.container }>
					<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>

					<Logo height={200}/>

					<Text style={{fontSize:20}}>Kode telah terkirim</Text>

					<View style={{width:width-32, padding:16, alignItems:'center', marginVertical:8}}>
						<Text style={{textAlign:'center'}}>Masukkan kode penyetelan kata sandi baru yang telah dikirim ke :</Text>
						<Text style={{textAlign:'center', fontWeight:'bold'}}>{data.email}</Text>
					</View>

					<View style={{flexDirection:'row', width:width-200, marginBottom:16}}>
						<TextInput
						onChangeText={(text) => {
							this.setState({i1:text},()=> this._setPin())
							if(text != ''){
								this.b.current.focus()
							}
						}}
						ref={this.a}
						maxLength={1}
						keyboardType='numeric'
						style={{flexGrow:1, fontSize:30, alignItems:'center', textAlign:'center', color:'#04a3e7'}}
						underlineColorAndroid={"#EFE8E8"}/>
						<TextInput
						onChangeText={(text) => {
							this.setState({i2:text},()=> this._setPin())
							if(text != ''){
								this.c.current.focus()
							} else {
								this.a.current.focus()
							}
						}}
						ref={this.b}
						maxLength={1}
						keyboardType='numeric'
						style={{flexGrow:1, fontSize:30, alignItems:'center', textAlign:'center', color:'#04a3e7'}}
						underlineColorAndroid={"#EFE8E8"}/>
						<TextInput
						onChangeText={(text) => {
							this.setState({i3:text},()=> this._setPin())
							if(text != ''){
								this.d.current.focus()
							} else {
								this.b.current.focus()
							}
						}}
						ref={this.c}
						maxLength={1}
						keyboardType='numeric'
						style={{flexGrow:1, fontSize:30, alignItems:'center', textAlign:'center', color:'#04a3e7'}}
						underlineColorAndroid={"#EFE8E8"}/>
						<TextInput
						onChangeText={(text) => {
							this.setState({i4:text},()=> this._setPin())
							if (text == '') {
								this.c.current.focus()
							}
						}}
						ref={this.d}
						maxLength={1}
						keyboardType='numeric'
						style={{flexGrow:1, fontSize:30, alignItems:'center', textAlign:'center', color:'#04a3e7'}}
						underlineColorAndroid={"#EFE8E8"}/>	
					</View>
					<Text style={{marginBottom:16, fontSize:14}}>Kirim ulang kode dalam {this.state.time} : {this.state.second}</Text>
					<Button 
						style={{backgroundColor:'#04a3e7'}} 
						loading={this.state.isLoading} 
						textStyle={{color:'white'}}  
						title="Setel kata sandi baru"
						onPress={()=> this._verifyAccount() } 
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
