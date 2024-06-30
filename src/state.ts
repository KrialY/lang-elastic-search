export const STATE_ENUM = {
  METHOD: 1,
  PATH_START: 2.1,
  PATH_ENDPOINT: 2.2,
  URL_PARAMS: 3
}

class ESState {
  currentState
  constructor() {
    this.currentState = STATE_ENUM.METHOD
  }

  setState(state: any) {
    this.currentState = state
  }
}



export const esStatueInstance = new ESState()