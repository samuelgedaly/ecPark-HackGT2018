import React from "react";
import axios from "react-native-axios";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NavigatorIOS,
  Button
} from "react-native";
import config from "./config";
import { TextField } from "react-native-material-textfield";
import t from "tcomb-form-native";
const Form = t.form.Form;
import socketIOClient from "socket.io-client";

const User = t.struct({
  Email: t.String,
  Password: t.String
  //Licenseplate number: t.String,
  //Credit Card number: t.String,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      page: "1",
      email: "",
      endpoint: "http://localhost:" + config.backend_port
    };
  }

  componentDidMount() {
    // const socket = socketIOClient(this.state.endpoint);
    setInterval(() => {
      // console.log("req");
      axios
        .get(
          "http://" +
            config.LOCAL_IP +
            ":" +
            config.backend_port +
            "/clarifai/timer"
        )
        .then(res => {
          if (this.state.current == undefined) {
            this.state.current = res.data.status;
          } else if (this.state.current != res.data.status) {
            this.state.previous = this.state.current;
            this.setState({ current: res.data.status });
            if (
              this.state.previous == "UNINITIALIZED" &&
              this.state.current == "INITIALIZED"
            ) {
              this.state.start_time = res.data.start_time;
            }
          }

          console.log(res.data.status);
        });
    }, 2000);
  }

  render() {
    if (this.state.page === "1") {
      return (
        <View style={styles.container}>
          <View style={styles.helpContainer}>
            <Text fontWeight="300" color="#008000">
              ezPark
            </Text>
          </View>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.signUp} style={styles.helpLink}>
              <Text color="#008000">SignUp and take it ez</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.page === "2") {
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
    } else if (this.state.page === "3") {
      return (
        <View style={styles.container}>
          <Text>Login</Text>
          <Form ref={c => (this.loginform = c)} type={User} />
          <Button title="Login" onPress={this.handleSubmit} />
        </View>
      );
    }
  }
  signUp = () => {
    this.setState({
      page: "3"
    });
  };

  goBack = () => {
    this.setState({
      page: "3"
    });
  };

  handleSubmit = () => {
    //console.log(this.loginform);
    /*let rawResponse = await fetch(
      "http://" +
        config.LOCAL_IP +
        ":" +
        config.backend_port +
        "/" +
        "postUserData", {
        method: 'POST',
        headers: {
             Accept: 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: 'Samuel Gedaly',
          password: 'cartuchera',
        }),
      });
      const content = await rawResponse.json();

      console.log(content);*/
    axios
      .get(
        "http://" +
          config.LOCAL_IP +
          ":" +
          config.backend_port +
          "/" +
          "postUserData/?email=samuelgedaly@gatech.edu&pass=Cartuchera2018"
      )
      .then(function(response) {
        console.log("hello");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  outerContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15,
    marginTop: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
