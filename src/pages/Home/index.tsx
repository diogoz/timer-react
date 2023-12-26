import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  MinuteAmountInput,
  CountdownStartButton,
  CountdownStopButton,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, createContext } from 'react'
import { Countdown } from './components/Coutdown'
import { NewCycleForm } from './components/NewCycleForm'

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  // percorre toda a lista para encontrar o ciclo atual
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // function handleCreateNewTask(data: NewCycleFormData) {
  //   // criação de ID única para identificação de cada tarefa
  //   const id = String(new Date().getTime())

  //   // criação do objeto Ciclo, com informações vindas do input.
  //   const newCycle: ICycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }
  //   // adiciona o novo ciclo no array de ciclos
  //   setCycles((state) => [...state, newCycle])

  //   // adiciona o id no state de ciclo ativo.
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)
  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          document.title = 'React Timer'
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisabled = !task

  console.log(cycles)

  return (
    <HomeContainer>
      <form /* </HomeContainer>onSubmit={handleSubmit(handleCreateNewTask)} */>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <CountdownStopButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </CountdownStopButton>
        ) : (
          <CountdownStartButton type="submit" /* disabled={isSubmitDisabled} */>
            <Play size={24} />
            Começar
          </CountdownStartButton>
        )}
      </form>
    </HomeContainer>
  )
}
