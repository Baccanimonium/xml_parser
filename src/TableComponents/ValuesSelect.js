import React, {useCallback, useContext} from 'react';
import Select from "../Components/Select";
import {SearchParametersContext} from "../constants";

const ValuesSelect = ({value, ParentValue: {id}}) => {
  const { values: { [id]: { searchValue } = {}}, change } = useContext(SearchParametersContext)
  return <Select
    options={value}
    labelKey="id"
    valueKey="id"
    id="searchValue"
    value={searchValue}
    onInput={useCallback((v, key) => change(v,key, id), [change, id])}
  />
};

export default ValuesSelect;