import React from 'react';
import { Image,
Platform,
ScrollView,
StyleSheet,
Text,
TouchableOpacity,
View,
NavigatorIOS, } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      page: '1'
    }
  }

  render() {
    if (this.state.page === '1') {
      return (
        <View style={styles.container}>
          <View style={styles.helpContainer}>
            <Text style={styles.helpLinkText}>ezPark</Text>
          </View>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.testAPI} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Press to talk to backend server</Text>
            </TouchableOpacity>
          </View>
        </View>

      );
    } else if (this.state.page === '2'){
      return (
        <View style={styles.container}>
          <View style={styles.helpContainer}>
            <Text style={styles.helpLinkText}>{this.state.backendMsg}</Text>
          </View>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.goBack} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  testAPI = () => {
    fetch("http://10.136.21.176:3000/testConnection") //put your machine's IPv4 address here (System Preferences>>Network>>TCP/IP)
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          backendMsg: responseJson.message,
          page: '2',
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }

  goBack = () => {
    this.setState({
      page: '1',
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  outerContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
    marginTop: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
