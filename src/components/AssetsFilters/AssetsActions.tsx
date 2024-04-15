import * as React from 'react';
import {FC} from 'react';
import styles from './AssetsFiltersStyles.module.sass';
import {AssetModeEnum} from "../../pages/Assets/types";
import {Button} from "../utils/button/Button";
import {ReactComponent as PlusIcon} from '../../static/svg/plus.svg';
import {ReactComponent as SelectIcon} from '../../static/svg/folder-tree.svg';
import {ReactComponent as FiltersIcon} from '../../static/svg/filter.svg';
import {setCurrentAction, setDefaultAction} from "../../redux/assets/assetsActions";
import {deleteAssetsReducer} from "../../redux/assets/assetsSlice";
import {createAssetDrawerCall} from "../../pages/Assets/root";
import {useDispatch} from "react-redux";
import {useSelector} from "../../redux/store";
import clsx from 'clsx';

interface Props{
    assetsToRemove: string[],
    setAssetsToRemove: React.Dispatch<React.SetStateAction<string[]>>
}
export const AssetsActions: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const assets = useSelector((state) => state.assets.list);
    const assetsActions = useSelector(state => state.assetsActions);

    const onSelectAction = (type: AssetModeEnum) => {
        dispatch(type === assetsActions.currentAction ? setDefaultAction() : setCurrentAction(type))
    }

    const onDeselectAll = () => {
        props.setAssetsToRemove([]);
        dispatch(setDefaultAction());
    }

    const onDeleteAssets = () => {
        dispatch(deleteAssetsReducer(props.assetsToRemove));
        dispatch(setDefaultAction());
    }

    const onPressFilters = () => {
        onSelectAction(AssetModeEnum.FILTERS_MODE);
    }

    const onPressAddAsset = () => {
        onSelectAction(AssetModeEnum.ADD_ASSET_MODE);
        createAssetDrawerCall.showImmediately({title: 'Create new asset'})
    }

    const onPressSelectAssets = () => {
        onSelectAction(AssetModeEnum.SELECT_MODE);
    }

    const actionClass = (type: AssetModeEnum, isDisabled?: boolean) => {
        return clsx(styles.assets__filtersPanel__action, assetsActions.currentAction === type && styles[type.toLowerCase()], isDisabled && styles.assets__filtersPanel__actionDisabled)
    }

    return  <div className={styles.assets__filtersPanel}>
        <div className={styles.assets__filtersPanel__actions}>
            <div className={actionClass(AssetModeEnum.FILTERS_MODE, !assets.length)} onClick={onPressFilters}>
                <FiltersIcon/>
                <p>Фильтры</p>
            </div>
            <div className={actionClass(AssetModeEnum.ADD_ASSET_MODE)} onClick={onPressAddAsset}>
                <PlusIcon/>
                <p>Добавить ассет</p>
            </div>
            <div className={actionClass(AssetModeEnum.SELECT_MODE, !assets.length)} onClick={onPressSelectAssets}>
                <SelectIcon/>
                <p>Выбрать ассеты</p>
            </div>
        </div>
        {assetsActions.currentAction === AssetModeEnum.SELECT_MODE && <div className={styles.assets__filtersPanel__actionsWhenSelected}>
            <Button variant={'secondary'} color={'red'} onClick={onDeleteAssets}>
                Удалить ассеты
            </Button>
            <Button variant={'secondary'} color={'main'} onClick={onDeselectAll}>
                Отменить
            </Button>
        </div>}
    </div>
}