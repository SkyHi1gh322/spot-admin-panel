import {buildModal} from "../../wrappers/modal/ModalBuilder";
import {CreateAssetDrawer} from "./drawers/CreateAssetDrawer";
import {BaseBuilderProps} from "../../generalTypes";

export const createAssetDrawerCall =
    buildModal<undefined, BaseBuilderProps>((props, onClose) => <CreateAssetDrawer title={props.title} onClose={onClose} />)