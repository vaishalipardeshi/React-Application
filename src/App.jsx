import './App.css';

import {
  store
} from './store.js'

import {
  Provider
} from 'react-redux'

import {
  ApiProvider
} from "@reduxjs/toolkit/query/react";

import {
 pokemonApi
} from "./services/api.js"

import
  AppRouter
from './routes/AppRouter.jsx'

function App() {

  return (
    <>
      <div className='App'>
        <Provider store={store}>
          <ApiProvider api={pokemonApi}>
            <div className="card">
              <AppRouter />
            </div>
          </ApiProvider>
        </Provider>
      </div>
    </>
  )
}

export default App