import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const configureStore = preloadedState => {
    /* eslint-disable no-underscore-dangle */
    var  store ;
    if(window.__REDUX_DEVTOOLS_EXTENSION__ ){
         store = createStore(
            rootReducer,
            preloadedState,
            compose(
                applyMiddleware(thunk),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )
        ) 
    }else{
     store =  createStore(
            rootReducer,
            preloadedState,
            applyMiddleware(thunk)
          )
    }

    /* eslint-enable */

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         console.log("store module.hot")
    //         const nextRootReducer = require('../reducers').default
    //         store.replaceReducer(nextRootReducer)
    //     })
    // }

    return store
}

export default configureStore
