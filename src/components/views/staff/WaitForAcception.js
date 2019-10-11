/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import Image from 'react-native-scalable-image'
import Modal from 'react-native-modal'

import Button from '../../uicomponents/Button'
import CardIcon from '../../uicomponents/CardIcon'
import ButtonIcon from '../../uicomponents/ButtonIcon'

import logoAktivation from '../../../static/assets/aktivasi/aktivasi.png'

import api from '../../../api'
import Data from '../../../module/data'

var {height, width} = Dimensions.get('window')

var _this

export default class TenantFound extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Status",
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
	    headerRight: <ButtonIcon onPress={ () => _this.setState({show:!_this.state.show}) } size={ 24 } icon="more-vert" /> ,
  	}

	constructor(props) {
	    super(props)

	    this.state = {
	    	tenant:{},
	    	show:false,
	    	isLoading:false,
	    	error:false,
	    	loading: false
	    }

	    _this = this
	}

	_navAuth = async () => {
		if((await Data.removeData('user')) && (await Data.removeData('tenant'))){
			this.props.navigation.navigate('NavAuth')
		}
	}

	async _logout () {
		this.setState({isLoading:!this.state.isLoading})
		let config = {
	      headers: {
	        'X-Access-Token': await Data.getToken()
	      }
	    }
		api.get('auth/logout',config)
			.then(response => {
				this.setState({isLoading:!this.state.isLoading})
		        this._navAuth()
		    })
		    .catch(e => {
		    	this.setState({isLoading:!this.state.isLoading})
		        alert(JSON.stringify(e))
		    })
	}

	async componentDidMount () {
		this.setState({loading: true})
		this.setState({tenant: await Data.getTenant()}, () => {
			this.setState({loading: false})
		})
	}

	render () {
		if(this.state.loading){
	      return (
	        <View style={{ ...styles.container,justifyContent:'center' }}>
	          <ActivityIndicator size="large" color="#4ae0b5"/>
	        </View>
	      )
	    } else {
			return (
				<View style={styles.container}>
					<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
					<Text style={{fontSize:20, fontWeight:'bold',marginTop:80}}>Menunggu persetujuan</Text>
					<Image
					   style={{marginTop:30, marginBottom:20}}
				       width={width-100} // height will be calculated automatically
				       source={logoAktivation}
				    />
				    <Text style={{textAlign:'center', marginBottom:10, marginHorizontal: 32}}>Mohon menunggu beberapa saat agar permintaan disetujui oleh pemilik usaha</Text>
					
					<CardIcon icon="room" label="Alamat :" text={this.state.tenant.address}/>
					<CardIcon icon="assignment" label="Kategori :" text={this.state.tenant.category}/>
					<CardIcon icon="access-time" label="Status bergabung :" text="Menunggu persetujuan"/>
					<Modal
			          isVisible={this.state.show}
			          animationIn="slideInDown"
			          animationOut="slideOutUp"
			          onBackButtonPress={() => this.setState({show:!this.state.show}) }
			          onBackdropPress={() => this.setState({show:!this.state.show})}
			              style={{justifyContent: "flex-start", margin: 0}}>
			              <View>
			              <View style={{ backgroundColor: '#04a3e7', height: 50 , alignContent: 'flex-end', justifyContent: 'center', elevation: 1}}>
			                <TouchableOpacity onPress={ () => this.setState({show:!this.state.show})  } style={{ alignSelf: 'flex-end',marginRight: 14 }}>
			                  <Text style={{ fontSize:12, color: 'white' }} >TUTUP</Text>
			                </TouchableOpacity>
			              </View>
			              <View style={{height: 56,paddingTop:20, backgroundColor: '#04a3e7', alignItems: 'center', justifyContent:'center'}}>
			                <TouchableOpacity onPress={ () => this.setState({show:!this.state.show}, () => this._logout()) } style={{height:40, width:'100%', alignItems: 'center'}}>
			                  <Text style={{color:'white'}} >Keluar</Text>
			                </TouchableOpacity>
			              </View>
			          </View>
			        </Modal>

			        <Modal
			        isVisible={this.state.isLoading}
			        animationIn="zoomIn"
			        animationOut="zoomOut"
			              style={{justifyContent: 'center', alignItems:'center',flex:1}}>
			              	<View style={{justifyContent:'center',alignItems:'center', height:80,width:80, backgroundColor:'white', borderRadius:8}}>
				              	<ActivityIndicator size="large" color="#4ae0b5"/>
							</View>
			        </Modal>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white'
	}
})
