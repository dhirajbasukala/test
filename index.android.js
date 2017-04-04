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

        this.slotWeight = {
            a: 3,
            b: 2,
            c: 3,
            d: 2,
            e: 4,
            f: 2,
            g: 3,
            h: 2,
            i: 3,
        }

        this.combinationOf = {
            a: ["abc", "adg", "aei"],   //default null, 0 for user , 1 for bot
            b: ["abc", "beh"],
            c: ["abc", "ceg", "cfi"],
            d: ["adg", "def"],
            e: ["aei", "beh", "ceg", "def"],
            f: ["cfi", "def"],
            g: ["adg", "gec", "ghi"],
            h: ["beh", "ghi"],
            i: ["aei", "ghi", "efi"],
        }

        this.slots = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

        this.state = {
            turnOf: 0,
            user: {
                selectedSlots: [],
                possibleCombinations: ["abc", "adg", "aei", "beh", "ceg", "cfi", "def", "ghi"]
            },
            bot: {
                selectedSlots: [],
                possibleCombinations: ["abc", "adg", "aei", "beh", "ceg", "cfi", "def", "ghi"]
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

        this.fillTicTac = this.fillTicTac.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
        this.robotMove = this.robotMove.bind(this);
        this.resetSlots = this.resetSlots.bind(this);
    }

    fillTicTac(field) {
        let {fields, turnOf} = this.state;
        this.setState({fields: {...fields, [field]: turnOf ? "O" : "X"}, turnOf: !turnOf});
        this.updateUserData(field)
       // this.robotMove(field)
    }


    updateUserData(f) {
        const { user } = this.state;
        this.setState({ user :
            {   ...user,
                selectedSlots: [...user.selectedSlots,f],
                possibleCombinations: user.possibleCombinations.filter(pComb=>pComb.indexOf(f)>-1)
            }
        },this.robotMove(f));
    }

    robotMove(f) {
        console.log("user move fniished now it's your turn roboto")
    }

    resetSlots(){
        this.setState({
            turnOf: 0,
            user: {
                selectedSlots: [],
                possibleCombinations: ["abc", "adg", "aei", "beh", "ceg", "cfi", "def", "ghi"]
            },
            bot: {
                selectedSlots: [],
                possibleCombinations: ["abc", "adg", "aei", "beh", "ceg", "cfi", "def", "ghi"]
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
        })

    }

    render() {
        console.log("User:", this.state.user.selectedSlots);
        console.log("possible combination :", this.state.user.possibleCombinations);
        console.log("Bot:", this.state.bot.selectedSlots);
        console.log("possible combination :", this.state.bot.possibleCombinations);
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Tic Tac Toe game !
                </Text>
                <Text> User : X </Text>
                <Text> Bot: O </Text>
                <View style={{backgroundColor: "white", padding: 20, flex: 1, justifyContent: "flex-start"}}>

                    <View style={styles.inputWrapper}>
                        <TicTacToeInput id="a" onPressHandler={this.fillTicTac.bind(null, "a")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.a}/>
                        <TicTacToeInput id="b" onPressHandler={this.fillTicTac.bind(null, "b")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.b}/>
                        <TicTacToeInput id="c" onPressHandler={this.fillTicTac.bind(null, "c")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.c}/>
                    </View>

                    <View style={styles.inputWrapper}>

                        <TicTacToeInput id="d" onPressHandler={this.fillTicTac.bind(null, "d")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.d}/>
                        <TicTacToeInput id="e" onPressHandler={this.fillTicTac.bind(null, "e")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.e}/>
                        <TicTacToeInput id="f" onPressHandler={this.fillTicTac.bind(null, "f")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.f}/>
                    </View>

                    <View style={styles.inputWrapper}>

                        <TicTacToeInput id="g" onPressHandler={this.fillTicTac.bind(null, "g")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.g}/>
                        <TicTacToeInput id="h" onPressHandler={this.fillTicTac.bind(null, "h")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.h}/>
                        <TicTacToeInput id="i" onPressHandler={this.fillTicTac.bind(null, "i")}
                                        style={styles.ticTacToeInputView}
                                        field={this.state.fields.i}/>
                    </View>

                </View>
                <TouchableNativeFeedback onPress={this.resetSlots}
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor:"red"}}>
                        <Text style={{fontSize: 30, textAlign: "center", marginTop: 20}}>Clear All </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const TicTacToeInput = ({id, onPressHandler, style, field}) => {
    return (
        <TouchableNativeFeedback id={id} onPress={onPressHandler}
                                 background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={style}>
                <Text style={{fontSize: 30, textAlign: "center", marginTop: 20}}>{field}</Text>
            </View>
        </TouchableNativeFeedback>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: "100%"
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
    ticTacToeInputView: {
        backgroundColor: "orange",
        maxHeight: 80,
        width: 80,
        borderWidth: 1,
        borderColor: "#fff"
    },
    inputWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "red",
        maxHeight: 80
    }
});

AppRegistry.registerComponent('TicTacToe', () => TicTacToe);
