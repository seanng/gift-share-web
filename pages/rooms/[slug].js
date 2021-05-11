import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RoomNotFound from 'components/RoomNotFound'
import RoomCreatorInvite from 'components/RoomCreatorInvite'
import RoomMemberInvite from 'components/RoomMemberInvite'
import RoomInvitation from 'components/RoomInvitation'
import RoomInit from 'components/RoomInit'
import {
  ROOM_NOT_FOUND,
  ROOM_INIT,
  ROOM_CREATOR_INVITE,
  ROOM_INVITEE,
  ROOM_MEMBER_INVITE,
  INVITE_STATUS,
} from 'utils/constants'
import { INITIAL_ROOM_DATA_STATE } from 'utils/configs'
import { listenToRoom } from 'lib/db'

const roomCreatorModes = {
  [INVITE_STATUS]: ROOM_CREATOR_INVITE,
}

const roomMemberModes = {
  [INVITE_STATUS]: ROOM_MEMBER_INVITE,
}

const views = {
  [ROOM_NOT_FOUND]: RoomNotFound,
  [ROOM_INIT]: RoomInit,
  [ROOM_INVITEE]: RoomInvitation,
  [ROOM_MEMBER_INVITE]: RoomMemberInvite,
  [ROOM_CREATOR_INVITE]: RoomCreatorInvite,
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
  const hash = useMemo(() => router.query.hash, [router.query])

  // firestore's realtime snapshot
  useEffect(() => {
    if (!router.query?.slug) return
    const { slug } = router.query
    return listenToRoom(slug, (snapshot) => {
      const snapshotData = snapshot.data()

      // show not found msg if no data returned from snapshot
      if (!snapshotData) {
        setViewMode(ROOM_NOT_FOUND)
        return
      }
      // set data before changing view state
      setData({ ...snapshotData, slug })

      // remove hash from the url to protect users from copypasta hash
      // TODO: uncomment below after development (currently commented because of hot reload)
      // router.replace(`/rooms/${slug}`)

      const { participants, status } = snapshotData

      for (let i = 0; i < participants.length; i += 1) {
        const p = participants[i]
        if (p.hash === hash) {
          setViewMode(
            i === 0 ? roomCreatorModes[status] : roomMemberModes[status]
          )
          return
        }
      }
      setViewMode(ROOM_INVITEE)
    })
  }, [router.query.slug])

  return {
    data,
    viewMode,
  }
}
