const cards = []

export default (state = cards, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return [...state, action.card]
        case 'REMOVE_CARD':
            return state.filter(({ id }) => id !== action.card.id)
        case 'GET_CARDS':
            return state
        default:
            return state
    }
}