import { GET_DECKS } from './types'
import { _saveDeckTitle, _getDecks, _deleteDeck, _addCardToDeck } from '../utils/api'

export function getDecks (decks) {
    return {
        type: GET_DECKS,
        decks,
    }
}

export function handleSaveDeckTitle (title) {
    
    return (dispatch) => {
        return _saveDeckTitle(title)
            .then((decks) => {
                dispatch(getDecks(decks))
            })
    }
}

export function handleInitialData () {
    return (dispatch) => {
        return _getDecks()
            .then((decks) => {
                dispatch(getDecks(decks))
            })
    }
}

export function handleDeleteDeck (deckId) {
    return (dispatch) => {
        return _deleteDeck(deckId)
            .then((decks) => {
                dispatch(getDecks(decks))
            })
    }
}

export function handleAddCardToDeck (title, card) {
    return (dispatch) => {
        return _addCardToDeck(title, card)
            .then((decks) => {
                dispatch(getDecks(decks))
            })
    }
}