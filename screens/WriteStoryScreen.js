import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
 
export default class WriteStoryScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            storyText: '',
        }
    }

    submitStory = ()=>{
      console.log(db.collection("stories"))
        db.collection("stories").add({
            title: this.state.title,
            author: this.state.author,
            storyText: this.state.storyText,
            //date: firebase.firestore.FieldValue.serverTimestamp().now().toDate()
        })
        this.setState({
            title: '',
            author: '',
            storyText: ''
        })
    }

    render(){
        return(
               <KeyboardAvoidingView>
                <Header 
                    backgroundColor = {'lightblue'}
                     centerComponent = {{
                        text : 'Story Hub',
                        style : { color: 'white', fontSize: 30}
                    }}
                />
                {/* <KeyboardAvoidingView style={styles.container}> */}
                <TextInput 
                    placeholder="Story Title"
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            title: text
                        })
                    }}
                    value={this.state.title}
                    style={styles.title}/>
                    {/* </KeyboardAvoidingView> */}

                    {/* <KeyboardAvoidingView style={styles.container}> */}
                <TextInput
                    placeholder="Author"
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            author: text
                        })
                    }}
                    value={this.state.author}
                    style={styles.author} />
                    {/* </KeyboardAvoidingView> */}

              <KeyboardAvoidingView styles={styles.container}>
                <TextInput 
                    placeholder="Write your story"
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            storyText: text
                        })
                    }}
                    value={this.state.storyText}
                    style={styles.storyText}
                    multiline={true}/>
                    </KeyboardAvoidingView>
                
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.submitStory}
                   >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
      height: 40,
      borderWidth: 2,
      marginTop: 40,
      margin: 10,
      color:'black',
      padding: 6,

  },
  author: {
      height: 40,
      borderWidth: 2,
      margin: 10,
       padding: 6,
  },
  storyText: {
      height: 250,
      borderWidth: 2,
      margin: 10, 
      padding: 6,
  },
  submitButton:{
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: 'turquoise',
      width: 80,
      height: 40,color:'black',
  },
  buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      color:'black',
  }
});