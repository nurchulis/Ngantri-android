/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { RNCamera } from 'react-native-camera'
import Modal from 'react-native-modal'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//mengambil panjang dan lebar layar
var { height, width } = Dimensions.get('window')

export default class ScanBarcode extends Component {

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

	    this._tenantFound.bind(this)
	    this.state = {
	    	isBarcodeScannerEnabled: true,
	    	show:false,
	    	tenant:{}
	    }
	}

	onBarCodeRead = async (e) => {
		if(this.state.isBarcodeScannerEnabled){
			this.setState({isBarcodeScannerEnabled:false,show:true})
			let tenant = await service.tenant.getTenantById(e.data, global.config)
			if (tenant !== false) {
				this.setState({isBarcodeScannerEnabled:true,show:false})     
		        this._tenantFound(tenant)
			} else {
				this.setState({isBarcodeScannerEnabled:true,show:false})
				alert('instansi tidak ditemukan')
			}
		}
	}

	_tenantFound = (tenant) => {
		this.props.navigation.navigate('TenantFound',{'tenant':tenant})
	}	

	render () {
		return (
			<View style={ styles.container }>
					<View>
						<Text style={{fontSize:20,fontWeight:'bold', marginTop:32, textAlign:'center'}}>Pindai untuk bergabung</Text>
						<Text style={{textAlign:'center', marginTop:8, width:width-64}}>Arahkan kamera ke area barcode yang tampil pada layar perangkat pemilik instansi</Text>
					</View>
					<RNCamera
						ratio={"1:1"}
					    style={styles.preview}
					    onBarCodeRead={this.onBarCodeRead}
					    ref={cam => this.camera = cam}
					    >
					</RNCamera>
					<Modal
			        isVisible={this.state.show}
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


const styles = StyleSheet.create(
	{
		container: {
		    flex: 1,
		    alignItems: 'center',
		    backgroundColor: '#fff'
		},
		preview: {
			marginTop:'10%',
			height:'50%',
			width:width-100,
		}
	}
)

