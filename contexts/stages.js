import { useState, useContext, createContext } from 'react'

const StagesContext = createContext()

const stages = [
  {
    name: 'Create',
    path: '/create',
  },
  {
    name: 'Invite',
    path: '/invite',
  },
  {
    name: 'Payment',
    path: '/payment',
  },
  {
    name: 'Delivery',
    path: '/delivery',
  },
]

export function StagesProvider({ children }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0)

  const goToNextStage = () => {
    setCurrentStageIdx(currentStageIdx + 1)
  }

  const goToPrevStage = () => {
    setCurrentStageIdx(currentStageIdx - 1)
  }

  return (
    <StagesContext.Provider
      value={{ goToNextStage, stages, goToPrevStage, currentStageIdx }}
    >
      {children}
    </StagesContext.Provider>
  )
}

export const useStages = () => useContext(StagesContext)
