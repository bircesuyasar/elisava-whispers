import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBbajwemGFsqBaTtlKc9zV1qds27ZP2MoQ',
  authDomain: 'elisava-whispers.firebaseapp.com',
  projectId: 'elisava-whispers',
  storageBucket: 'elisava-whispers.firebasestorage.app',
  messagingSenderId: '612260817320',
  appId: '1:612260817320:web:a56ca0f5d202ae4913d59d',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
