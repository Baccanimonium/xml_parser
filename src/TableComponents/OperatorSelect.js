import React, {useCallback, useContext, useMemo} from 'react';
import Select from "../Components/Select";
import dayjs from "dayjs";
import {
  DATE_FORMAT_WITH_TIME_STAMP,
  DATE_FORMAT_DEFAULT,
  SearchParametersContext,
  COMPARE_FUNCTION_ID_EQ,
  numericAndDateOperators,
  textOperators
} from '../constants'



const OperatorSelect = ({ParentValue: {deepOptions, id}}) => {
  // предоставляем варианты сравнения в случаях
  const notTextOperator = useMemo(() => deepOptions.every(({id}) => {
    if (typeof id === 'number') {
      // если все числа
      return true
      // или все даты
    } else if (id.length === DATE_FORMAT_DEFAULT.length) {
      return dayjs(id, DATE_FORMAT_DEFAULT).isValid()
    } else if (id.length === DATE_FORMAT_WITH_TIME_STAMP.length) {
      return dayjs(id, DATE_FORMAT_WITH_TIME_STAMP).isValid()
    } else {
      // Иначе не даем выбора. По умолчанию сравнение оператором =
      return false
    }
  }), [deepOptions])
  
  const { values: { [id]: { operator = COMPARE_FUNCTION_ID_EQ, searchValue } = {}}, change } = useContext(SearchParametersContext)

  return <Select
    id="operator"
    value={operator}
    options={notTextOperator ? numericAndDateOperators : textOperators}
    labelKey="title"
    valueKey="id"
    onInput={useCallback((v, key) => change(v,key, id), [change, id])}
    clearable={false}
  />
};

export default OperatorSelect;