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

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskNameInput
            id="task"
            list="suggestion-task"
            placeholder="Dê um nome para seu projeto"
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

        <CoutdownStartButton type="submit">
          <Play size={24} />
          Começar
        </CoutdownStartButton>
      </form>
    </HomeContainer>
  )
}
