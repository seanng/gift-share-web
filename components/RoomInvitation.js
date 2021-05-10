export default function RoomInvitation({ data }) {
  console.log('data in RoomInvitation: ', data)
  if (data.status !== 'invitation') {
    return <>Not open for invites anymore :(</>
  }
  return <>this is the room invitation view.</>
}
