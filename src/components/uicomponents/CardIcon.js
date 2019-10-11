/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, PixelRatio } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class CardIcon extends Component {
	render () {
		return (
			<View>
				<View style={{flexDirection:'row', alignItems:'center', width:width-64, marginVertical:8}}>
					<View style={{padding:6, backgroundColor:'#04a3e7', borderRadius:12, marginRight:16}}>
						<Icon name={this.props.icon} size={25} color='white'/>
					</View>
					<View style={{justifyContent:'space-between', height:40}}>
						<Text>{this.props.label}</Text>
						<Text style={{fontSize:16, fontWeight:'bold'}}>{this.props.text}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
	}
)


