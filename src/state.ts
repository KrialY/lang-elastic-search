export const STATE_ENUM = {
  METHOD: 1,
  PATH_START: 2.1, // esIndex, endpoint
  PATH_ENDPOINT: 2.2, // endpoint
  URL_PARAMS_KEY: 3.1,
  URL_PARAMS_VALUE: 3.2
}

class ESState {
  currentState: number
  constructor() {
    this.currentState = STATE_ENUM.METHOD
  }

  setState(state: number) {
    this.currentState = state
  }


}



export const esStatueInstance = new ESState()