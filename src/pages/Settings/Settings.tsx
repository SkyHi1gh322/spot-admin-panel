import * as React from 'react';
import styles from './SettingsStyles.module.sass';
import {Checkbox} from "../../components/utils/checkbox/Checkbox";
import {useSelector} from "../../redux/store";
import {useDispatch} from "react-redux";
import {SettingsI} from "./types";
import {Button} from "../../components/utils/button/Button";
import {updateFilters} from "../../redux/settings/settingsSlice";
import {useState} from "react";
export const Settings = () => {
    const settings = useSelector(state => state.settings);
    const [settingsDto, setSettingsDto] = useState<SettingsI>(settings);
    const dispatch = useDispatch();
    const wrapVisibilityProfileSettings = (patch: Partial<SettingsI['visibility']['profile']>) => {
        return {
            visibility: {
                ...settingsDto.visibility,
                profile: {
                    ...settingsDto.visibility.profile,
                    ...patch
                }
            }
        }
    };

    const wrapVisibilityAssetsSettings = (patch: Partial<SettingsI['visibility']['assets']>) => {
        return {
            visibility: {
                ...settingsDto.visibility,
                assets: {
                    ...settingsDto.visibility.assets,
                    ...patch
                }
            }
        }
    };

    const wrapVisibilitySidebarSettings = (patch: Partial<SettingsI['visibility']['sidebar']>) => {
        return {
            visibility: {
                ...settingsDto.visibility,
                sidebar: {
                    ...settingsDto.visibility.sidebar,
                    ...patch
                }
            }
        }
    };

    const onUpdateSettings = () => {
        dispatch(updateFilters(settingsDto))
    };

    return (
        <div className={styles.settings}>
            <div className={styles.settings__block}>
                <h1 className={styles.settings__block__title}>
                    Visibility settings
                </h1>
                <div className={styles.settings__block__content}>
                    <div>
                        <h2 className={styles.settings__block__content__title}>
                            Profile
                        </h2>
                        <div className={styles.settings__block__content__items}>
                            <Checkbox onChange={() => setSettingsDto(wrapVisibilityProfileSettings({showAccountInfo: !settingsDto.visibility.profile.showAccountInfo}))}
                                      label={'Show account info'}
                                      name={'accountInfo'}
                                      checked={settingsDto.visibility.profile.showAccountInfo}
                            />
                            <Checkbox onChange={() => setSettingsDto(wrapVisibilityProfileSettings({showPositionsDetails: !settingsDto.visibility.profile.showPositionsDetails}))}
                                      label={'Show positions details'}
                                      name={'positionDetails'}
                                      checked={settingsDto.visibility.profile.showPositionsDetails}
                            />
                            <Checkbox onChange={() => setSettingsDto(wrapVisibilityProfileSettings({showActivities: !settingsDto.visibility.profile.showActivities}))}
                                      label={'Show activities'}
                                      name={'activities'}
                                      checked={settingsDto.visibility.profile.showActivities}
                            />
                            <Checkbox onChange={() => setSettingsDto(wrapVisibilityProfileSettings({showSocials: !settingsDto.visibility.profile.showSocials}))}
                                      label={'Show socials'}
                                      name={'socials'}
                                      checked={settingsDto.visibility.profile.showSocials}/>
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.settings__block__content__title}>
                            Assets
                        </h2>
                        <div className={styles.settings__block__content__items}>
                            <Checkbox onChange={() => setSettingsDto(wrapVisibilityAssetsSettings({showAssets: !settingsDto.visibility.assets.showAssets}))}
                                      label={'Show assets (it will hide dashboard panel at all)'}
                                      name={'assets'} checked={settingsDto.visibility.assets.showAssets}/>
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.settings__block__content__title}>
                            Sidebar
                        </h2>
                        <div className={styles.settings__block__content__items}>
                            <Checkbox onChange={() => setSettingsDto(wrapVisibilitySidebarSettings({showFavouriteTraders: !settingsDto.visibility.sidebar.showFavouriteTraders}))}
                                      label={'Show favourite traders (only for you)'}
                                      name={'favourites'}
                                      checked={settingsDto.visibility.sidebar.showFavouriteTraders}/>
                        </div>
                    </div>
                </div>
            </div>
            <Button style={{marginTop: '16px'}} color={'main'} variant={'secondary'} onClick={onUpdateSettings}>
                Apply new settings
            </Button>
        </div>
    )
}