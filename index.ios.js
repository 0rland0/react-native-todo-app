import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  ListView,
  TextInput,
  TouchableHighlight,
  Image,
 } from 'react-native'

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

    // this.itemsRef = myFirebaseRef.child('items');
    this.itemsRef = firebase.database().ref('items/');
    this.tasksRef = firebase.database().ref('tasks/');
    this.currentTaskIndex = 0;
    this.state = {
      currentTaskUrl: '',
      newTodo: '',
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    };

    this.items = [];
    this.taskList = [{img_url: ''}];
  }
  componentDidMount() {
    // When a todo is added
    this.itemsRef.on('child_added', (dataSnapshot) => {
      // console.warn(dataSnapshot.key);
      // console.warn(dataSnapshot.val().todo);
      this.items.push({id: dataSnapshot.key, text: dataSnapshot.val().todo});
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });
    this.tasksRef.on('child_added', (dataSnapshot) => {
      img_url = dataSnapshot.val().img_url;
      // console.warn('snapshot with url added' + img_url);
      // add downloaded task to tasklist
      this.taskList.push({
        id: dataSnapshot.key,
        img_url: img_url,
      });
      if (this.state.currentTaskUrl == '') {
        this.setState({
          currentTaskUrl: img_url
        })
      }
    });

    // When a todo is removed
    this.itemsRef.on('child_removed', (dataSnapshot) => {
        this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
    });
  }
  nextTask() {
    // console.warn(JSON.stringify(this.taskList));
    this.currentTaskIndex += 1
    this.setState({
      // currentTaskIndex: this.state.currentTaskIndex + 1
      currentTaskUrl: this.taskList[this.currentTaskIndex].img_url
    });
  }
  imgLoadStart() {
    console.warn("Image started loading");
  }
  addTodo() {
    if (this.state.newTodo !== '') {
      this.itemsRef.push({
        todo: this.state.newTodo
      });
      this.setState({
        newTodo : ''
      });
    }
  }
  removeTodo(rowData) {
    this.itemsRef.child(rowData.id).remove();
  }
  // componentDidMount() {
  //   // firebase.database().ref('tasks/').push({
  //   //   csv_row_number: '5',
  //   //   img_url: 'http://www.cube.eu/media_ftp/BIKE_Bilder_2016/721009/721009_overview.png'
  //   // });
  //   setInterval(() => {
  //     this.setState({count: this.state.count + 1,
  //       letter: String.fromCharCode(this.state.count + 66)})
  //   }, 1000)
  // }


  // render() {
  //   const {count} = this.state
  //   const {color, size} = this.props
  //   const {letter} = this.state
  //   const style = {
  //     fontSize: size,
  //     color,
  //   }
  //
  //   return (
  //     <View>
  //       <Text style={style}>
  //         {count}
  //       </Text>
  //       <Text style={style}>
  //       {letter}
  //       </Text>
  //     </View>
  //   )
  // }
  render() {
    return (
      <View>
      <Text>{this.state.currentTaskUrl}</Text>
      <Image
      source={{uri: this.state.currentTaskUrl}}
      // source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 400, height: 300}}
       resizeMode='contain'
       onLoadStart={() => console.warn('loading started')}
       onLoad={() => console.warn('loading successful')}
       onLoadEnd={() => console.warn("loading endet (successful or not")}
       />
       <TouchableHighlight
            style={styles.button}
            onPress={() => this.nextTask()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Next!</Text>
          </TouchableHighlight>
      </View>
    );
  }
  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeTodo(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.todoText}>{rowData.text}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
};
// const App = () => {
//   // const style = {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // }
//
//
//   return (
//     <View style={style}>
//       <Counter color={'teal'} size={32} />
//     </View>
//   )
// }

// App registration and rendering
// AppRegistry.registerComponent('demoApp', () => App)
AppRegistry.registerComponent('demoApp', () => Counter)
