/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, TextInput,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';

export default class TicTacToe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            turn: 0,
            user: {
                values: []

            },
            bot: {
                values: [],
            },
            fields: {
                a: null,   //default null, 0 for user , 1 for bot
                b: null,
                c: null,
                d: null,
                e: null,
                f: null,
                g: null,
                h: null,
                i: null,
            }

        }
    }

    fillTicTac(e) {

        console.log(e)

        /*
         if(this.turn){
         let uValues= this.state.user.values;
         this.setState({ user.values: uValues })
         }
         else{
         this.setState({bot.values: })
         }*/
        console.log("tesing filling ")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Tic Tac Toe game !
                </Text>
                <Text>
                    User : X
                </Text>
                <Text>
                    Bot: O
                </Text>
                <View style={{backgroundColor: "white", padding:20, flex:1, justifyContent:"flex-start"}}>
                    <View style={styles.inputWrapper}>
                        <TextInput style={ (styles.ticTacToeInputText )} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                    </View>
                    <View style={styles.inputWrapper}>

                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                        <TextInput style={ styles.ticTacToeInputText} maxLength={1}
                                   placeholderTextColor={ "red"} underlineColorAndroid={"orange"}/>
                        <TouchableNativeFeedback onPress={this.fillTicTac}>

                            <TextInput placeholderTextColor={"red"} style={styles.ticTacToeInputText}/>
                        </TouchableNativeFeedback>


                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    ticTacToeInputText: {
        backgroundColor: "orange",
        width: '25%',
        borderWidth: 1,
        fontSize: 30,
        paddingLeft: 10,
        borderColor: "gray",

    },
    inputWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "red",
        height:50
    }
});

AppRegistry.registerComponent('TicTacToe', () => TicTacToe);
