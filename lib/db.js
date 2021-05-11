import firebase from './firebase'

const rooms = firebase.firestore().collection('rooms')

export async function createRoom(data) {
  return rooms.add(data)
}

export async function updateRoom(id, newValues) {
  return rooms.doc(id).update(newValues)
}

export function listenToRoom(id, callback) {
  return rooms.doc(id).onSnapshot(callback)
}
