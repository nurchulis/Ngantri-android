 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, ActivityIndicator, TouchableOpacity, ScrollView, Image, FlatList, TouchableNativeFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
//import custom components

import Data from '../../../module/data'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class Home extends Component {

	constructor(props) {
	    super(props)

	    this._chooseTenants.bind(this)

	    this.state = {
	    	city: {
	    		id: 1,
	    		city: 'Lokasi saat ini'
	    	},
	    	dataMenu: [
				{
					key: '5cb0733fb93e45005f76861f', 
					img: require('../../../static/img/pemerintahan.png'),
					name: 'Pemerintahan',
				},
				{
					key: '5cb07359b93e45005f768620', 
					img: require('../../../static/img/kesehatan.png'),
					name: 'Kesehatan' 
				},
				{
					key: '5c0d99988ef7f0afd04d2b18', 
					img: require('../../../static/img/perbankan.png'),
					name: 'Perbankan' 
				},
				{
					key: '5cb07382b93e45005f768622', 
					img: require('../../../static/img/kecantikan.png'),
					name: 'Kecantikan' 
				},
				{
					key: '5cb07393b93e45005f768623', 
					img: require('../../../static/img/otomotif.png'),
					name: 'Bengkel' 
				},
				{
					key: '5cb073a4b93e45005f768624', 
					img: require('../../../static/img/kuliner.png'),
					name: 'Kuliner' 
				},
			],
	      	isLoading: false,
	    }
	}

	_renderMenu = ({item}) => {
		return (
			<TouchableOpacity onPress={()=>this._chooseTenants(item.key)} style={{margin: 14, alignItems: 'center'}}>
				<Image source={item.img}/>
				<Text>{item.name}</Text>
			</TouchableOpacity>
		)
	}

	_searchCity = () => {
		this.props.navigation.navigate('SearchCity',{onChangeCity: this._onChangeCity.bind(this)})
	}

	_onChangeCity (city) {
		this.setState({city:city})
	}

	_chooseTenants = (id) => {
		this.props.navigation.navigate('ChooseTenants',{category_id:id})
	}

	_antrian = () => {
		this.props.navigation.navigate('Antrian')	
	}

	render () {
		if(this.state.isLoading){
	      return (
	        <View style={{ ...styles.container,justifyContent:'center' }}>
	          <StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
	          <ActivityIndicator size="large" color="#4ae0b5"/>
	        </View>
	      )
	    } else {
			return (
				<ScrollView contentContainerStyle={{alignItems:'center'}}>
					<View style={styles.container}>
						<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
						<View style={{padding: 16}}>
							<View style={{flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									<Text style={{fontSize: 16}}>Hai</Text>
									<Text style={{fontSize: 16}}>Khoirul Umam</Text>
									<Text style={{fontSize: 16}}>Selamat Datang di Ngantri</Text>
									<TouchableNativeFeedback onPress={this._searchCity}>
									<View style={{marginTop: 30, flexDirection: 'row'}}>
										<Icon name="room" size={16}/>
										<Text style={{fontSize: 16,marginLeft: 8}}>{this.state.city.city}</Text>
									</View>
									</TouchableNativeFeedback>
								</View>
								<View style={{flex: 1,alignItems: 'center'}}>
									<Image source={require('../../../static/img/tugu.png')} />
								</View>
							</View>
							<View style={{flexDirection: 'row', width: width-32, height: 76, borderRadius:12, elevation: 1, marginTop: 24}}>
								<TouchableOpacity onPress={this._antrian} style={{alignItems: 'center', flex:1, justifyContent: 'center'}}>
									<Image source={require('../../../static/img/reservasi.png')}/>
									<Text style={{marginTop: 4}}>Reservasi</Text>
								</TouchableOpacity>
								<View style={{alignItems: 'center', flex:1, justifyContent: 'center'}}>
									<Image source={require('../../../static/img/rekomendasi.png')}/>
									<Text style={{marginTop: 4}}>Rekomendasi</Text>
								</View>
								<View style={{alignItems: 'center', flex:1, justifyContent: 'center'}}>
									<Image source={require('../../../static/img/terdekat.png')}/>
									<Text style={{marginTop: 4}}>Terdekat</Text>									
								</View>
								<View style={{alignItems: 'center', flex:1, justifyContent: 'center'}}>
									<Image source={require('../../../static/img/favorit.png')}/>
									<Text style={{marginTop: 4}}>Favorit</Text>
								</View>
							</View>
							<View style={{alignItems: 'center', marginTop: 28}}>
								<Text>Pilih layanan untuk memulai</Text>
								<View style={{marginTop: 10}}>
									<FlatList
										data={this.state.dataMenu}
										numColumns={4}
										renderItem={this._renderMenu}
									/>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			)
		}
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: 'white'
		}
	}
)