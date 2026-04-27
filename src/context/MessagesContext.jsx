import { createContext, useContext, useReducer } from 'react'

const hr = 3_600_000
const min = 60_000

const initial = {
  'banana-corner': [
    { id: 1, text: 'The espresso here is perfect. Strong but smooth.', ts: Date.now() - 2 * hr },
    { id: 2, text: 'Met a second-year student who told me about the grad show — worth going.', ts: Date.now() - 45 * min },
  ],
  'grape-hall': [
    { id: 1, text: 'The installation by the window is still up. See it before Friday.', ts: Date.now() - 5 * hr },
    { id: 2, text: 'Someone left a zine on the bench near the entrance. Free to take.', ts: Date.now() - hr },
  ],
  'lemon-lab': [
    { id: 1, text: 'Microscopes on table 3 are free this afternoon.', ts: Date.now() - 3 * hr },
    { id: 2, text: 'Bio printing workshop rescheduled to Thursday at 15:00.', ts: Date.now() - 20 * min },
  ],
  'berry-edge': [
    { id: 1, text: 'New rig is finally calibrated. Renders run overnight now.', ts: Date.now() - 6 * hr },
    { id: 2, text: 'Headphones in the locker by the door — first come first served.', ts: Date.now() - 30 * min },
  ],
  'orange-lounge': [
    { id: 1, text: 'Someone left a great playlist on the speaker. Jazz and synthesis.', ts: Date.now() - 4 * hr },
    { id: 2, text: 'The sofas near the bookshelf are the best spot to read between classes.', ts: Date.now() - 10 * min },
  ],
}

function reducer(state, action) {
  if (action.type === 'ADD') {
    const { locationId, text } = action
    const msg = { id: Date.now(), text, ts: Date.now() }
    return { ...state, [locationId]: [...(state[locationId] ?? []), msg] }
  }
  return state
}

const Ctx = createContext(null)

export function MessagesProvider({ children }) {
  const [messages, dispatch] = useReducer(reducer, initial)
  function addMessage(locationId, text) {
    dispatch({ type: 'ADD', locationId, text })
  }
  return <Ctx.Provider value={{ messages, addMessage }}>{children}</Ctx.Provider>
}

export function useMessages() {
  return useContext(Ctx)
}
