import { INVITE_STATUS } from 'utils/constants'

export default function RoomInvitation({ data }) {
  console.log('data in RoomInvitation: ', data)
  if (data.status !== INVITE_STATUS) {
    return <>Not open for invites anymore :(</>
  }
  return <>this is the room invitation view.</>
}
