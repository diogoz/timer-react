import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
  }
`

export const TaskNameInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinuteAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const BaseCountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 1rem 2.5rem;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const CountdownStartButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme.colors['green-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors['green-700']};
  }
`

export const CountdownStopButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme.colors['red-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors['red-700']};
  }
`
