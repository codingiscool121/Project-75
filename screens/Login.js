
import React from 'React';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import WriteStoryScreen from './WriteStoryScreen';
import { render } from 'react-dom';
import ReadStoryScreen from './ReadStoryScreen'
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailId:"",
            password:"",
        }
    }
  
authUser=async(emailId,password)=>{
    if(emailId && password){
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
            if(response){
             this.props.navigation.navigate('Write');
             alert("Welcome, " + emailId + ". We are redirecting you to StoryHub.");
            }
        } catch (error) {
            switch(error.code){
                case 'auth/user-not-found':
                    alert("It appears that you don't have an account with Storyhub. Please create an account, and then come back to this page! 🧾");
                break;
                case 'auth/invalid email':
                    alert("Your email is invalid.");
                    break;
            }
        }
    }else{
        alert("It appears that you have not entered a username or password. Please enter them to continue to StoryHub.");
    }
}


render(){
    return(
        <View> 
        <Text style={styles.title}> Login To StoryHub</Text>
        <TextInput style={styles.loginBox} placeholder="Email(example@domain.com) " keyboardType='email-address'
        onChangeText={text=>{
            this.setState({
                emailId:text
            })
        }}
        />
      <TextInput style={styles.loginBox} placeholder="Enter Your Password" secureTextEntry={true}
      onChangeText={text=>{
          this.setState({
              password:text
          })
      }}
      />
      <TouchableOpacity onPress={()=>{
          this.authUser(
              this.state.emailId,this.state.password
          )
      }} style={styles.text}>
        <Text>Login</Text>      
      </TouchableOpacity>
        </View>
    )
}

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'turquoise',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        
    },

    title:{
        fontSize: 40,
        textAlign:"center",
        alignSelf: "center",
    }
})