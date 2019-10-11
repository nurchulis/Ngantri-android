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

import Button from '../../uicomponents/Button'
import CardIcon from '../../uicomponents/CardIcon'

import logoAktivation from '../../../static/assets/aktivasi/aktivasi.png'

import api from '../../../api'
import Data from '../../../module/data'

var {height, width} = Dimensions.get('window')

export default class TenantFound extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Bergabung",
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

	    this._joinTenant.bind(this)

	    this.state = {
	    	isLoading:false,
	    	error:false
	    }
	}

	_waitForAcception = () => {
		this.props.navigation.navigate('WaitForAcception')
	}

	async _joinTenant (idTenant) {
		this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
		let config = {
	      headers: {
	        'X-Access-Token': await Data.getToken()
	      }
	    }
		api.post('tenants/'+idTenant+'/roles',{id:await Data.getUserId()},config)
			.then(response => {
				this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
				let responseData = response.data
				if (responseData.success === true){
					this._waitForAcception()
				}
			})
			.catch(e => {
				alert(JSON.stringify(e))
				this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
			})
	}

	render () {
		let tenant = this.props.navigation.getParam('tenant')
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<Text style={{fontSize:20, fontWeight:'bold',marginTop:80}}>Data ditemukan</Text>
				<Image
				   style={{marginTop:30, marginBottom:20}}
			       width={width-100} // height will be calculated automatically
			       source={logoAktivation}
			    />
				<CardIcon icon="account-balance" label="Nama usaha / bisnis" text={tenant.name}/>
				<CardIcon icon="room" label="Alamat" text={tenant.address}/>
				<CardIcon icon="assignment" label="kategori" text={tenant.category.name}/>
				<View style={{potition:'absolute', top:'6%', alignItems: 'center'}}>
					<Button 
						title="Bergabung sekarang" 
						textStyle={{color:'white'}} 
						loading={this.state.isLoading}
						disabled={this.state.error}
						style={{backgroundColor:'#04a3e7'}} 
						onPress={ () => this._joinTenant(id) }/>
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
