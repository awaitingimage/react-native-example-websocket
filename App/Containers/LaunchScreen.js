import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button, TextInput } from 'react-native'
import RoundedButton from "../Components/RoundedButton"
import moment from "moment";

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

var ws = new WebSocket('wss://echo.websocket.org');

export default class LaunchScreen extends Component {

  onPress = () => {
    ws.send('something');
  }

  constructor(props) {
    super(props);
    this.state = {consoleText: "",
      inputText: "wss://echo.websocket.org"};

      ws.onopen = () => {
        console.log("connection opened")
        this.setState({consoleText: moment().format('hh:mm:ss') + " - Connection Open" + "\n" + this.state.consoleText});
      };

    ws.onmessage = (e) => {
      // a message was received
      console.log(e);
      this.setState({consoleText: moment().format('hh:mm:ss') + " - Message Received: " + e.data + "\n" + this.state.consoleText});
    };
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
            <Text>
              {this.state.consoleText}
            </Text>

          </ScrollView>
          <View style={{flex: 1}}>

            {/* <RoundedButton
              text='Connect'
              onPress={this.openConnection}
            /> */}

            <RoundedButton
              text='Send Message'
              onPress={this.onPress}
            />
          </View>
        
      </View>
    )
  }
}
