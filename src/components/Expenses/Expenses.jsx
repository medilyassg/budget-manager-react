import React, { useState } from 'react';
import Expens from '../Expense/Expense';
import styles from './Expenses.module.css'

function Expenses (props)  {
    const[category,setcategory]=useState("All")
    return (
        props.isactive ?
        <div className={styles.listzone}>
             <select name="category" value={category} onChange={(e)=>setcategory(e.target.value)} id="">
                        <option value="All">All</option>
                        <option value="car">Car</option>
                        <option value="clothing">clothing</option>
                        <option value="education">Education</option>
                        <option value="Food and cuisine">Food and cuisine</option>
                        <option value="Health and hospitals">Health and hospitals</option>
                        <option value="other">Others</option>
                </select>
             <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Cost</th>
                                    <th>category</th>
                                    <th>date</th>
                                    <th>action</th>
                                </tr>



                            </thead>
                            <tbody>
                                {   
                                  category==="All" ?
                                    props.expenses.map((item, index) =>
                                    <Expens key={index} expens={ item} remove={() => props.remove(index, item)} />)
                                    :
                                    props.expenses.map((itm, index) => {
                                         
                                        if(itm.category===category){
                                            return <Expens key={index} expens={itm } remove={() => props.remove(index, itm)} />

                                        }
                                         

                                    })

                                    
                                }
                            </tbody>
                        </table>
        </div>
        :""
    );
};

export default Expenses;