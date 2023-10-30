import styled from "styled-components";
import BaseButton from "../components_ocean/Components/Button";

export const GrayButton = styled(BaseButton)`
  background: #f3f3f3;
  color: #BDBDBD;
  &:not(:disabled):active, &:not(:disabled):focus {
    background: #BFA764;
    color: #fff;
  }
`

export const GoldButton = styled(BaseButton)`
  background: #BFA764;
  color: #fff;
  &:not(:disabled):active, &:not(:disabled):focus {
    background: #a18946;
  }
  &:not(:disabled):hover {
    box-shadow: 0px 4px 4px rgba(161, 137, 69, 0.49);
  }
`

export const BlackButton = styled(BaseButton)`
  background: #333333;
  color: #fff;
  &:not(:disabled):active, &:not(:disabled):focus {
    background: #000;
  }
  &:not(:disabled):hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`
