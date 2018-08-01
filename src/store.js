import {createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
//REDUCERS WILL BE IMPORTED HERE AS WELL
//TODO------^

//FIREBASE SETUP STARTS HERE
const firebaseConfig = {
  apiKey: "AIzaSyB-A_gnY8Cm7TqcWtNGygcZZ6BCX-OavNE",
  authDomain: "entityfinance.firebaseapp.com",
  databaseURL: "https://entityfinance.firebaseio.com",
  projectId: "entityfinance",
  storageBucket: "entityfinance.appspot.com",
  messagingSenderId: "625110755068"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Initialization of the firebase instance
firebase.initializeApp(firebaseConfig);

//Initialization of firestoreReduce
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
reduxFirestore(firebase)  //  <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

//Create initial state

const initialState = {};

//Create store with firebase, we pass in the root reducer, the initial state, react redux firebase along with the redux devtools(will have to use compose)
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),    //takes in the firebase instance
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for the redux devtools
));

export default store; //to bring our store to the main app javascript file
