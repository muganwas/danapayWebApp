import firebase from 'firebase';

const today = new Date();
const year = today.getFullYear();
const date = today.getDate();
const month = today.getMonth();
const hour = today.getHours();
const minutes = today.getMinutes();
const firebaseConfig = {
    apiKey: "AIzaSyCr5uR1gAApN7pal6Pe7gOAPAAqL1adVM4",
    authDomain: "danapay-4d304.firebaseapp.com",
    databaseURL: "https://danapay-4d304.firebaseio.com",
    projectId: "danapay-4d304",
    storageBucket: "danapay-4d304.appspot.com",
    messagingSenderId: "378140996785"
  };
firebase.initializeApp(firebaseConfig);
export const emailregex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const fulldate = date + '/' + month + '/' + year + ' ' + hour + ':' + minutes;