import React, { useState,useContext } from 'react';
import { Text, View,SafeAreaView,Image ,TouchableOpacity} from 'react-native';
import Constants from '../../constants/Constants';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {CommonStyles} from '../../components/CommonStyles';
import {validateEmail} from '../../Utils/Validator';
import {AuthContext} from '../../store/auth-context';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import Spinner from 'react-native-loading-spinner-overlay';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage({navigation}) {
  const [loading, setLoading] = useState(false);
  const auth= FIREBASE_AUTH;
  const authCtx =  useContext(AuthContext);
  const marginBetween=20;
    const [email, setEmail] = useState('');
    const handleEmailChangeText = (text) => {
      const filteredText = text.replace(/[^a-zA-Z@.0-9]/g, '');
        setEmail(filteredText);
      };
    const [password, setPassword] = useState('');
    const handlePasswordChangeText = (text) => {
        setPassword(text);
      };
    const path ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShhZ8C0MlrxBBukdknfTwTeB1TIMARynYEwVDpG2mMmZ2qqiap6TNz3jpBxYkSymXOtE4&usqp=CAU';

    const signIn = async () => {
      setLoading (true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        if(response!=null){
          // console.log(`Token:${response._tokenResponse.idToken}`);
          authCtx.authenticate(response._tokenResponse.idToken);
        }
        console. log (response);
      } catch (error) {
        console. log (error);
        // alert ('Sign in failed: ' + error-message);
      } finally {
        setLoading (false) ;
      }
    }

    const logInCallBack=()=>{
      const isValid=validateEmail(email) && password!=="";
      if(isValid){
        signIn();
        // console.log(`isValid:${isValid}`);
        // authCtx.authenticate("token");
      }else{
        alert(`Provide full Information`);
      }
    };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Spinner visible={loading} 
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF'
        }}
      />
        <Image style={CommonStyles.tinyLogo} source={{
          uri: path,
        }}/>
      <View height={marginBetween}/>
     
      <CustomTextInput 
        placeholderVal="E-mail"
        changeLstnr={handleEmailChangeText}
        initialVal={email}
        isSecure={false}
       />  
       <View height={marginBetween}/>
      <CustomTextInput
        placeholderVal="Password"
        changeLstnr={handlePasswordChangeText}
        initialVal={password}
        isSecure={true}
      />
      <View height={marginBetween}/>  
      <CustomButton 
        titleVal="Log in"
        onPressClbck={logInCallBack}
      />
      <View height={marginBetween}/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>Don't have an account? </Text>
        <Text 
          style={{ color: 'blue'}} 
          onPress={()=> navigation.navigate(Constants.SignUpPageStr)}>
            Sign up
        </Text>
      </View>
    </SafeAreaView>
  );
}



