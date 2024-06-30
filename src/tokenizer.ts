import { ExternalTokenizer } from "@lezer/lr";
import { readWord } from "./tokenUtils";
import { Endpoint, Method, Identifier, ESIndex, Slash, Question, UrlParamQuestion } from "./syntax.grammar.terms";
import { methods } from './tokens/method'
import { endpoints } from './tokens/endpoints'
import { STATE_ENUM, esStatueInstance } from "./state";


const enum Ch {
  Slash = 47,
  Question = 63
}

export const tokenizer = new ExternalTokenizer((input, stack) => {
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
    } else {
      if (stack.context === STATE_ENUM.PATH_START) {
        if (input.next === Ch.Slash) {
          input.acceptToken(ESIndex)
        }
      } else {
        input.acceptToken(Identifier)
      }
    }
  } else if (next === Ch.Slash) {
    input.advance();
    input.acceptToken(Slash)
  } else if (next === Ch.Question) {
    input.advance();
    if (stack.context === STATE_ENUM.PATH_ENDPOINT) {
      input.acceptToken(UrlParamQuestion)
    } else {
      input.acceptToken(Question)
    }
  }
  input.advance();
});

export function myTokens() {
  return tokenizer
}


export const tokens = myTokens()