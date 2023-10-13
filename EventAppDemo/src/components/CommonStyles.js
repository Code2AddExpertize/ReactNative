import { StyleSheet} from 'react-native';

export const CommonStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
    },
    tinyLogo: {
      marginTop:40,
      resizeMode: 'stretch',
      width: 120,
      height: 150,
    }
  });


  export const dropdownStyle = StyleSheet.create({
    container: {
      width:'80%',
      backgroundColor: 'white',
      padding: 10,
    },
    dropdown: {
      marginRight:10,
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 15,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 2,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      marginLeft:10,
      fontSize: 16,
    },
    selectedTextStyle: {
      marginLeft:10,
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });