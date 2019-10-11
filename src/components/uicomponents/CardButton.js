/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, PixelRatio, Dimensions, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class CardButton extends Component {

	render () {

		const styles = StyleSheet.create
		(
			{
				button: {
					borderRadius: 4,
					padding: 12,
					height:280,
					elevation: 3,
					opacity: this.props.disabled ? 0.3 : 1,
					width: (PixelRatio.get() < 1.5) ? 150 : (PixelRatio.get() < 2) ? 150 : (PixelRatio.get() < 3) ? 160 : (PixelRatio.get() < 3.5) ? 150 : 150,
				},
				text: {
					fontSize: 14,
					textAlign: 'center',
					fontWeight: 'bold'
				},
				image: {
					width: 16,
					height: 16,
					marginRight: 8
				}
			}
		)
		
		let img = <Image style={ styles.image } source={ require('../../static/logo-google.png') } />
			
		return (
			<View>
				<TouchableOpacity onPress={ this.props.onPress } style={ [styles.button, this.props.style] } disabled={ this.props.disabled }>
					<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						{ this.props.image ? img : false }
						{ this.props.loading ? <ActivityIndicator size="small" color="black" style={{marginRight: 8}}/> : false }
						<Text style={ [styles.text, this.props.textStyle, { color: this.props.disabled ? 'black' : this.props.textStyle.color }] }>{ this.props.title }</Text>
					</View>
		    	</TouchableOpacity>
			</View>
		);
	}
}
