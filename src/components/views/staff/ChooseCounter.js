/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'

import { View, Text, StyleSheet,AsyncStorage, Dimensions,ScrollView, StatusBar,FlatList, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Button from '../../uicomponents/Button'
import update from 'immutability-helper'
import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

var {height, width} = Dimensions.get('window')

export default class ChooseCounter extends Component {

	//config header pencarian
	static navigationOptions = {
  	headerTitle: "Pilih Loket",
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

    this._service.bind(this)

		this.state = {
      counters: [],
      antrian: {
      	tenant_id: '',
      	service_id: '',
      	counter: ''
      },
      error: false,
      isLoading: false,
      noCounters: false
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    const service = navigation.getParam('service')
    this.setState({ antrian: { service_id: service.id } })
    if (service.counters === null) {
      this.setState( { noCounters: true } )
    } else {
      this.setState( { counters: service.counters } )
    }
	}

  async _start (item) {	
	  let antrian = {
      tenant_id: await Data.getTenantId(),
      counter: item
    }
    //Set Payload start Queues
    this.setState({ antrian: { ...this.state.antrian, ...antrian } })
    antrian = await service.queue.startQueue(this.state.antrian, global.config)
    if (antrian !== false) {
      if (await Data.storeData('antrian',antrian)) {
        this._service()
      }
    } else {
      alert('gagal membuat antrian')
    }
  }

  _service = () => {
    this.props.navigation.navigate('Service')
  }

	_renderItem = ({item}) => {
    return  (<TouchableOpacity onPress={ () => this._start(item) }  style={{flexGrow:1, elevation:2,height:100,borderRadius:8, backgroundColor:'#04a3e7', marginHorizontal:8, marginBottom:16, paddingTop:13, alignItems:'center'}}> 
		 			     <Text style={{fontSize:15,marginTop:10, color:'white', textAlign: 'center', width:50}}>Loket</Text>	
					     <Text style={{fontSize:25,marginTop:10,  fontWeight:'bold', color:'white', textAlign: 'center', width:50}}>{item}</Text>
					   </TouchableOpacity>)
	}
  _keyExtractor = (item, index) => index

	render () {
		return (
			<View style={styles.container}>
					<View style={{width:width-32,padding:5, elevation:2,marginTop:24, borderRadius:12,backgroundColor:'white'}}>
						<Text style={{alignSelf:'center', marginBottom:16}}>Pilih layanan anda</Text>
						<FlatList
							data={this.state.counters}
							renderItem={this._renderItem}
							keyExtractor={this._keyExtractor}
							numColumns={3}
						/>
					</View>
          {/*<Button 
      		style={{backgroundColor:'#04a3e7', marginBottom:26, marginTop:20}} 
      		textStyle={{color:'white'}}
      		//loading={this.state.loading}
      		//disabled={this.state.error}
      		title="Buka Loket layanans" />*/}
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			paddingVertical:8,
			flex: 1,
			alignItems: 'center',
			backgroundColor: '#fafafa'
		}
	}
)