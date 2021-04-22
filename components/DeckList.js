import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import { lightblue, lightPurp } from '../utils/colors';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(handleInitialData())
            .then(() => this.setState({ ready: true }))
    }

    renderItem = ({ item }) => {
        const { title, questions } = item

        return (
            <TouchableOpacity
                key={title}
                onPress={() => this.props.navigation.navigate('Deck', { deckId: title })}
                style={styles.deck}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cardCount}>{questions.length} card</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                {decks !== null && this.state.ready ?
                    <FlatList
                        data={Object.values(decks)}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    : <Text>Loading</Text>
                }
            </View>
        );
    }
}
function mapStateToProps(decks) {
    return {
        decks: decks
            ? decks
            : null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightblue,
        alignItems: 'center',
    },
    deck: {
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: Platform.OS === 'ios' ? 35 : 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        marginBottom: 7,
    },
    cardCount: {
        fontSize: 17,
        color: lightPurp,
    },
})

export default connect(mapStateToProps)(DeckList)