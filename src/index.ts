import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"
import { tokens, myTokens } from "./tokenizer"
import { customTags } from "./tags"
import { esCompletion } from "./completion"
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
        UrlParamKey: t.keyword,
        UrlParamValue: t.string,
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
