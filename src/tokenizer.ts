import { ExternalTokenizer } from "@lezer/lr";
import { readWord } from "./tokenUtils";
import { Endpoint, Method, Identifier } from "./syntax.grammar.terms";
import { methods } from './tokens/method'
import { endpoints } from './tokens/endpoints'
import { esStatueInstance, STATE_ENUM } from "./state";


export const kevinTokenizer = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  const word = readWord(input)
  esStatueInstance.setState(stack.context)
  if (/[a-zA-Z_0-9]+/.test(word)) {
    const endpointsKey = Object.keys(endpoints)
    if (methods.includes(word)) {
      input.acceptToken(Method)
      console.log(word, stack, 'method')
    } else if (endpointsKey.includes(word)) {
      input.acceptToken(Endpoint)
      console.log(word, 'endpoint')
    } else {
      input.acceptToken(Identifier)
    }
  }
  input.advance();
});

export function myTokens() {
  return kevinTokenizer
}


export const tokens = myTokens()