import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { LineContainer, ProgressLine } from "./styles"

const Progressbar = React.forwardRef(({ children, percentage, customStyles }, ref) => {
  const getElementStyles = useMemo(
    () => customStyles || { width: `${percentage}${typeof percentage === "string" && percentage.indexOf("%") >= 0 ? "" : "%"}` },
    [percentage, customStyles],
  )
  return (
    <LineContainer className="relative rounded" ref={ref}>
      <ProgressLine style={getElementStyles} />
      {children}
    </LineContainer>
  )
})

Progressbar.propTypes = {
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customStyles: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

Progressbar.defaultProps = {
  percentage: "0"
}

export default Progressbar
