/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableHighlight
} from 'react-native';


export default class AwesomeProject extends Component {
  
  constructor(props){
    super(props);
    this.onPressLearnMore = this.onPressLearnMore.bind(this);
  }

  onPressLearnMore(){
    //('Press');
    this.setState({modalVisible: true});
  }

  componentWillMount(){
    //alert(Orientation.getInitialOrientation());
  }
  
  componentDidMount() {    
    //console.log(Orientation);
    //Orientation.lockToLandscape(); //this will lock the view to Landscape    
    //alert('Boo');
  }

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>        
        <Text>Hello World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
