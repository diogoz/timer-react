import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  CoutdownStartButton,
  MinuteAmountInput,
  TaskNameInput,
} from './styles'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
interface ICycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewTask(data: NewCycleFormData) {
    // criação de ID única para identificação de cada tarefa
    const id = String(new Date().getTime())

    // criação do objeto Ciclo, com informações vindas do input.
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    // adiciona o novo ciclo no array de ciclos
    setCycles((state) => [...state, newCycle])

    // adiciona o id no state de ciclo ativo.
    setActiveCycleId(id)
    reset()
  }
  // percorre toda a lista para ver qual é o ciclo ativo atual
  const activeCycle = cycles.filter((cycle) => cycle.id === activeCycleId)

  console.log('activeCycle', activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskNameInput
            id="task"
            list="suggestion-task"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <datalist id="suggestion-task">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinuteAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CoutdownStartButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </CoutdownStartButton>
      </form>
    </HomeContainer>
  )
}
