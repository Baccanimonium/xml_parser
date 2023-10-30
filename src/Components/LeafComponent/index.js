import BaseLeaf from "../../components_ocean/Components/Tree/Leaf";
import Icon from "../../components_ocean/Components/Icon";
import clipboard from "./ClipboardIcon";

const LeafComponent = ({className, ...props}) => {
  return <div className={`${className} flex items-baseline`}>
    <BaseLeaf {...props} LeafComponent={BaseLeaf}/>
    <button
      onClick={async () => await navigator.clipboard.writeText(props.options.title)}
      title="скопировать название документа в буфер обмена"
    >
      <Icon icon={clipboard}/>
    </button>
  </div>
}

export default LeafComponent