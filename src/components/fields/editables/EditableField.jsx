import React, { useState } from 'react';
import {BiSave, BiEditAlt } from 'react-icons/bi';
import stylesCommon from '../Common.module.css';
import { IconContext } from 'react-icons';

const EditableField = ({children, editComponent}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
      <div>
          <IconContext.Provider value={{color: "#3b5998",size: "18px"}}>
              {
                  !isEditing
                  ? (
                      <div className={stylesCommon.fieldContainer}>
                        <BiEditAlt className={stylesCommon.actionButton} onClick={() => setIsEditing(true)} />
                        {children}
                      </div>
                  )
                  : (
                      <div className={stylesCommon.fieldContainer}>
                        <BiSave className={stylesCommon.actionButton}  onClick={() => setIsEditing(false)} />
                        {editComponent}
                      </div>
                  )
              }
          </IconContext.Provider>
          
      </div>
    )

}


export default EditableField