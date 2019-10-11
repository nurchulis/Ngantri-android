/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import Image from 'react-native-scalable-image'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//import custom components
import Button from '../../uicomponents/Button'

import logoWelcome from '../../../static/assets/layanan/empty.png'

var {height, width} = Dimensions.get('window')

export default class ListOfServices extends Component {

  constructor(props) {
    super(props)

    this._updateService.bind(this)

    this.state = {
      data:[],
      isLoading: false,
    }
  }

  _updateService = (item) => {
    this.props.navigation.navigate('UpdateService', {item:item, onUpdateService: this._onUpdateService.bind(this)})
  }

  _keyExtractor = (item, index) => item.id

  _renderItem = ({item}) => {
    return (
      <View style={{borderBottomWidth:0.5, borderColor:'#afafaf', marginBottom:0.5}}>
        <TouchableOpacity style={{height:48, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} onPress={ () => this._updateService(item) }>
          <Text>{item.name}</Text>
          <Icon name="keyboard-arrow-right" size={20}/>
        </TouchableOpacity>
      </View>
    )
  }

  _onAddService (data) {
    this.setState({data:[...this.state.data,data]})
  }

  _onUpdateService (data) {
    index = this.state.data.findIndex((obj => obj.id == data.id))
    services = this.state.data
    services[index] = data
    this.setState({data:services})
  }

  _createService = () => {
    this.props.navigation.navigate('CreateService',{ onAddService: this._onAddService.bind(this) })
  }

  async componentDidMount () {
    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    this.setState({
      data: await service.tenant.getTenantService(await Data.getTenantId(), global.config)
    }, () => {
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    })
  }

	render () {
    if(this.state.isLoading){
      return (
        <View style={{ ...styles.container,justifyContent:'center' }}>
          <ActivityIndicator size="large" color="#4ae0b5"/>
        </View>
      )
    } else {
  		return (
  			<View style={styles.container}>
          { this.state.data.length < 1 ?
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}> 
              <Image
               width={width/2} // height will be calculated automatically
               source={logoWelcome}
              />
              <Text style={{fontSize:24, fontWeight: 'bold', marginBottom:16}}>Ups...!</Text>
              <Text>Daftar layanan kosong</Text>
            </View> : 
            <FlatList
              extraData={this.state}
              data={this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
          }
          <View style={{potition:'absolute', bottom:'5%', alignItems:'center'}}>
            <Button 
            style={{backgroundColor:'#04a3e7'}} 
            textStyle={{color:'white'}}
            onPress={this._createService}
            title="+ Buat layanan baru" />
          </View>
        </View> 
  		)
    }
	}
}

const styles = StyleSheet.create(
	{
		container: {
			paddingHorizontal:16,
			flex: 1,
			backgroundColor: 'white'
		}
	}
)