/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, Picker, StyleSheet, PixelRatio } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class ListText extends Component {

	state = {
	    isDateTimePickerVisible: false,
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

	_handleDatePicked = (date) => {
	    console.log('A date has been picked: ', date);
	    this._hideDateTimePicker()
	}

	render () {

		picker = <Picker
				  selectedValue="js"
				  style={{ height: 20, width: 130, transform:  (PixelRatio.get() < 1.5 ) ? [{ scaleX: 0.8 }, { scaleY: 0.8 } ] : (PixelRatio.get() < 2 ) ? [{ scaleX: 0.8 }, { scaleY: 0.8 } ] : (PixelRatio.get() < 3 ) ? [{ scaleX: 0.91 }, { scaleY: 0.91 } ] : (PixelRatio.get() < 3.5 ) ? 14 : (PixelRatio.get() < 4 ) ? 180 : 0 }}>
				  <Picker.Item label="Customer Service" value="Customer Service" />
				  <Picker.Item label="Teller" value="Teller" />
				</Picker>
		datepicker = <View>
			          	<Text onPress={this._showDateTimePicker} style={ styles.text }>Selasa, 24 November 2018  <Icon name="arrow-drop-down" size={14} /></Text>
					 	<DateTimePicker
			          		isVisible={this.state.isDateTimePickerVisible}
			          		onConfirm={this._handleDatePicked}
			          		onCancel={this._hideDateTimePicker} /> 
			         </View>

		return (
			<View style={ styles.card }>
				<Text style={{ ...styles.text,flex:0.9  }}>{ this.props.leftText }</Text>
				{ this.props.picker ? picker : this.props.datepicker ? datepicker : <Text style={{ ...styles.text,textAlign: 'right',flex:1.1 }}>{ this.props.rightText }</Text> }
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		text: {
			color: '#070707',
			fontSize: (PixelRatio.get() < 1.5 ) ? 11 : (PixelRatio.get() < 2 ) ? 11 : (PixelRatio.get() < 3 ) ? 14 : (PixelRatio.get() < 3.5 ) ? 14 : (PixelRatio.get() < 4 ) ? 180 : 0,
		},
		card: {
			flexDirection:'row',
			borderBottomColor: '#EFE8E8',
			borderBottomWidth: 1, 
			paddingVertical: 4
		}
	}
)


