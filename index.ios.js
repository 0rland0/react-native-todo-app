import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native'

const Firebase = require('firebase');
const config = {
    apiKey: "AIzaSyD3t7eNBZgxEP9m7hQoK98VB-URzyxcXHk",
    authDomain: "understandai-ff322.firebaseapp.com",
    databaseURL: "https://understandai-ff322.firebaseio.com",
    storageBucket: "understandai-ff322.appspot.com",
  };
Firebase.initializeApp(config);

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      letter: 'a',
    }
  }
  componentDidMount() {
    firebase.database().ref('tasks/').push({
      csv_row_number: '5',
      img_url: 'http://www.cube.eu/media_ftp/BIKE_Bilder_2016/721009/721009_overview.png'
    });
    setInterval(() => {
      this.setState({count: this.state.count + 1,
        letter: String.fromCharCode(this.state.count + 66)})
    }, 1000)
  }
  render() {
    const {count} = this.state
    const {color, size} = this.props
    const {letter} = this.state
    const style = {
      fontSize: size,
      color,
    }

    return (
      <View>
        <Text style={style}>
          {count}
        </Text>
        <Text style={style}>
        {letter}
        </Text>
      </View>
    )
  }
}

const App = () => {
  const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <View style={style}>
      <Counter color={'teal'} size={32} />
    </View>
  )
}

// App registration and rendering
AppRegistry.registerComponent('demoApp', () => App)
