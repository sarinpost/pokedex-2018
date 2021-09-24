import { createStore, combineReducers } from "redux";
import cardReducer from '../reducers/cards'

export default () => {
    const store = createStore(
        combineReducers({
            cards: cardReducer,
        })
    )
    return store
}