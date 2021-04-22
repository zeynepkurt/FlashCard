import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddCardToDeck } from '../actions'
import { lightblue, white, purple } from '../utils/colors'
import { View,Text, TextInput, StyleSheet,TouchableOpacity,Platform,KeyboardAvoidingView} from 'react-native'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }
    handleQuestionTextChange = (input) => {
        this.setState({
            question: input,
        })
    }

    handleAnswerTextChange = (input) => {
        this.setState({
            answer: input,
        })

    }

    handleSubmit = () => {
        const { question, answer } = this.state
        const { deckId, dispatch } = this.props
        const card = { question, answer }

        dispatch(handleAddCardToDeck(deckId, card))

        this.props.navigation.navigate('Deck', { deckId: deckId })
    }



    render() {
        const { question, answer } = this.state;

        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container} >

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={question}
                        onChangeText={this.handleQuestionTextChange}
                        placeholder='Question'
                    />
                    <TextInput
                        style={styles.input}
                        value={answer}
                        onChangeText={this.handleAnswerTextChange}
                        placeholder='Answer'
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={this.handleSubmit}
                        style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
                        disabled={question === '' || answer === ''}
                    >
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                    <Text style={styles.infoText}>Question and Answer can't create with empty value </Text>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(decks, { route }) {
    const { deckId } = route.params

    return {
        deckId
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightblue,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: Platform.OS === 'ios' ? purple : purple,
        margin: 10,
        borderRadius: 4,
        backgroundColor: white,
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70,
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iosBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 65,
        width: 300,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 70,
        justifyContent: 'center',
    },
    androidBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        height: 50,
        borderRadius: 8,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 70,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 15,
        color: white,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom:80,
         padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
})



export default connect(mapStateToProps)(AddCard)

