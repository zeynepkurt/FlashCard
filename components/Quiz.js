import React, { Component } from 'react';
import { connect } from 'react-redux'
import Result from './Result'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import { lightBlue, red, green, white, corred, purple } from '../utils/colors';
import { View,Text,TouchableOpacity,StyleSheet,Platform} from 'react-native';


class Quiz extends Component {
  state = {
    counter: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false,
  }

  toggleCard = () => {
    this.setState((prevState) => ({
      showAnswer: !prevState.showAnswer
    }))
  }

  answer = (answer) => {
    const { counter ,showAnswer} = this.state
    const { deck } = this.props
    const questionCount = deck.questions.length
 
    if (answer) {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
        correct: prevState.correct + 1,
        showAnswer: false
      }))
    }
    else if (!answer) {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
        incorrect: prevState.incorrect + 1,
        showAnswer: false
      }))
    }

    //If the user has completed the quiz, gis local notifications is cleared for that day
    if (counter + 1 === questionCount) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  handleRestart = () => {
    const { deckId } = this.props

    this.setState({
      counter: 0,
      correct: 0,
      incorrect: 0,
      showAnswer: false,
    })
   
    this.props.navigation.navigate(
      'Quiz',
      { deckId: deckId }
    )
  }

  handleBack = () => {
    const { deckId } = this.props

    this.props.navigation.navigate(
      'Deck',
      { deckId: deckId }
    )
  }
  render() {
    const { deck } = this.props
    const { counter, correct, incorrect, showAnswer } = this.state
    const questionCount = deck.questions.length


    if (questionCount === 0) {
      return (
        <View style={styles.noQuestionContainer}>
          <Text style={{ flex: 0.5, fontSize: 17, fontWeight: 'bold' }}>There is no question in this deck!</Text>
        </View>
      )
    }
    if (questionCount === counter) {
      return (
        <Result
          correct={correct}
          incorrect={incorrect}
          questionCount={questionCount}
          handleRestart={this.handleRestart}
          handleBack={this.handleBack}
        />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.counter}> {counter + 1} /{questionCount}</Text>
          <View style={styles.headerContainer}>
            <Text style={styles.textQA}>{showAnswer === true
              ? deck.questions[counter].answer
              : deck.questions[counter].question}</Text>
            <TouchableOpacity
              onPress={this.toggleCard}
            >
              <Text
                style={styles.btnAnswer}
              >
                {showAnswer === true ? 'Question' : 'Answer'}

              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => this.answer(true)}
            style={Platform.OS === 'ios' ? [styles.iosBtn, styles.btnCorrect] : [styles.androidBtn, styles.btnCorrect]}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.answer(false)}
            style={Platform.OS === 'ios' ? [styles.iosBtn, styles.btnIncorrect] : [styles.androidBtn, styles.btnIncorrect]}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params

  return {
    deckId,
    deck: decks
      ? decks[deckId]
      : null,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightBlue,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    alignSelf: 'flex-start',
    margin: 20,
    fontSize: 22,
  },
  textQA: {
    fontSize: 55,
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnAnswer: {
    color: purple,
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 65,
    width: 300,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    justifyContent: 'center',
  },
  androidBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 60,
    width: 300,
    borderRadius: 4,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    justifyContent: 'center',
  },
  btnCorrect: {
    backgroundColor: green,
  },
  btnIncorrect: {
    backgroundColor: corred,
  },
  btnText: {
    textAlign: 'center',
    color: white,
    fontSize: 15,
  },
  noQuestionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: green,
  }
})

export default connect(mapStateToProps)(Quiz)