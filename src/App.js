import FileInput from "./Components/FileInput";
import dayjs from "dayjs";
import fxparser from "fast-xml-parser"
import {AppContainer, ButtonContainer, ModalWindow, ModalWindowContainer} from "./style";
import {useCallback, useEffect, useMemo, useState} from "react";
import ListTable from "./components_ocean/Components/Tables/ListTable";
import {FlatSelect} from "./components_ocean/Components/Tables/Plugins/selectable";
import CheckBox from "./components_ocean/Components/Inputs/CheckBox";
import ValuesSelect from "./TableComponents/ValuesSelect";
import OperatorSelect from "./TableComponents/OperatorSelect";
import {
  COMPARE_FUNCTION_ID_EQ,
  compareFunctions,
  DATE_FORMAT_WITH_TIME_STAMP,
  SearchParametersContext,
  TitlesByOperator
} from "./constants";
import FolderPicker from "./Components/FolderPicker";
import {BlackButton, GoldButton, GrayButton} from "./Components/Buttons";
import Tree from "./components_ocean/Components/Tree";
import SimpleBar from 'simplebar-react'
import downloadFile from "./Utils/DownloadFile";
import LeafComponent from "./Components/LeafComponent";
import clipboard from "./Components/LeafComponent/ClipboardIcon";
import Icon from "./components_ocean/Components/Icon";

const parser = new fxparser.XMLParser();

const readFile = async (f) => await Promise.all(f.map(f => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve({file: parser.parse(reader.result), value: f.value})
    }
    reader.readAsText(f.fileData)
  })
))

const excludedKeys = ['div', 'br', 'rect', 'td','script', 'xsl:attribute', 'input', 'a', 'xsl:text', '?xml', '?xml-stylesheet', 'xsl:output', 'xsl:template', 'xsl:apply-templates', 'xsl:value-of', 'xsl:variable']

function getObject(theObject) {
  const q = Array.isArray(theObject) ? theObject.map((v, i) => [i, v]) : Object.entries(theObject)
  const res = {}
  const addKey = (k, v) => {
    if (!excludedKeys.includes(k)) {
      if (!res[k]) {
        res[k] = []
      }
      res[k].push(v)
    }
  }
  for (const [k, item] of q) {
    if (typeof item === "string") {
      addKey(k, item)
    } else if (item instanceof Array) {
      item.forEach(o => {
        if (o instanceof Object) {
          q.push(...Object.entries(o))
        } else {
          addKey(k, o)
        }
      })
    } else if (item instanceof Object) {
      q.push(...Object.entries(item));
    } else {
      addKey(k, item)
    }
  }
  return res;
}

const columns = [
  {
    id: 'id',
    label: 'Тип',
    style: {marginRight: '1rem'},
    sizes: 200
  },
  {
    id: 'deepOptions',
    label: 'Тип',
    component: ValuesSelect,
    style: {marginRight: '1rem'},
    sizes: 300
  },
  {
    id: 'operators',
    label: 'Тип',
    component: OperatorSelect,
    sizes: 150
  }
]

const tableCheckBoxStyles = {margin: 'auto 0', paddingLeft: '1rem'}

const plugins = {
  selectPlugin: {
    driver: FlatSelect,
    component: (props) => <CheckBox {...props} style={tableCheckBoxStyles}/>,
    valueKey: 'id',
  },
}

const allowedMIMETypes = ['xml']
function App() {
  const [files, setFiles] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const [searchParameters, setSearchParameters] = useState({})
  const [compareWindowState, setCompareWindowState] = useState([])
  const [renderCompareWindow, setRenderCompareWindowState] = useState(false)

  const opt = useMemo(() => Object.entries(getObject(files)).reduce((acc, [key, val]) => {
    acc.push({id: key, deepOptions: val.map(id => ({id: id || "Нет значения"}))})
    return acc
  }, []), [files])

  useEffect(() => {
    setSearchParameters({})
  }, [files])

  const openCompareModalWindow = useCallback(async () => {
    const xmlData = await Promise.all((await readFile(searchedFiles)).map(getObject))
    const ResultObject = {}
    const addProperty = (value, propertyKey, documentName) => {
      if (!ResultObject[documentName]) {
        ResultObject[documentName] = []
      }
      ResultObject[documentName].push({title: propertyKey, children: value.map(v => ({title: v}))})
    }

    selectedProperties.forEach(property => {
      const {operator = COMPARE_FUNCTION_ID_EQ, searchValue} = searchParameters[property] || {}
      if (searchValue) {
        xmlData.forEach((file, i) => {
          if (file[property]) {
            const res = file[property].reduce((acc, sv) => {
              if (compareFunctions[operator](searchValue, sv)) {
                acc.push(sv)
              }
              return acc
            }, [])
            if (res.length > 0) {
              addProperty(res, property, searchedFiles[i].value)
            }
          }
        })
      } else {
        xmlData.forEach((file, i) => {
          if (file[property]) {
            addProperty(file[property], property, searchedFiles[i].value)
          }
        })
      }
    })
    setCompareWindowState(Object
      .entries(ResultObject)
      .map(([key, v]) => ({
        title: key,
        children: v
      }))
    )
    setRenderCompareWindowState(true)
  }, [searchParameters, searchedFiles, selectedProperties])

  const closeCompareModalWindow = useCallback(() => {
    setRenderCompareWindowState(false)
    setCompareWindowState([])
  }, [])

  const generateCSVFile = useCallback(async () => {
    const ResultObject = {}
    const xmlData = await Promise.all((await readFile(searchedFiles)).map(getObject))
    const addProperty = (value = [], propertyKey, documentName) => {
      if (!ResultObject[documentName]) {
        ResultObject[documentName] = []
      }
      ResultObject[documentName].push({title: propertyKey, children: value })
    }
    selectedProperties.forEach(property => {
      xmlData.forEach((file, i) => {
        if (file[property]) {
          addProperty(file[property], property, searchedFiles[i].value)
        }
      })
    })

    downloadFile({ data: new Blob([`fileName,propertyName,values,\n ${Object.entries(ResultObject)
      .map(([key, value]) => value
        .map(({ title, children}) => `${key},${title},${children.map(v => String(v).replaceAll('\n', '')).join(",")}`)
        .join(",\n"))
      .join(",\n")}`], { type : 'plain/text' }), name: `export_${dayjs().format(DATE_FORMAT_WITH_TIME_STAMP)}.csv`})

  }, [searchedFiles, selectedProperties])

  return (
    <AppContainer>
      <div className="flex-container overflow-hidden">
        <FileInput
          className="max-h-50_percent mb-1"
          value={files}
          uploadFunction={readFile}
          onInput={setFiles}
          id="files"
          allowedMIMETypes={allowedMIMETypes}
          multiple
        />
        <FolderPicker
          allowedMIMETypes={allowedMIMETypes}
          className="max-h-50_percent mt-1"
          onInput={setSearchedFiles}
          value={searchedFiles}
          id="searchedFiles"
        />
      </div>
      <SearchParametersContext.Provider value={useMemo(() => ({
        values: searchParameters,
        change: (v, key, rowId) => setSearchParameters((p) => ({...p, [rowId]: {...p[rowId], [key]: v}}))
      }), [searchParameters])}>
        <ListTable
          plugins={plugins}
          columns={columns}
          value={opt}
          className="flex-container"
          selectState={selectedProperties}
          onSelect={setSelectedProperties}
        />
      </SearchParametersContext.Provider>
      <ButtonContainer className="flex items-center justify-center mt-5">
        <GrayButton className="mr-2.5" onClick={generateCSVFile}>Экспортировать значения в CSV</GrayButton>
        <GoldButton className="ml-2.5" onClick={openCompareModalWindow}>Сравнить XML</GoldButton>
      </ButtonContainer>
      <ModalWindow onClose={closeCompareModalWindow} open={renderCompareWindow}>

        <div className="flex-container overflow-hidden">
          <ModalWindowContainer className="h-full">
            {compareWindowState.length > 0 ? (<div className="flex-container overflow-hidden">
                <h2 className="text-3xl">Найденные совпадения</h2>
                <SimpleBar className="flex-container ">
                  <Tree
                    defaultExpandAll
                    options={compareWindowState}
                    LeafComponent={LeafComponent}
                    onInput={v => null}
                  />
                </SimpleBar>
              </div>)
              : <div className="flex-container overflow-hidden">
                <h2 className="text-3xl">Найденные совпадения</h2>
                <div className="m-auto text-xl text-slate-950	">Попробуйте изменить условия поиска</div>
              </div>
            }
            <div>
              <h2 className="text-3xl">Условия поиска</h2>
              <div>
                {selectedProperties.map(property => {
                  const {operator = COMPARE_FUNCTION_ID_EQ, searchValue} = searchParameters[property] || {}
                  return <div className="mb-3">
                    <div>
                      <span className="text-lg font-bold mr-2.5">Тэг:</span>
                      {property}
                    </div>
                    {searchValue
                      ? <div>
                        <div><span className="text-lg font-bold mr-2.5">Условие:</span>{TitlesByOperator[operator]}</div>
                        <div><span className="text-lg font-bold mr-2.5">Значение:</span> {searchValue}</div>
                      </div>
                      : <div>
                        <span className="text-lg font-bold mr-2.5">Условие:</span> Все значения
                      </div>}
                  </div>
                })}
              </div>
            </div>
          </ModalWindowContainer>
          <div className="mt-auto flex">
            <GrayButton
              className="flex items-center ml-auto mr-5"
              title="скопировать названия документов в буфер"
              onClick={async () => await navigator.clipboard.writeText(searchedFiles.map(({ value}) =>value).join(","))}
            >
              <Icon icon={clipboard} className="mr-2.5"/>В буфер</GrayButton>
            <BlackButton onClick={closeCompareModalWindow}>Закрыть</BlackButton>
          </div>
        </div>
      </ModalWindow>
    </AppContainer>
  );
}

export default App;
