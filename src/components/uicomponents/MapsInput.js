/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, Dimensions, PixelRatio, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MapView from 'react-native-maps'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'

import marker from '../../static/marker.png'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class MapsInput extends Component {

	constructor(props) {
	    super(props)

	    this._getMyLocation.bind(this)
	    this._setLocation.bind(this)

	    this.state = {
		    latitude:0,
		    longitude:0,
		    show:false
		}
	}

	_getMyLocation () {
	    navigator.geolocation.getCurrentPosition(
	      (position) => {
	        this.setState({
	          latitude: position.coords.latitude,
	          longitude: position.coords.longitude,
	        })
	      },
	      (error) => {},
	      { enableHighAccuracy: true, timeout: 60000 },
	    )
	}

	_setLocation () {
		let lokasi = this.state.latitude+','+this.state.longitude
		this.setState({show:!this.state.show})
		this.props.onSelectLocation(lokasi)
	}

	componentDidMount(){
		if (this.props.location != '') {
			let location = this.props.location.split(',')
			this.setState({latitude: parseFloat(location[0]),longitude: parseFloat(location[1])})	
		} else {
			this.setState({latitude: 0,longitude: 0})
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location != this.props.location ){
			let location = this.props.location.split(',')
			this.setState({latitude: parseFloat(location[0]),longitude: parseFloat(location[1])})
		}
   	}

	render () {
		return (
			<View style={{...styles.textinput, ...this.props.style}}>
				{ this.props.label ? <Text style={{marginHorizontal: 4, fontSize:14, color: 'black', opacity:0.5 }}>{this.props.label}</Text> : false }
				<TouchableOpacity style={ styles.input } onPress={  () => this.setState({show:!this.state.show})  }>
					<MapView
					   liteMode
					   style={{ flex: 1, width: width }} //window pake Dimensions
					   region={{
					      latitude: this.state.latitude + 0.0016,
					      longitude: this.state.longitude,
					      latitudeDelta: 0.0922 / 20,
					      longitudeDelta: 0.0421 / 20
					   }} >
						<MapView.Marker
						   coordinate={{
						      latitude: this.state.latitude,
						      longitude: this.state.longitude,
						   }}
						   title="Lokasi"
						   description="Hello" />
					</MapView>
				</TouchableOpacity>
				<Text style={{ color: 'red', fontSize: 12, marginHorizontal: 4 }}>{ this.props.errorMessage }</Text>
				<Modal
		        isVisible={this.state.show}
		        animationIn="zoomIn"
		        animationOut="zoomOut"
		        onBackButtonPress={() => this.setState({show:!this.state.show}) }
		        onBackdropPress={() => this.setState({show:!this.state.show})}
		              style={{justifyContent: 'center', alignItems:'center',flex:1, borderRadius:30}}>
		              	<View style={{justifyContent:'center',alignItems:'center', height:'70%', backgroundColor:'white', borderRadius:8}}>
			              	<MapView
			              	   provider="google"
							   style={{ flex: 1, width: width-40 }} //window pake Dimensions
							   region={{
							      latitude: this.state.latitude,
							      longitude: this.state.longitude,
							      latitudeDelta: 0.0922 / 20,
							      longitudeDelta: 0.0421 / 20
							   }} 
							   showsMyLocationButton={false}
					           showsUserLocation={false}
					           followsUserLocation={true}
							   onRegionChangeComplete={ (region) => this.setState({longitude:region.longitude,latitude:region.latitude}) }>
							</MapView>
							<View style={{borderTopWidth:0.5, flex:0.12, borderColor:'#cfcfcf', flexDirection:'row'}}>
			                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:'100%', flex:1}} onPress={() => this._setLocation()}>
			                      <Text style={{color:'#04a3e7'}}>Simpan</Text>
			                    </TouchableOpacity>
			                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:'100%', flex:1}} onPress={() => this.setState({show:!this.state.show})}>
			                      <Text style={{color:'#04a3e7'}}>Batal</Text>
			                    </TouchableOpacity>
			                </View>
						</View>
						<TouchableOpacity onPress={ () => this._getMyLocation() } style={styles.myLocationButton}>
				          <Icon name="gps-fixed" size={20}/>
				        </TouchableOpacity>
				        <View style={styles.markerFixed}>
					      <Image style={styles.marker} source={marker} />
					    </View>
		        </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		textinput: {
			width: (PixelRatio.get() < 1.5) ? width-64 : ( PixelRatio.get() < 2 ) ? width-64 : ( PixelRatio.get() < 3 ) ? width-64 : (PixelRatio.get() < 3.5) ? width-64 : 96,
		},
		input: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginHorizontal: 4,
			paddingVertical: 12,
			height: (PixelRatio.get() < 1.5) ? 36 : ( PixelRatio.get() < 2 ) ? 48 : ( PixelRatio.get() < 3 ) ? 90 : (PixelRatio.get() < 3.5) ? 48 : 48,
		},
		myLocationButton: {
		  justifyContent:'center',
		  alignItems:'center',
		  width:46,
		  height:46,
		  backgroundColor:'white',
		  position:'relative',
		  bottom:'68%',
		  right:'-40%',
		  elevation:1,
		  borderRadius:40
		},
		markerFixed: {
	      justifyContent:'center',
	      alignItems:'center',
	      left: '52.3%',
	      marginLeft: -24,
	      marginTop: -48,
	      position: 'absolute',
	      top: '43.7%'
	    },
	    marker: {
	      height: 41,
	      width: 31
	    },
	}
)
