import styled from "styled-components";
import Icon from '../../components_ocean/Components/Icon'

export const PreviewItem = styled.div`
  padding: 10px 8px;
  display: flex;
  justify-content: space-between;
  color: #BDBDBD;
  ${props => props.uploading && `
    background-color: #f3f3f3;
  `}
  ${props => props.first && `
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  `}
  ${props => props.last && `
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  `}
`

export const PreviewItemInfoLabel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.uploadFailes ? "#FF7979" : "unset"}
`

export const RemoveButton = styled(Icon)`
  display: flex;
  align-self: center;
  margin: 0.25rem 0.25rem 0.25rem auto;
  transition: color 250ms ease-in-out;
  &:hover {
    color: #333333;
  }
`

export const AttachFileIcon = styled(Icon)`
  color: var(--file-input-icon-color);
  transition: color 250ms ease-in-out;
  &:hover {
    --file-input-icon-color: #BFA764;
  }
  ${props => props.overflowedFiles !== undefined && `
    --file-input-icon-color: #BFA764;
  `}
`