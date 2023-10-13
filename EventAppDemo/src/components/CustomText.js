import React from 'react';
import { StyleSheet,Text } from 'react-native';


const CustomText =({titleVal,onPressClbck})=>{
    return <Text style={styles.textStyle} onPress={onPressClbck}>
            {titleVal}
        </Text>
};
export default CustomText;

const styles = StyleSheet.create({
    textStyle:{
        textAlign:'center',
        textAlignVertical:'center',
        borderRadius:5,
        height:40,
        backgroundColor:"#D7D7D7",
        width:'80%',
    }
  });