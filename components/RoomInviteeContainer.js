import { useEffect, useState } from 'react'
import { INVITE_STATUS } from 'utils/constants'
import StepWizard from 'react-step-wizard'
import Animate from 'styles/animate.module.css'
import RoomInviteLanding from './RoomInviteeLanding'
import RoomInviteeForm from './RoomInviteeForm'
import ReasonForDeclineModal from './ReasonForDeclineModal'

export default function RoomInviteeContainer({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleRejectClick = () => {
    setIsModalOpen(true)
  }

  if (data.status !== INVITE_STATUS) {
    return <>This room is not open for invites. Please enter via email.</>
  }

  // TODO: change to opacity fadeout. look into dragnjob or animate css lib
  const transitions = {
    enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
    enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
    exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
    exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
  }

  return (
    <>
      <StepWizard transition={transitions} isHashEnabled>
        <Proxy />
        <RoomInviteLanding
          hashKey="invite"
          data={data}
          onRejectClick={handleRejectClick}
        />
        <RoomInviteeForm
          hashKey="confirm"
          data={data}
          onRejectClick={handleRejectClick}
        />
      </StepWizard>
      <ReasonForDeclineModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  )
}

// Hack to get the room hash to work
function Proxy({ nextStep }) {
  useEffect(() => {
    nextStep()
  }, [])
  return <></>
}
