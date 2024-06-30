import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"
import { tokens, myTokens } from "./tokenizer"
import { customTags } from "./tags"
import { esCompletion } from "./completion"
import { ContextTracker } from "@lezer/lr"
import { esStatueInstance, STATE_ENUM } from "./state"
import { readWord } from "./tokenUtils"
import { Identifier } from "./syntax.grammar.terms"
import contextTracker from "./contextTracker"

export const ESLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false })
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        Endpoint: customTags.Endpoint,
        Method: customTags.Method,
        "( )": t.paren
      })
    ],
    tokenizers: [{ from: tokens, to: myTokens() }],
    contextTracker
  }),
  languageData: {
    commentTokens: { line: ";" }
  }
})

export function EXAMPLE() {
  return new LanguageSupport(ESLanguage, [esCompletion(ESLanguage)])
}

export { customTags }
