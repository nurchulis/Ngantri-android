/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation'
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager'

import Intro1 from './Intro1'
import Intro2 from './Intro2'
import Intro3 from './Intro3'

import Data from '../../../module/data'

import Button from '../../uicomponents/Button'

var {height, width} = Dimensions.get('window')

export default class Intro extends Component {
	
	constructor(props) {
	    super(props)

	    this._next.bind(this)

	    this.state = {
	    	page:0
	    }
	}

	_renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} selectedDotStyle={{backgroundColor: '#04a3e7', opacity:0.5, width:24}} dotStyle={{backgroundColor: '#04a3e7', opacity:0.5}}/>
    }

    _welcome = () => {
    	this.props.navigation.navigate('Welcome')
    }

    async _next () {
    	if (this.state.page === 2){
    		if (await Data.storeData('intro',{intro:true})) {
    			this._welcome()	
    		} else {
    			alert("error")		
    		}
    	} else {
	    	this.setState({page:this.state.page+1}, () => {this.viewPager.setPage(this.state.page)})
	    }
    }

	render () {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
				<IndicatorViewPager 
				  horizontalScroll={false}
				  ref={ viewPager => { this.viewPager = viewPager }}
				  style={{height:height-100}}
				  indicator={this._renderDotIndicator()}>
					<View><Intro1/></View>
					<View><Intro2/></View>
					<View><Intro3/></View>
				</IndicatorViewPager>
				<View style={{potition:'absolute',alignItems:'center', bottom:110, justifiContent:'space-between'}}>
					<Text style={{color:'#04a3e7', marginBottom: 12}} onPress={this._storeDataIntro}>Lewati</Text>
					<Button title={ this.state.page === 2 ? 'Selesai' : 'Selanjutnya' } textStyle={{color:'white'}} style={{backgroundColor:'#04a3e7'}} onPress={ () => this._next() }/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'white',
	}
})
