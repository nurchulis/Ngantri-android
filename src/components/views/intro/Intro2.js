/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'

import Logo from '../../../static/ASSETS-REV/ONBOARDING/1.svg'

var {height, width} = Dimensions.get('window')

export default class Intro1 extends Component {
	constructor(props) {
	    super(props)
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={{fontSize:20, marginBottom:12}}>Hemat waktu anda</Text>
				<Text style={{marginBottom:100}}>Kami juga tidak suka menunggu lama di satu tempat</Text>
				<Image
          style={{width: '100%', height: width/1.5}}
          source={require('../../../static/img/onboarding-2.png')}
        />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop:64
	}
})
