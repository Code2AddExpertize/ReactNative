import React from 'react';
import { StyleSheet,Button,TouchableOpacity,Text } from 'react-native';


const CustomButton =({titleVal,onPressClbck})=>{
    return <TouchableOpacity style={styles.btnStyle} onPress={onPressClbck}>
            <Text style={styles.textStyle} >{titleVal}</Text>
        </TouchableOpacity>
};

//File Comment
export default CustomButton;

const styles = StyleSheet.create({
    textStyle:{
        fontWeight:'bold',
        color:'white',
    },
    btnStyle:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:40,
        backgroundColor:"#788EEC",
        width:'80%',
    }
  });