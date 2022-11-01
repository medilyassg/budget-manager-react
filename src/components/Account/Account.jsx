import React, { useState } from 'react';
import { BiEdit, BiSave } from 'react-icons/bi';
import { IoTrashBinOutline } from 'react-icons/io5';
import styles from './Account.module.css'


function Account(props) {
    const [disabled, setdisabled] = useState(true)
    return (
        props.isactive ?

            <div className={styles.acczone}>

                <div>
                    <h3>your budget   : <span >  {props.bdg} $</span> </h3> <button onClick={() => { setdisabled(false) }}> <BiEdit /> </button><button onClick={props.removebdg}><IoTrashBinOutline /></button>
                </div>
                <div>
                    <input type="number" name="budget" id="budget" value={props.bdg} onChange={props.Changebdj} placeholder="0000$" required disabled={disabled ? true : false} />
                    <button onClick={props.AddBudget} disabled={disabled ? true : false}> <BiSave /></button>
                </div>
                <div>
                    <h3>Rest</h3>
                    <h3 > <span >{props.Rest} $</span> </h3>
                </div>
                <div>
                    <h3>Total Costs</h3>
                    <h3 > <span >  {props.Total} $</span> </h3>
                </div>
                <div>
                    <h3>Number Expenses  </h3>
                    <h3 > <span >  {props.nbexpenses}</span> </h3>


                </div>
            </div>
            : ""

    );
};

export default Account;