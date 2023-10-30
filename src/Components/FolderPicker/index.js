import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import PureDeleteItems from "../../components_ocean/Utils/Arrays/PureDeleteItems";
import UploadedFiles from "../FileInput/UploadedFiles";
import {BlackButton} from "../Buttons";

const FolderPicker = ({ value, onInput, id, disabled, className, allowedMIMETypes }) => {
  const openPickerValue = useCallback(async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker()
      const files = [];
      const filesNames = [];
      const q = [directoryHandle]
      for (let h of q) {
        for await(let [name, handle] of h) {
          if (handle.kind === 'directory') {
            q.push(handle);
          } else if (!allowedMIMETypes || allowedMIMETypes.some((type) => {
            const dividedName = name.split('.')
            return dividedName[dividedName.length - 1] === type
          })) {

            filesNames.push(name);
            files.push(handle.getFile());
          }
        }
      }

      onInput((await Promise.all(files)).map((fileData, i) => ({ value: filesNames[i], fileData})), id)
    } catch (e) {
      console.log(e)
    }
  }, [allowedMIMETypes, id, onInput])

  const onDelete = useCallback((index) => () => {
    onInput(PureDeleteItems(value, index), id)
  }, [id, onInput, value])

  return (
    <div className={`flex-container overflow-hidden ${className}`}>
      <BlackButton className="mr-auto" onClick={openPickerValue}>Выбрать директорию</BlackButton>
      <div className="flex-container overflow-hidden">
        <UploadedFiles value={value} disabled={disabled} onDelete={onDelete} title="Найденные файлы"/>
      </div>
    </div>
  );
};

FolderPicker.propTypes = {
  
};

export default FolderPicker;