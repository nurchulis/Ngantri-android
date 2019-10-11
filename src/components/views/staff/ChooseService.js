/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'


export default class PilihLayanan extends Component {

	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Pilih Layanan",
    	headerTintColor: '#4ae0b5',
    	headerTitleStyle: {
        	fontWeight: 'bold',
        	color: '#4ae0b5'
      	},
      	headerStyle: {
	        elevation: 2,
	        backgroundColor: '#fff',
	        height: 50
	    }
  	}

  	_pilihLoket = () => {
  		this.props.navigation.navigate('PilihLoket')
  	}

	render () {
		return (
			<View style={styles.container}>
					
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			paddingVertical:8,
			flex: 1,
			alignItems: 'center',
			backgroundColor: '#fafafa'
		}
	}
)