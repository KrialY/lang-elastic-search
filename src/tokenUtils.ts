import { syntaxTree } from "@codemirror/language"
import { EditorState } from "@codemirror/state"
import { InputStream } from "@lezer/lr"

export const enum Ch {
  Newline = 10,
  Space = 32,
  DoubleQuote = 34,
  Hash = 35,
  Dollar = 36,
  And = 38,
  SingleQuote = 39,
  ParenL = 40, ParenR = 41,
  Star = 42,
  Plus = 43,
  Comma = 44,
  Dash = 45,
  Dot = 46,
  Slash = 47,
  Colon = 58,
  Semi = 59,
  Equal = 61,
  Question = 63,
  At = 64,
  BracketL = 91, BracketR = 93,
  Backslash = 92,
  Underscore = 95,
  Backtick = 96,
  BraceL = 123, BraceR = 125,

  A = 65, a = 97,
  B = 66, b = 98,
  E = 69, e = 101,
  F = 70, f = 102,
  N = 78, n = 110,
  Q = 81, q = 113,
  X = 88, x = 120,
  Z = 90, z = 122,

  _0 = 48, _1 = 49, _9 = 57,
}

export function peekWord(input: InputStream) {
  let result = ""
  for (let i = 0; ; i++) {
    const c = input.peek(i)
    if (!isWord(c)) break
    if (result != null) result += String.fromCharCode(c)
  }
  return result
}

export function readWord(input: InputStream) {
  let result = ""
  for (; ;) {
    if (input.next != Ch.Underscore && !isAlpha(input.next)) break
    if (result != null) result += String.fromCharCode(input.next)
    input.advance()
  }
  return result
}

function isWord(ch: number) {
  return ch === Ch.Underscore || ch >= Ch.A && ch <= Ch.Z || ch >= Ch.a && ch <= Ch.z || ch >= Ch._0 && ch <= Ch._9
}

function isAlpha(ch: number) {
  return ch >= Ch.A && ch <= Ch.Z || ch >= Ch.a && ch <= Ch.z || ch >= Ch._0 && ch <= Ch._9
}

export function getTokensBeforePosition(state: EditorState, position: number) {
  const tree = syntaxTree(state);

  let tokens: any = [];
  tree.iterate({
    from: 0,
    to: position,
    enter: (node) => {
      const { type, to, from } = node
      const content = state.sliceDoc(from, to)
      if (to <= position) {
        tokens.push({ type: type.name, from, to, content });
      }
    }
  });
  return tokens;
}