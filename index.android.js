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

        this.slots = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
        this.possibleCombinations = ["abc", "adg", "aei", "beh", "ceg", "cfi", "def", "ghi"]

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
        };
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
        this.setState({fields: {...fields, [field]: "X"}, turnOf: !turnOf}, () => this.updateUserData(field));

        // this.robotMove(field)
        //
    }


    updateUserData(f) {


        const {user, bot} = this.state;

        this.slots = this.slots.filter(s => s !== f)

        let selectedSlots = [...user.selectedSlots, f];

        let possibleCombinations = this.possibleCombinations.concat([]);


        //filter out possible combination of user selected slot
        bot.selectedSlots.forEach(e => {
            possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(e) === -1)
        });

        console.log("user possible combination", possibleCombinations);
        let nextPossibleCombinations= [] ;
        //filter out combination with current selection of slot;
        selectedSlots.forEach(e => {
            nextPossibleCombinations= nextPossibleCombinations.concat(possibleCombinations.filter(pc => pc.indexOf(e) > -1))
        });

        this.setState({
            user: {
                ...user,
                selectedSlots: selectedSlots,
                possibleCombinations: nextPossibleCombinations,
            },
        }, () => this.robotMove(f));


    }

    robotMove(f) {
        let {bot, user} = this.state;

        if (user.selectedSlots.length == 1) {
            if (this.slots.filter(s => this.slotWeight[s] === 4).length) {

                let slot = this.slots.filter(s => this.slotWeight[s] === 4)[0];
                let possibleCombinations = bot.possibleCombinations;

                //filter out possible combination of user selected slot
                user.selectedSlots.forEach(e => {
                    possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(e) === -1)
                });

                //filter out combination with current selection of slot;
                possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(slot) > -1)

                //update slots variable
                this.slots = this.slots.filter(s => s !== slot)

                //update states of bot and fields
                this.setState({
                    bot: {
                        ...this.state.bot,
                        selectedSlots: bot.selectedSlots.concat(slot),
                        possibleCombinations: possibleCombinations
                    },
                    fields: {...this.state.fields, [slot]: "O"},
                })
            }
            else if (this.slots.filter(s => this.slotWeight[s] === 3).length) {
                //fill robot move to one of 3 weight locations.
                console.log("found slot weight of 3");

                let slot = this.slots.find(s => this.slotWeight[s] === 3)[0];
                let possibleCombinations = bot.possibleCombinations;

                //filter out possible combination of user selected slot
                user.selectedSlots.forEach(e => {
                    possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(e) === -1)
                });

                //filter out combination with current selection of slot;
                possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(slot) > -1)


                //update slots variable
                this.slots = this.slots.filter(s => s !== slot);

                //update states of bot and fields
                this.setState({
                    bot: {
                        ...this.state.bot,
                        selectedSlots: bot.selectedSlots.concat(slot),
                        possibleCombinations: possibleCombinations
                    },
                    fields: {...this.state.fields, [slot]: "O"},
                })


            }
            else {
                //no one will reach here .. there are not steps of reaching here probably
            }
        }
        else if (user.selectedSlots.length >= 2) {
            //check if any slot full fill finish line of user
            //if yes block it buy choosing that slot
            //else look for possible next slot for bot finish line

            let userSS = user.selectedSlots;
            let userFinishLine = user.possibleCombinations.filter(pc=>pc.indexOf(userSS[0])>-1 && pc.indexOf(userSS[1])>-1)
            let finishingSlots =[], nextSlot;

            //block user finishing line if possible
            if(userFinishLine.length){
                finishingSlots = userFinishLine[0].split("")
                nextSlot = finishingSlots.filter(fS=>userSS.indexOf(fS)=== -1 )
                console.log("nextSlot should be ", nextSlot);

                //set this found slot as next slot for robot  and do needful updates to fields, slots, possible combinations,
                let possibleCombinations = this.possibleCombinations.concat([]);

                //filter out possible combination of user selected slot
                user.selectedSlots.forEach(e => {
                    possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(e) === -1)
                });
                //filter out combination with current selection of slot;
                possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(nextSlot) > -1)

                //update slots variable
                this.slots = this.slots.filter(s => s !== nextSlot)

                //update states of bot and fields
                this.setState({
                    bot: {
                        ...this.state.bot,
                        selectedSlots: bot.selectedSlots.concat(nextSlot),
                        possibleCombinations: possibleCombinations
                    },
                    fields: {...this.state.fields, [nextSlot]: "O"},
                })

            }
            else if (this.slots.filter(s => this.slotWeight[s] === 4).length) {

                let slot = this.slots.filter(s => this.slotWeight[s] === 4)[0];
                let possibleCombinations = this.possibleCombinations.concat([]);

                //filter out possible combination of user selected slot
                user.selectedSlots.forEach(e => {
                    possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(e) === -1)
                });
                //filter out combination with current selection of slot;
                possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(slot) > -1)

                //update slots variable
                this.slots = this.slots.filter(s => s !== slot)

                //update states of bot and fields
                this.setState({
                    bot: {
                        ...this.state.bot,
                        selectedSlots: bot.selectedSlots.concat(slot),
                        possibleCombinations: possibleCombinations
                    },
                    fields: {...this.state.fields, [slot]: "O"},
                })
            }
            else if (this.slots.filter(s => this.slotWeight[s] === 3).length) {
                //fill robot move to one of 3 weight locations.
                console.log("found slot weight of 3");

                let slot = this.slots.find(s => this.slotWeight[s] === 3)[0];
                let possibleCombinations = this.possibleCombinations.concat([]);

                //filter out possible combination of user selected slot
                user.selectedSlots.forEach(e => {
                    possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(e) === -1)
                });
                //filter out combination with current selection of slot;
                possibleCombinations = possibleCombinations.filter(pc => pc.indexOf(slot) > -1)

                //update slots variable
                this.slots = this.slots.filter(s => s !== slot)


                //update states of bot and fields
                this.setState({
                    bot: {
                        ...this.state.bot,
                        selectedSlots: bot.selectedSlots.concat(slot),
                        possibleCombinations: possibleCombinations
                    },
                    fields: {...this.state.fields, [slot]: "O"},
                })


            }
            else {
                //no one will reach here .. there are not steps of reaching here probably
            }


        }
        else if (user.selectedSlots.length === 3) {
                //check if user won
            //if yes stupid you bot
            //if no, block if next moves completes user finish line
            //if next moves won't complete user finish line try to finish your finish line
            console.log("reached 3rd move hurray")
        }

    }

    resetSlots() {
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

        this.slots = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

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
        };
    }
    render() {
        console.log("User:", this.state.user.selectedSlots);
        console.log("possible combination :", this.state.user.possibleCombinations);
        console.log("Bot:", this.state.bot.selectedSlots);
        console.log("possible combination :", this.state.bot.possibleCombinations);
        console.log("available slots", this.slots.filter(s=>!!s))
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Tic Tac Toe game !
                </Text>
                <Text> User : X [ {this.state.user.selectedSlots.join(",")}]</Text>
                <Text> Bot: O [ {this.state.bot.selectedSlots.join(",")}]</Text>
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
                    <View style={{backgroundColor: "red"}}>
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
