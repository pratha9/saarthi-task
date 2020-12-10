import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyDNImokhI0gFYrxp1SDNpLOKh4O7eeKK6M",
  authDomain: "saarthi-task.firebaseapp.com",
  projectId: "saarthi-task",
  storageBucket: "saarthi-task.appspot.com",
  messagingSenderId: "375812337547",
  appId: "1:375812337547:web:bda351b9b376e0baf3098e",
  measurementId: "G-MD71SCS4T7"
	// messagingSenderId: "263473733320"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
		// this.database = app.d
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
	}

	addUrl(url) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}


		const rawdata = fetch("https://cors-anywhere.herokuapp.com/"+url, {
			method: 'GET',
			headers:{
			  'X-Requested-With': 'XMLHttpRequest'
			}
		  })

		return this.db.doc(`saarthi-demo-default-rtdb/${this.auth.currentUser.uid}`).set({
			url
		}) 
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser 
	}

	async getUrl() {
		const url = await this.db.doc(`saarthi-demo-default-rtdb/${this.auth.currentUser.uid}`).get()
		const _url = url.get('url')
		// const response = await fetch(_url,{method: 'POST'})
		// const text_response = await response.text();

		return _url
		// return response
	}
}

export default new Firebase()