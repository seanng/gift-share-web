import StagesBar from 'components/StagesBar'
import PageContainer from 'components/PageContainer'
import PageTitle from 'components/PageTitle'

export default function RoomCreatorPayment({ data }) {
  console.log('data in RoomCreatorPayment : ', data)
  return (
    <>
      <StagesBar index={2} />
      <PageContainer classes="flex flex-col items-center">
        <PageTitle>Awaiting Full Payment</PageTitle>
      </PageContainer>
    </>
  )
}
