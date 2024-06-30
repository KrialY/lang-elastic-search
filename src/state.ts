export const STATE_ENUM = {
  METHOD: 1,
  PATH_START: 2.1, // esIndex, endpoint
  PATH_ENDPOINT: 2.2, // endpoint
  URL_PARAMS: 3
}

class ESState {
  currentState: number
  stack: Array<number> = [STATE_ENUM.METHOD]
  constructor() {
    this.currentState = STATE_ENUM.METHOD
  }

  setState(state: number) {
    this.currentState = state
    this.updateStack(state)
  }

  updateStack(state: number) {
    if (this.stack.includes(state)) {
      this.stack = [state]
    } else {
      this.stack.push(state)
    }
  }
}



export const esStatueInstance = new ESState()