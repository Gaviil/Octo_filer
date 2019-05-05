import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import colors from '../theme'


export default class FabOption extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Fab
        style={styles.mainButton}
        position="bottomRight"
        onPress={() => this.props.setOptionsModalVisible(true)}>
        <Icon name="add" />
      </Fab>
    );
  }
}


const styles = StyleSheet.create({
  mainButton: {
    backgroundColor:colors.main,

  }

});
