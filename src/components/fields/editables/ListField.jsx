import React, { Fragment, useEffect, useState } from 'react';
import styles from './ListField.module.css';
import stylesCommon from '../Common.module.css';
import { BiAddToQueue, BiSave, BiEditAlt} from 'react-icons/bi';
import ListItem from './ListItem';
import LabeledField from '../simple/LabeledField';
import Input from '../../UI/Input';

const ListField = ({label, defaultItems, onChange}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [items, setItems] = useState(defaultItems || []);
    const [value, setValue] = useState('');

    const deleteItem = (item) => {
        setItems(items.filter(i => i !== item));
    }

    const addItem = () => {
        if(value) {
            setItems([...items, value]);
            setValue('');
        }
    }

    const onSave = () => {
        setIsEditing(false);
        onChange(items);
    }

    useEffect(() => setItems(defaultItems || []),[defaultItems])

    console.log(defaultItems);
    console.log(items);
    return (
        <div className={styles.listBlock}>
            {
                isEditing 
                ?(
                    <Fragment>
                            <div className={styles.actionsContainer}>
                                <BiAddToQueue className={stylesCommon.actionButton} onClick={addItem}/>
                                <BiSave className={stylesCommon.actionButton} onClick={onSave}/>
                            </div>
                            <div className={styles.valueContainer}>
                                <Input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                                <div className={styles.itemsContainer}>
                                    {items.map((item, i) => {
                                        return <ListItem key={`${item}_${i}`} item={item} onDelete={deleteItem}/>
                                    })}
                                </div>
                            </div>
                        
                    </Fragment>
                    
                )
                : (
                    <Fragment>
                        <div className={styles.actionsContainer}>
                            <BiEditAlt className={stylesCommon.actionButton} onClick={() => setIsEditing(true)} />
                        </div>
                        <LabeledField className={styles.labeledField} label={label} type={'row'}>
                            {
                                items.join(", ")
                                /* items.length > 0
                                ? items.map(item => <spa key={item}>{item}</spa>)
                                : null */
                            }
                        </LabeledField>                        
                    </Fragment>
                )
            }
        </div>
    )
}

export default ListField