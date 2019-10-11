/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, PixelRatio } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

var { height, width } = Dimensions.get('window');

export default class CardMenu extends Component {
	
	render () {

		return (
			<View style={{borderBottomWidth:0.5, borderColor:'#cfcfcf', marginTop:0.5}}>
				<TouchableOpacity
					onPress={ this.props.onPress }>
					<View style={ styles.listitem }>
						<View style={{padding:6, backgroundColor:'#04a3e7', borderRadius:10, marginRight:16}}>
							<Icon name={this.props.iconName} size={20} color='white'/>
						</View>
						<View style={ styles.cardBody }>
							<Text style={ styles.textTitle }>{ this.props.title }</Text>
						</View>
						<View style={{flex:1,alignItems:'flex-end'}}>
							<Icon name="keyboard-arrow-right" size={24} color='#cfcfcf'/>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		listitem: {  
			backgroundColor: 'white',
			flexDirection: 'row',
			alignItems:'center',
			width: width-32,
			height: (PixelRatio.get() < 1.5 ) ? 60 : (PixelRatio.get() < 2 ) ? 60 : (PixelRatio.get() < 3 ) ? 60 : (PixelRatio.get() < 3.5 ) ? 60 : (PixelRatio.get() < 4 ) ? 60 : 0, 
		},
	    cardBody: {
	    	flex: 2.3,
	        height: '100%',
	        justifyContent:'center',
	        paddingVertical: 8,
	        // backgroundColor: '#743432'
	    },
	    textTitle: {
	    	fontSize: (PixelRatio.get() < 1.5 ) ? 14 : (PixelRatio.get() < 2 ) ? 14 : (PixelRatio.get() < 3 ) ? 14 : (PixelRatio.get() < 3.5 ) ? 14 : (PixelRatio.get() < 4 ) ? 14 : 14, 
	    }
	}
)
