import styled from "styled-components";
import BaseModalWindow from "./components_ocean/Components/ModalWindow";
export const AppContainer = styled.div`
  padding: 10vh 5vh;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-column-gap: 5vh;
  height: 100%;
  overflow: hidden;
`

export const ButtonContainer = styled.div`
  grid-column: 1 / -1;
`

export const ModalWindow = styled(BaseModalWindow)`
  margin: 15vh 10vh;
  width: 100%;
  height: 100%;
  background-color: white;
`

export const ModalWindowContainer = styled.div`
  display: grid; 
  grid-template-columns: 5fr 3fr;
  grid-column-gap: 1vh;
  overflow: hidden;
`