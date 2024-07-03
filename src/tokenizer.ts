import { ExternalTokenizer } from "@lezer/lr";
import { Ch, readWord } from "./tokenUtils";
import { Endpoint, Method, Identifier, ESIndex, Slash, Question, UrlParamQuestion, UrlParamKey, UrlParamEqual, UrlParamValue, UrlParamAnd } from "./syntax.grammar.terms";
import { methods } from './apiData/method'
import { endpoints } from './apiData/endpoints'
import { STATE_ENUM, esStatueInstance } from "./state";


export const tokenizer = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  const word = readWord(input)
  esStatueInstance.setState(stack.context)
  if (/[a-zA-Z_0-9]+/.test(word)) {
    const endpointsKey = Object.keys(endpoints)
    if (stack.context === STATE_ENUM.URL_PARAMS_KEY) {
      input.acceptToken(UrlParamKey)
    } else if (stack.context === STATE_ENUM.URL_PARAMS_VALUE) {
      input.acceptToken(UrlParamValue)
    } else if (methods.includes(word)) {
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
  } else if (next === Ch.Equal && stack.context === STATE_ENUM.URL_PARAMS_KEY) {
    input.advance();
    input.acceptToken(UrlParamEqual)
  } else if (next === Ch.And) {
    if ([STATE_ENUM.URL_PARAMS_KEY, STATE_ENUM.URL_PARAMS_VALUE].includes(stack.context)) {
      input.advance();
      input.acceptToken(UrlParamAnd)
    }
  }
  input.advance();
});

export function myTokens() {
  return tokenizer
}


export const tokens = myTokens()