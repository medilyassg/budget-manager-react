import React from 'react';
import styles from './AddExpenses.module.css'
function AddExpense(props) {
    return (
        props.isactive ?
            <div className={styles.formzone}>
                <div>
                    <h1>add new expens</h1>
                </div>
                <form action="">
                    <div>
                        <input type="text" placeholder='name' name="name" value={props.name} onChange={props.namechange} />
                    </div>
                    <div>
                        <input type="number" name="cost" placeholder='cost' value={props.cost} onChange={props.costchange} />
                    </div>
                    <div>
                        <input type="date" name="date" placeholder='date' value={props.date} onChange={props.datechange} />
                    </div>
                    <div>
                        <select name="category" value={props.category} onChange={props.categorychange} id="">
                            <option value="car">Car</option>
                            <option value="clothing">clothing</option>
                            <option value="education">Education</option>
                            <option value="Food and cuisine">Food and cuisine</option>
                            <option value="Health and hospitals">Health and hospitals</option>
                            <option value="other">Others</option>
                        </select>
                    </div>

                </form>
                <div>
                    <button onClick={props.cancel}>Cancel</button>
                    <button onClick={props.save}>Save</button>
                </div>

            </div>
            : ""
    );
};

export default AddExpense;

