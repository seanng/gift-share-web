import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RoomNotFound from 'components/RoomNotFound'
import RoomCreator from 'components/RoomCreator'
import RoomMember from 'components/RoomMember'
import RoomInvitation from 'components/RoomInvitation'
import RoomInit from 'components/RoomInit'
import {
  ROOM_NOT_FOUND,
  ROOM_INIT,
  ROOM_CREATOR,
  ROOM_MEMBER,
  ROOM_INVITEE,
} from 'utils/constants'
import { INITIAL_ROOM_DATA_STATE } from 'utils/configs'
import { getRoom } from 'lib/db'

const views = {
  [ROOM_NOT_FOUND]: RoomNotFound,
  [ROOM_INIT]: RoomInit,
  [ROOM_MEMBER]: RoomMember,
  [ROOM_CREATOR]: RoomCreator,
  [ROOM_INVITEE]: RoomInvitation,
}

export default function RoomPage() {
  const router = useRouter()
  const { viewMode, data } = useRoom(router.query)

  const RoomView = views[viewMode]

  return <RoomView data={data} />
}

function useRoom(query) {
  const [data, setData] = useState(INITIAL_ROOM_DATA_STATE)
  const [viewMode, setViewMode] = useState(ROOM_INIT)

  useEffect(() => {
    // guard clause to prevent breakage
    if (!query.slug) return // get room data from firestore
    ;(async function getRoomData() {
      const { slug, hash } = query
      const snapshot = await getRoom(slug)
      // show not found msg if no data from room id
      if (!snapshot) {
        setViewMode(ROOM_NOT_FOUND)
        return
      }

      // set data before changing view state
      setData(snapshot)

      const { participants } = snapshot

      if (!participants || !participants.length || participants.length === 0) {
        // Unexpected error
        console.error('Room contains no participants..')
      }

      for (let i = 0; i < participants.length; i += 1) {
        const p = participants[i]
        if (p.hash === hash) {
          setViewMode(i === 0 ? ROOM_CREATOR : ROOM_MEMBER)
          return
        }
      }

      setViewMode(ROOM_INVITEE)
    })()
  }, [query])

  return {
    data,
    viewMode,
  }
}
