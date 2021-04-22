import AsyncStorage from '@react-native-community/async-storage'

const DECKS_STORAGE_KEY = 'MobileFlashcards:deck'

export const _getDecks = async() => {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return JSON.parse(decks)
}

export const _saveDeckTitle = async(title) => {
    const deck = {
        title,
        questions: []
    }

    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: deck,
    }))

    return await _getDecks()
}

export const _deleteDeck = async(deckId) => {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

    const data = JSON.parse(decks)
    data[deckId] = undefined
    delete data[deckId]
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))

    return await _getDecks()
}

export const _addCardToDeck = async(title, card) => {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

    const data = JSON.parse(decks)
    data[title].questions.push(card)

    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))

    return await _getDecks()
}