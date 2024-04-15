import * as React from 'react';
import {FC} from "react";
import {Input} from "../utils/input/Input";
import {Button} from "../utils/button/Button";
import {Select} from "../utils/select/Select";
import styles from './AssetsCreator.module.sass';
import {useValidate} from "../../validation";
import {CreateAssetSchema, echangeList, tagList} from "./data";
import {FormItem} from "../utils/formItem/FormItem";
import {useDispatch} from "react-redux";
import {addAssetReducer} from "../../redux/assets/assetsSlice";
import {BaseBuilderCloseFn, BuilderFullProps} from "../../generalTypes";
import {setDefaultAction} from "../../redux/assets/assetsActions";



export const AssetCreator: FC<BaseBuilderCloseFn> = (props) => {
    const dispatch = useDispatch();
    const {fields, onChange, onSubmit, isValidForm, getBaseDto, onRefreshForm} = useValidate(CreateAssetSchema);
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(() => {
            if(isValidForm){
                console.log(fields)
                // console.log(fields)
                // dispatch(addAssetReducer(getBaseDto()));
                // onRefreshForm();
                // dispatch(setDefaultAction());
                // props.onClose();
            }
        })
    }
    return (
        <div className={styles.assetCreator}>
           <form onSubmit={submit}>
               <div className={styles.assetCreator__selectors}>
                       <FormItem errors={fields.name.errors} label={'Имя токена'} isRequired>
                           <Input placeholder={'Введите название токена'}
                                  error={fields.name.hasErrors}
                                  value={fields.name.value}
                                  onChange={(e) => onChange({name: e.target.value})}
                                  className={styles.assetCreator__block__field}/>
                       </FormItem>
                       <FormItem errors={fields.usdAmount.errors} label={'Сумма в USD'} isRequired>
                           <Input placeholder={'Введите сумму покупки'}
                                  className={styles.assetCreator__block__field}
                                  type={"number"}
                                  min={0}
                                  value={fields.usdAmount.value}
                                  error={fields.usdAmount.hasErrors}
                                  onChange={(e) => onChange({usdAmount: +e.target.value}) }
                           />
                       </FormItem>
                       <FormItem errors={fields.assetAmount.errors} label={'Количество токенов'} isRequired>
                           <Input className={styles.assetCreator__block__field}
                                  placeholder={'Введите количество токенов'}
                                  type={"number"}
                                  value={fields.assetAmount.value}
                                  error={fields.assetAmount.hasErrors}
                                  onChange={(e) => onChange({assetAmount: +e.target.value})}
                                  min={0}/>
                       </FormItem>
                       <FormItem label={'Название биржи'}>
                           <Select list={echangeList}
                                   value={fields.exchange.value}
                                   className={styles.assetCreator__block__field}
                                   placeholder={'Выберите биржу'}
                                   onClear={() => onChange({exchange: ""})}
                                   onSelect={(mapped) => {
                                       onChange({exchange: mapped.value})
                                   }}
                           />
                       </FormItem>
                       <FormItem label={'Ассоциативные тэги'} isRequired errors={fields.tags.errors}>
                           <Select list={tagList}
                                   className={styles.assetCreator__block__field}
                                   value={fields.tags.value}
                                   multiple={true}
                                   error={fields.tags.hasErrors}
                                   placeholder={'Выберите тэги'}
                                   onClear={() => onChange({tags: []})}
                                   onSelect={(mapped) => {
                                       onChange({tags: mapped.map(i => i.value)})
                                   }}
                           />
                       </FormItem>
               </div>
               <Button color={'main'} variant={'primary'} className={styles.assetCreator__createBtn} type={'submit'}>
                   Create asset
               </Button>
           </form>
        </div>
    )
}