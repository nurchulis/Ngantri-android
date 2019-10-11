/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions,ScrollView, StatusBar,FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { NavigationEvents } from 'react-navigation'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

var {height, width} = Dimensions.get('window')

export default class Home extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Beranda",
    	headerTintColor: 'white',
    	headerTitleStyle: {
        	fontWeight: 'bold',
        	color: 'white',
        	fontSize:16
      	},
      	headerStyle: {
	        elevation: 1,
	        backgroundColor: '#04a3e7',
	        height: 50,
        	textAlign: 'center'

	    },
  	}

  	constructor(props) {
	    super(props)
	    this._showCounter.bind(this)
	    this.state = {
	    	profile:{},
	    	tenant:{},
	    	antrian: {},
	    	data:[],
	    	isLoading:false,
	    	error:false
	    }
	}

  	//fungsi pindah ke halamn Pilih Layanan
	_pilihLayanan = () => {
		this.props.navigation.navigate('PilihLayanan')
	}

	//fungsi pindah ke halamn Pilih Layanan
	_profileStaff = () => {
		this.props.navigation.navigate('ProfileStaff')
	}

	_keyExtractor = (item, index) => item.id

    //fungsi pindah ke halaman Plilih Loket
    async _showCounter(item){
    	this.props.navigation.navigate('ChooseCounter', {service:item})
	}

	_renderItem = ({item}) => {
		return  (<TouchableOpacity onPress={ () => this._showCounter(item) } style={{flexGrow:1, elevation:2,height:130,borderRadius:8, backgroundColor:'#04a3e7', marginHorizontal:8, marginBottom:16, paddingTop:13, alignItems:'center'}}> 
		 			<View style={{width:30, height:5, backgroundColor:'white', borderRadius:10, marginBottom:10}}></View>
		 			<Image 
						source={ require('../../../static/ASSETS-REV/LAYANAN/layanan.png') }
          				style={{height:50,width:40, alignItems:'center'}}  />
					<Text style={{fontSize:12,marginTop:10, color:'white', textAlign: 'center', maxWidth:45}}>{item.name}</Text>
				 </TouchableOpacity>)
	}

	async componentDidMount () {
		// this._getServicesOfTenant()
		this.setState({isLoading: true})
		this.setState({
			profile: await Data.getProfile(), 
			tenant: await Data.getTenant(),
			antrian: await Data.getAntrian(),
			data: await service.tenant.getTenantService(await Data.getTenantId(), global.config),
		}, () => {
			this.setState({isLoading: false})
		})
	}

	render () {
		if(this.state.isLoading){
	      return (
	        <View style={{ ...styles.container,justifyContent:'center' }}>
	        	<NavigationEvents
				  onDidFocus={payload => this.componentDidMount()}
				/>
	        	<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
	          	<ActivityIndicator size="large" color="#4ae0b5"/>
	        </View>
	      )
	    } else {
			return (
				<ScrollView>
					<View style={styles.container}>
						<NavigationEvents
						  onDidFocus={payload => this.componentDidMount()}
						/>
						<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
						<View style={{width:width-64,flexDirection:'row',padding:24, alignItems:'center', height:124, elevation:2,marginTop:16, borderRadius:12,backgroundColor:'#04a3e7'}}>
							<Image 
							source={ this.state.profile.avatar ? { uri:this.state.profile.avatar } : require('../../../static/blank-profile.png') }
							resizeMode='cover'
	          				style={{height:70,width:70, borderRadius:40, marginRight:16}}  />
		          			<View>
		          				<Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>{this.state.profile.name}</Text>
		          				<Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>{this.state.tenant.name}</Text>
		          				<Text style={{fontSize:12,marginTop:4, color:'white'}}>Operator</Text>
		          			</View>
						</View>
						<View style={{width:width-32,padding:5, elevation:2,marginTop:24, borderRadius:12,backgroundColor:'white'}}>
							{ this.state.antrian === null ? 
								<View>
								<Text style={{alignSelf:'center', marginBottom:16}}>Pilih layanan anda</Text>
								<FlatList
									data={this.state.data}
									renderItem={this._renderItem}
									keyExtractor={this._keyExtractor}
									numColumns={3}
								/>
								</View> :
								<View style={{height:300, alignItems:'center', justifyContent:'center'}}>
									<Text>Antrain Sudah dibuat </Text>
								</View>
							}
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
			paddingVertical:8,
			flex: 1,
			alignItems: 'center',
			backgroundColor: 'white'
		}
	}
)