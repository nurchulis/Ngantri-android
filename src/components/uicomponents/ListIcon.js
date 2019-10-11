/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, PixelRatio } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class ListIcon extends Component {
	render () {

		const card = StyleSheet.flatten([ styles.card, this.props.style ])

		return (
			<View style={ card }>
				<View style={ styles.cardIcon }><Icon name={ this.props.iconName } size={20} /></View><Text>{ this.props.text }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		text: {
			color: '#070707',
			fontSize: 12
		},
		card: {
			flexDirection:'row',
			borderTopColor: '#EFE8E8',
			paddingVertical: (PixelRatio.get() < 1.5 ) ? 4 : (PixelRatio.get() < 2 ) ? 4 : (PixelRatio.get() < 3 ) ? 8 : (PixelRatio.get() < 3.5 ) ? 8 : (PixelRatio.get() < 4 ) ? 180 : 0,
			borderTopWidth: 1, 
			width: width-64, 
			paddingHorizontal: 8
		},
		cardIcon: {
			width: 40	
		}
	}
)


