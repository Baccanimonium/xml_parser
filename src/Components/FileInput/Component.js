import PropTypes from 'prop-types'
import { useCallback } from 'react'
import ClipIcon from '../../components_ocean/Components/Inputs/FileInput/Icons/ClipIcon'
import { FileInputContainer, RejectedFilesModalWindow } from '../../components_ocean/Components/Inputs/FileInput/style'
import { FILE_INPUT_ERROR_EXTENSION, FILE_INPUT_ERROR_SIZE } from '../../components_ocean/Components/Inputs/FileInput'
import {AttachFileIcon} from "./style";
import UploadedFiles from "./UploadedFiles";
import {BlackButton} from "../Buttons";

const WrongFileExtension = ({ fileName, payload: { mimeTypes, positiveLock } }) =>
  `${fileName} файл имеет неправильное расширение. ${
    positiveLock ? 'Разрешенный' : 'Запрещенный'
  } список доступных расширений файлов: ${mimeTypes.join(', ')}`
const ExceedsFileSizeExtension = ({ fileName, payload }) =>
  `${fileName} превышает допустимый размер. Допустимый размер файла ${payload}`

const exceptionsMessagesMap = {
  [FILE_INPUT_ERROR_SIZE]: ExceedsFileSizeExtension,
  [FILE_INPUT_ERROR_EXTENSION]: WrongFileExtension,
}

const BaseFileInputComponent = ({ className, overflowedFiles, disabled, openFileInput, onDelete, onReUpload, rejectedFiles, setRejectedFiles, value }) => {
  const closeModalWindow = useCallback(() => setRejectedFiles([]), [setRejectedFiles])
  return (
    <div className={`${className} overflow-hidden flex-container`}>
      <FileInputContainer onClick={openFileInput} type="button" className="items-center">
        <AttachFileIcon icon={ClipIcon} className="mr-2" size={18}  overflowedFiles={overflowedFiles}/>
        <span>Или перетащите файлы сюда</span>
      </FileInputContainer>
      <div className="flex-container overflow-hidden">
        <UploadedFiles
          value={value}
          onReUpload={onReUpload}
          disabled={disabled}
          onDelete={onDelete}
          title="Загруженные файлы"
        />
      </div>
      <RejectedFilesModalWindow open={rejectedFiles.length > 0} className="text-center" onClose={closeModalWindow}>
        <h2 className="text-2xl mb-2">Следующие файлы не могут быть загружены</h2>
        <div className="mb-8">
          {rejectedFiles.map((error, i) => (
            <div key={i}>{exceptionsMessagesMap[error.message](error)}</div>
          ))}
        </div>
        <BlackButton className="mx-auto mt-auto mb-2" onClick={closeModalWindow} type="button">
          Закрыть сообщение
        </BlackButton>
      </RejectedFilesModalWindow>
    </div>
  )
}

BaseFileInputComponent.propTypes = {
  openFileInput: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReUpload: PropTypes.func.isRequired,
  rejectedFiles: PropTypes.array,
  setRejectedFiles: PropTypes.func.isRequired,
  value: PropTypes.array,
}

BaseFileInputComponent.defaultProps = {
  value: [],
  rejectedFiles: [],
}

export default BaseFileInputComponent
