import React from 'react'
import ReactDOM from 'react-dom'
import MyPokedex from './components/MyPokedex'
import './index.css'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore();

const App = (
    <Provider store={store}>
        <MyPokedex id="main"/>
    </Provider>
)

ReactDOM.render(App, document.getElementById('root'))
