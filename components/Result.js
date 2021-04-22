import React from 'react';
import { lightblue, green, black, white, purple} from '../utils/colors'
import { View,Text, StyleSheet,TouchableOpacity,Platformz} from 'react-native'

export default function Result({ correct, incorrect, questionCount, handleRestart, handleBack }) 
{
    const correctPercentage = (correct / questionCount) * 100
    const incorrectPercentage = (incorrect / questionCount) * 100

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={styles.textQuiz}>Quiz Complate!</Text>
                <Text style={[styles.textPercentage, { marginTop: 30 }]}>
                    Correct answers percentage :
                    <Text style={{ fontWeight: 'bold' }}>
                        %{correctPercentage.toFixed(2)}

                    </Text>
                </Text>
                <Text style={styles.textPercentage}>
                    Incorrect answers percentage :
                    <Text style={{ fontWeight: 'bold' }}>
                        %{incorrectPercentage.toFixed(2)}

                    </Text>
                </Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={handleRestart}
                    style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
                >
                    <Text style={styles.btnText}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleBack}
                >
                    <Text style={styles.textButton}>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: lightblue,
    },
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : 30,
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textQuiz: {
        fontSize: 30,
    },
    textPercentage: {
        fontSize: 20,
        marginBottom: 15,
    },
    iosBtn: {
        backgroundColor: green,
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
        backgroundColor: green,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 60,
        width: 300,
        borderRadius: 2,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
        justifyContent: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: white,
        fontSize: 20,
    },
    textButton: {
        color: purple,
        marginTop: 5,
        marginBottom: Platform.OS === 'ios' ? 80 : 60,
        fontSize: 20,
    },
})