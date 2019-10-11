/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ListItem extends Component {
	render () {
		return (
			<View style={{height: 40, justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginHorizontal: 16}}>
				<Text>{this.props.leftText}</Text>
				<Text>{this.props.rightText}</Text>
			</View>
		)
	}
}
