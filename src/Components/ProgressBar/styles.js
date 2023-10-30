import styled from "styled-components"

export const LineContainer = styled.div`
  --rail-height: 4px;
  --active-color: #BFA764;
  height: var(--rail-height);
  width: 173px;
  background: #e5e5e5;
`
export const ProgressLine = styled.div`
  transition: width 250ms ease-in-out;
  height: var(--rail-height);
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--active-color);
`
