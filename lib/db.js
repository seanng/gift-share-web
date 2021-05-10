import firebase from './firebase'

const firestore = firebase.firestore()

export async function createRoom(data) {
  return firestore.collection('rooms').add(data)
}

export async function getRoom(roomId) {
  return (await firestore.collection('rooms').doc(roomId).get()).data()
}
