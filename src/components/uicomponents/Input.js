/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, TextInput, Text, Dimensions, PixelRatio, StyleSheet } from 'react-native'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window');

export default class Input extends Component {
	render () {
		return (
			<View style={{...styles.textinput, ...this.props.style}}>
				<TextInput
					ref={this.props.onRef}
					onSubmitEditing={this.props.onSubmitEditing}
					returnKeyType={this.props.returnKeyType}
					secureTextEntry={ this.props.password } 
					placeholder={ this.props.label } 
					onChangeText={ this.props.onChangeText }
					onBlur={ this.props.onBlur }
					style={ styles.input }
					value={ this.props.value }
					underlineColorAndroid={ this.props.type == 'searcbar' ? 'transparent' : this.props.errorMessage ? 'red' : "#EFE8E8" }
					autoFocus={ this.props.autoFocus }/>
				<Text style={{ color: 'red', fontSize: 12, marginHorizontal: 4 }}>{ this.props.errorMessage }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create(
{
		textinput: {
			width: (PixelRatio.get() < 1.5) ? width-64 : ( PixelRatio.get() < 2 ) ? width-64 : ( PixelRatio.get() < 3 ) ? width-64 : (PixelRatio.get() < 3.5) ? width-64 : 64,
		},
		input: {
			height: (PixelRatio.get() < 1.5) ? 36 : ( PixelRatio.get() < 2 ) ? 48 : ( PixelRatio.get() < 3 ) ? 48 : (PixelRatio.get() < 3.5) ? 48 : 48,
		}
	}
)
