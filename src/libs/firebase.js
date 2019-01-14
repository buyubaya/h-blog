import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBOAPE91zd5EqH94r4cIHEY6zU1rNfAFZU",
    authDomain: "test-react-12d16.firebaseapp.com",
    databaseURL: "https://test-react-12d16.firebaseio.com",
    projectId: "test-react-12d16",
    storageBucket: "test-react-12d16.appspot.com",
    messagingSenderId: "478543101329"
};

export const app = firebase.initializeApp(config);
export const base = Rebase.createClass(app.database());

export const ref = path => firebase.database().ref(path);

export const getData = path => ref(path).once('value').then(snap => {
    const data = snap.val();
    
    if(data){
        const items = Object.keys(data).map(key => {
            return {id: key, ...data[key]};
        });

        return Promise.resolve(items);
    }

    return Promise.resolve([]);
});
