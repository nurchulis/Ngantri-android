/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'

//mengambil panjang dan lebar layar
var { height, width } = Dimensions.get('window')

export default class ButtonBottom extends Component {
	render () {
		return (
			<TouchableOpacity onPress={ this.props.onPress } style={{...styles.buttonBottom, ...this.props.style, opacity: this.props.disabled ? 0.3 : 1 }} disabled={ this.props.disabled } >
				{ this.props.loading ? <ActivityIndicator size="small" color="black" style={{marginRight: 8}}/> : false }
				<Text style={{ ...styles.textButton, color: this.props.disabled ? 'black' : 'white', }}>{ this.props.title }</Text>
			</TouchableOpacity>
		)
	}
}

//style
const styles = StyleSheet.create(
	{
		buttonBottom:{
			backgroundColor: '#4ae0b5',
			justifyContent: 'center', 
			alignItems: 'center', 
			width: width,
			position: 'relative',
			height: 48,
			bottom: 0,
			flexDirection:'row',
			elevation:1
		},
		textButton: {
			color:'#fff', 
			fontWeight: 'bold',
			fontSize: 14
		}
	}
)


