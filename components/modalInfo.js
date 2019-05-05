import React from 'react'
import { View,StyleSheet,FlatList,ScrollView,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,TextInput} from 'react-native'
import { Button,Text } from 'native-base';
import colors from '../theme'
import InfoFile from './infoFile'
import OptionFile from './optionFile'
import Modal from "react-native-modal";

export default class ModalInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible:false,
      background:false,
    }
  }

  render(){

    return(
      <Modal
        isVisible={this.props.visible}
        style={{padding:0,margin:0}}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOutside}
          onPressOut={() => {this.props.setModalVisible(false)}}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>

                <InfoFile
                  file={this.props.item}/>

                <OptionFile
                  file={this.props.item}
                  deleteItem={(file) => {this.props.deleteItem(file)}}
                  copyLink={() => {this.props.copyLink()}}/>

              </View>
            </TouchableWithoutFeedback>

        </TouchableOpacity>

     </Modal>

    );
  }
}


const styles = StyleSheet.create({
  modalContainer:{
    width:'100%',
    backgroundColor:colors.view,
    paddingHorizontal:10,
    color:colors.textMain,
  },
  modalOutside:{
    flex: 1,
    width:'100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },


});
