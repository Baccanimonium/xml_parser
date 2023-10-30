import React from 'react';
import PropTypes from 'prop-types';
import {PreviewItem, PreviewItemInfoLabel, RemoveButton} from "./style";
import Icon from "../../components_ocean/Components/Icon";
import FileIcon from "./Icons/FileIcon";
import Progressbar from "../ProgressBar";
import ReloadIcon from "./Icons/ReloadIcon";
import RemoveIcon from "../../components_ocean/Icons/removeIcon";
import SimpleBar from 'simplebar-react'
const baseF = () => () => null

const UploadedFiles = ({value, onReUpload = baseF, disabled, onDelete = baseF, title}) => {
  return (
    <SimpleBar className="flex-container">
      <div>{title}:</div>
      {value.map(({ value: name, progress, fail }, i, arr) => {
        return (
          <PreviewItem
            key={name}
            last={i === arr.length - 1}
            first={i === 0}
            uploading={progress > 0}
          >
            <Icon
              icon={FileIcon}
              size="30"
            />
            <div className="flex justify-between w-full overflow-hidden">
              <button
                className="flex items-center overflow-hidden ml-5 pr-5 w-full"
                type="button"
              >
                <PreviewItemInfoLabel
                  uploadFailes={fail}
                  title={name}
                >
                  {name}
                </PreviewItemInfoLabel>
                {fail && (<div className="fs-12 text-pink-600 ml-2 mx-auto">Загрузка не удалась!</div>)}
                {progress > 0 && (
                  <div className="flex items-center mt-1">
                    <span className="w-12">{progress}%</span>
                    <Progressbar
                      className="ml-2.5"
                      percentage={progress}
                    />
                  </div>
                )}
              </button>
              <div className="flex items-center">
                {fail && (
                  <Icon
                    icon={ReloadIcon}
                    className="mr-2.5 text-pink-600"
                    size="14"
                    onClick={onReUpload(i)}
                  />
                )}
                {!disabled && (
                  <RemoveButton
                    icon={RemoveIcon}
                    size="12"
                    onClick={onDelete(i)}
                  />
                )}
              </div>
            </div>
          </PreviewItem>
        )
      })}
    </SimpleBar>
  );
};

UploadedFiles.propTypes = {

};

export default UploadedFiles;