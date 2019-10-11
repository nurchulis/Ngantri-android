/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import { StackActions, NavigationActions, withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

//import custom components
import Button from '../../uicomponents/Button'
import CardMenu from '../../uicomponents/CardMenu'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class Settings extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	profile:{},
	    	avatar:null,
	    	isLoading:false,
	    	error:false
	    }
	}

	_navAuth = async () => {
		this.props.navigation.navigate('NavAuth')
	}

	_updateProfileOperator = () => {
		this.props.navigation.navigate('UpdateProfileOperator',{onUpdateProfile: this._onUpdateProfile.bind(this), onUpdateAvatar: this._onUpdateAvatar.bind(this)})
	}	

	_changePassword = () => {
		this.props.navigation.navigate('ChangePasswordStaff')
	}	

	_onUpdateProfile (data) {
		this.setState({profile:data})
	}

	_onUpdateAvatar (avatar) {
		this.setState({avatar:avatar})
	}

	//pindah ke halaman login
	async _logout () {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		if (await service.auth.logout(global.config)) {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			if((await Data.removeData('user')) && (await Data.removeData('tenant'))){
				this._navAuth()
			}
		} else {
			this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			alert('gagal logout')
		}
	}


	async componentDidMount () {
		let profile =  await Data.getProfile()
		this.setState({profile: profile, avatar: profile.avatar})
	}

	render () {
		return (
			<View style={ styles.container }>
				<View style={{flexDirection:'row', alignItems:'center', width:width, padding:16, borderBottomWidth:1, borderColor:'#cfcfcf'}}>
					<Image 
						source={ this.state.avatar == null ? require('../../../static/blank-profile.png') : {uri: this.state.avatar}}
						resizeMode='cover'
          				style={{height:50,width:50, borderRadius:30, marginRight:16}}  />
          			<View>
          				<Text style={{fontSize:16, fontWeight:'bold'}}>{this.state.profile.name}</Text>
          				<Text style={{fontSize:12,marginTop:4}}>Operator</Text>
          			</View>
				</View>
				<CardMenu iconName="person" title="Profil Saya" onPress={this._updateProfileOperator}/>
				<CardMenu iconName="lock" title="Ganti kata sandi" onPress={this._changePassword}/>
				<CardMenu iconName="pan-tool" title="Kebijakan privasi"/>
				<CardMenu iconName="help-outline" title="Bantuan"/>
				<CardMenu iconName="info-outline" title="Tentang aplikasi"/>
				<Button 
				style={{backgroundColor:'white',borderWidth:0.5, borderColor:'red', marginTop:24}} 
	            textStyle={{color:'red'}}
	            disabled={this.state.error}
	            loading={this.state.isLoading}
	            onPress={this._logout.bind(this)}
	            title="Keluar" />
			</View>
		)
		
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: 'white'
		},
	}
)