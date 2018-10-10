import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, DeviceEventEmitter} from 'react-native';
const {width} = Dimensions.get('window');
import * as ScreenUtils from '../../Common/ScreenUtils';
import Icon1 from "react-native-vector-icons/Ionicons";
import storage from '../../Common/StorageConfig';

export default class ChangeName extends Component{
  constructor(props) {
    super(props);
    this.state = {
      textTel: '',
      password:'',
      imgUrl:'',
      nickName:'',
    }
  }

  componentDidMount() {
      storage.load({
        key:JSON.stringify(this.props.navigation.state.params.textTel),
        autoSync: true,
        syncInBackground: true,
      }).then((ret)=> {
        this.setState({
          textTel: ret.textTel,
          password: ret.password,
          imgUrl: ret.imgUrl,
          nickName: ret.nickName,
        })
      }).catch((error)=> {
        console.log(error);
      })
  }


  render() {
    return (
        <View style={styles.container}>
          <View style={styles.NavBar}>
            <TouchableOpacity style={styles.touch} onPress={()=> this.onPress()}>
              <Icon1 name="ios-arrow-back" size={30} color={'black'} />
              <Text style={styles.textStyle}>设置</Text>
            </TouchableOpacity>
            <Text style={styles.title}>修改昵称</Text>
            <TouchableOpacity onPress={()=> this.onPress()}>
              <Text style={{color:'black',fontSize:ScreenUtils.setSpText(18),marginRight:ScreenUtils.scaleSize(25)}}>完成</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder='请输入昵称'
            underlineColorAndroid='transparent'
            onChangeText={(text)=> this.setState({nickName: text})}
          />
        </View>
    )
  }

  onPress() {
    storage.save({
      key: JSON.stringify(this.props.navigation.state.params.textTel),
      data:{
        textTel: this.state.textTel,
        password: this.state.password,
        imgUrl: this.state.imgUrl,
        nickName: this.state.nickName,
      }
    });
    DeviceEventEmitter.emit('setting', this.props.navigation.state.params.textTel);
    this.props.navigation.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    height: 25,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  textStyle: {
    fontSize: 17,
    marginLeft:5,
    color: 'black'
  },
  textInput: {
    backgroundColor: 'white',
    height: ScreenUtils.scaleSize(90),
    width: width,
    marginTop: ScreenUtils.scaleSize(30),
  }
});
