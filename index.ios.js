import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      letter: 'a',
    }
  }
  componentDidMount() {
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
