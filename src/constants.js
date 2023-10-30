import React from "react";

export const DATE_FORMAT_WITH_TIME_STAMP = 'DD.MM.YYYY HH:mm:ss'
export const DATE_FORMAT_DEFAULT = 'DD.MM.YYYY'

export const SearchParametersContext = React.createContext({
  values: {},
  change: () => null,
})


export const COMPARE_FUNCTION_ID_EQ = 1
export const COMPARE_FUNCTION_ID_GREATER = 2
export const COMPARE_FUNCTION_ID_LESS = 3
export const COMPARE_FUNCTION_ID_GREATER_OR_EQ = 4
export const COMPARE_FUNCTION_ID_LESS_OR_EQ = 5
export const COMPARE_FUNCTION_ID_NOT_EQ = 6
export const COMPARE_FUNCTION_TEXT_CONTAIN = 8

export const compareFunctions = {
  [COMPARE_FUNCTION_ID_EQ]: (v, sv) => v === sv,
  [COMPARE_FUNCTION_ID_GREATER]: (v, sv) => v > sv,
  [COMPARE_FUNCTION_ID_LESS]: (v, sv) => v < sv,
  [COMPARE_FUNCTION_ID_GREATER_OR_EQ]: (v, sv) => v >= sv,
  [COMPARE_FUNCTION_ID_LESS_OR_EQ]: (v, sv) => v <= sv,
  [COMPARE_FUNCTION_ID_NOT_EQ]: (v, sv) => v !== sv,
  [COMPARE_FUNCTION_TEXT_CONTAIN]: (v, sv) => v !== String(sv).indexOf(String(v)),
}

export const numericAndDateOperators = [
  {
    id: COMPARE_FUNCTION_ID_EQ,
    title: "="
  },
  {
    id: COMPARE_FUNCTION_ID_GREATER,
    title: ">"
  },
  {
    id: COMPARE_FUNCTION_ID_LESS,
    title: "<"
  },
  {
    id: COMPARE_FUNCTION_ID_GREATER_OR_EQ,
    title: ">="
  },
  {
    id: COMPARE_FUNCTION_ID_LESS_OR_EQ,
    title: "<="
  },
  {
    id: COMPARE_FUNCTION_ID_NOT_EQ,
    title: "≠"
  },
]

export const textOperators = [
  {
    id: COMPARE_FUNCTION_ID_EQ,
    title: "Совпадает"
  },
  {
    id: COMPARE_FUNCTION_TEXT_CONTAIN,
    title: "Содержит"
  },
]

export const TitlesByOperator = {
  [COMPARE_FUNCTION_ID_EQ]: "=",
  [COMPARE_FUNCTION_ID_GREATER]: ">",
  [COMPARE_FUNCTION_ID_LESS]: "<",
  [COMPARE_FUNCTION_ID_GREATER_OR_EQ]: ">=",
  [COMPARE_FUNCTION_ID_LESS_OR_EQ]: "<=",
  [COMPARE_FUNCTION_ID_NOT_EQ]: "≠",
  [COMPARE_FUNCTION_TEXT_CONTAIN]: "Содержит",
}