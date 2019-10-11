/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TextInput, AsyncStorage, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'

import ButtonIcon from '../../uicomponents/ButtonIcon'
import Data from '../../../module/data'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class SearchCity extends Component {

  //config header pencarian
  static navigationOptions = ({navigate, navigation}) => ({
    headerTitle: (navigation.state.params && navigation.state.params.showSearchBox) ? <View style={{width: '100%', backgroundColor: 'white', height: 40, borderRadius: 8, flexDirection: 'row', alignItems:'center', justifyContent:'center', paddingHorizontal: 8}}><Icon name="search" size={24}/><TextInput placeholder="Cari kota anda" style={{width: width-180}} autoFocus={true} onChangeText={(text) => navigation.state.params.handleSearchInput(text)}/><ButtonIcon icon="close" color="black" onPress={()=> navigation.setParams({showSearchBox: false})} /></View> : "Pilih kota anda" ,
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
    headerRight: (navigation.state.params && navigation.state.params.showSearchBox) ? <View></View> : <ButtonIcon style={{padding: 8}} icon="search" onPress={()=> navigation.setParams({showSearchBox: true})} />
  })

  constructor(props) {
    super(props)

    this._home.bind(this)

    this.state = {
      cities:[],
      filter: false,
      citiesFilter: [],
      isLoading: false,
    }
  }

  _handleSearchInput (text) {
    if (text !== '') {
      let cities = this.state.cities
      cities = cities.filter((x)=>{
        return (x.city.indexOf(text) > -1)
      })
      this.setState({citiesFilter:cities, filter: true})
    } else {
      this.setState({filter: false})
    }
  }

  _home = (city) => {
    this.props.navigation.state.params.onChangeCity(city)
    this.props.navigation.navigate('Home')
  }

  _keyExtractor = (item, index) => item.id

  _renderCity = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={()=>this._home(item)} style={{flexDirection: 'row',alignItems:'flex-end', height: 44, paddingBottom: 8}}>
          <Text style={{fontSize: 16}}>{item.city}</Text>
        </TouchableOpacity>
        <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ababab'}}/>
      </View>
    )
  }

  async componentDidMount () {
    this.setState({isLoading: !this.state.isLoading})
    console.log(await service.tenant.getArea())
    this.setState({cities: await service.tenant.getArea()},()=> {
      this.setState({isLoading: !this.state.isLoading})
    })
    this.props.navigation.setParams({
        handleSearchInput: this._handleSearchInput.bind(this)
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
          <View style={{paddingHorizontal: 16}}>
            <TouchableOpacity onPress={()=>this._home({id: 1, city: 'Lokasi saat ini'})} style={{flexDirection: 'row',alignItems:'center', height: 56}}>
              <Icon name="room" size={16} color="#04A3E7"/>
              <Text style={{fontSize: 16, marginLeft: 4, color: '#04A3E7'}}>Lokasi saat ini</Text>
            </TouchableOpacity>
            <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ababab'}}/>
            <FlatList
                extraData={this.state}
                data={this.state.filter ? this.state.citiesFilter : this.state.cities}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderCity}/>
          </View>
        </View> 
  		)
    }
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: 'white'
		}
	}
)