import React from 'react'
import { View,StyleSheet,FlatList,ScrollView,TouchableHighlight,Modal,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import { ListItem, Text, Left, Right, Icon } from 'native-base';
import colors from '../theme'
import ItemList from './itemList'
import ItemBlock from './itemBlock'

export default class List extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data:[],
      files:[],
      folders:[],
      refreshing:false,
      modalVisible:false,
      detailsItem:{}
    }

    this.emptyValue = {
      name:'',
      size:'',
      date:'',
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing:true
    },() => {
      this.props.refreshing()
    })
  }

  componentWillReceiveProps(data){
    let folders = [];
    let files = [];
    data.data.map((item, i) => {
      if(item.isDirectory){
          folders.push(item)
      }
      if(item.isFile){
          files.push(item)
      }
    })

    this.setState({
      files:files,
      folders:folders,
      // data:data.data,
      refreshing:false
    })
  }

  itemClick = (item) =>{
    if(item.isDirectory){
      this.props.redirectTo(item.name);
    }
    else if(item.isFile){
      this.props.setModalVisible(true,item);
    }
  }
  infoFolder = (item) => {
    this.props.setModalVisible(true,item);
  }


  render(){

    const renderTitleFolder = () =>{
      if(this.state.folders.length > 0){
        return(
          <View>
            <Text
              style={styles.titleSection}>
              Dossiers
            </Text>
            <View style={styles.containerDirectory}>
            {
              this.state.folders.map((item, i) => {
                return (
                  <ItemBlock
                    item={item}
                    itemClick={(item) => this.itemClick(item)}
                    infoFolder={(item) => this.infoFolder(item)}
                  />
                );
              })
            }
            </View>
          </View>
        )
      }
    }
    const renderTitleFile = () =>{
      if(this.state.files.length > 0){
        return(
          <View>
            <Text
              style={styles.titleSection}>
              Fichiers
            </Text>
            <View style={styles.containerFile}>
            {
              this.state.files.map((item, i) => {
                return (
                  <ItemList
                    item={item}
                    itemClick={(item) => this.itemClick(item)}
                    cut={(file) => this.props.cutFile(file)}
                  />
                );
              })
            }
            </View>
          </View>
        )
      }
    }

    const renderEmptyFolder = () =>{
      if(this.state.folders.length == 0 && this.state.files.length == 0){
        return(
          <View style={styles.empty}>
            <Text
              style={styles.emptySection}>
              {"Il n'y as aucun élément ici"}
            </Text>
          </View>
        )
      }
    }


    return(
      <View style={styles.container}>
        {renderEmptyFolder()}
        {renderTitleFolder()}
        {renderTitleFile()}

      </View>
    );
  }
}


const styles = StyleSheet.create({

  container:{
    flex:1,
  },
  containerDirectory:{
    width:'100%',
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom:30
  },
  containerFile:{
    width:'100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  list:{
    flex:1,
  },
  titleSection:{
    height:40,
    lineHeight:40,
    fontSize:16,
    color:colors.textMain,
    width:'100%',
    paddingLeft:15,
    marginTop:15,
  },
  emptySection:{
    fontSize:16,
    color:colors.main,
  },
  empty:{
    height:"100%",
    width:"100%",
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
