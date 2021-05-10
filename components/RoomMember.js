import StagesBar from 'components/StagesBar'

export default function RoomMember({ data }) {
  console.log('data in RoomMember: ', data)
  return (
    <>
      <StagesBar index={1} />
      this is the room member view.
    </>
  )
}
