import * as React from 'react';
import styles from './SettingsStyles.module.sass';
export const Settings = () => {
    return (
        <div className={styles.settings}>
            <div className={styles.settings__block}>
                <h1>
                    Visibility settings
                </h1>
                <div>
                    <div>
                        <h2>
                            Profile
                        </h2>
                        <div>
                            content
                        </div>
                    </div>
                    <div>
                        <h2>
                            Assets
                        </h2>
                        <div>
                            content
                        </div>
                    </div>
                    <div>
                        <h2>
                            Sidebar
                        </h2>
                        <div>
                            content
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}