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
  const { viewMode, data } = useRoom()

  const RoomView = views[viewMode]

  return <RoomView data={data} />
}

function useRoom() {
  const [data, setData] = useState(INITIAL_ROOM_DATA_STATE)
  const [viewMode, setViewMode] = useState(ROOM_INIT)
  const router = useRouter()

  useEffect(() => {
    // guard clause to prevent breakage
    if (!router.query?.slug) return
    ;(async function getRoomData() {
      const { slug, hash } = router.query
      const snapshot = await getRoom(slug)
      // show not found msg if no data returned from snapshot
      if (!snapshot) {
        // TODO: also handle !snapshot.participants and other required fields
        setViewMode(ROOM_NOT_FOUND)
        return
      }

      // set data before changing view state
      setData({ ...snapshot, slug })

      // remove hash from the url for security reasons
      // TODO: uncomment below after development (currently commented because of hot reload)
      // router.replace(`/rooms/${slug}`)

      const { participants } = snapshot

      for (let i = 0; i < participants.length; i += 1) {
        const p = participants[i]
        if (p.hash === hash) {
          setViewMode(i === 0 ? ROOM_CREATOR : ROOM_MEMBER)
          return
        }
      }

      setViewMode(ROOM_INVITEE)
    })()
  }, [router.query.slug])

  return {
    data,
    viewMode,
  }
}
