import { ICycle } from '../../contexts/CyclesContext'
import { ActionTypes } from './action'
import { produce } from 'immer'

interface CyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    // return {
    //   ...state,
    //   cycles: [...state.cycles, action.payload.newCycle],
    //   activeCycleId: action.payload.newCycle.id,
    // }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        document.title = 'Ciclo interrompido'
      })
    }
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        document.title = 'Ciclo finalizado!'
      })
    }
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }
    default:
      return state
  }
}
