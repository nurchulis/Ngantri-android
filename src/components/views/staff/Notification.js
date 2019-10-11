/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'

import api from '../../../api'
import Data from '../../../module/data'

//import custom components
import Button from '../../uicomponents/Button'

export default class Notification extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data:[],
      isLoading: false,
    }
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

  componentDidMount () {
    
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
          <FlatList
              extraData={this.state}
              data={this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
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