import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './components/Account/Account';
import Expenses from './components/Expenses/Expenses';
import Sidbare from './components/SideBare/sidbare';
import ReactJsAlert from "reactjs-alert"
import { useNavigate } from "react-router-dom";
import AddExpense from './components/AddExpenses/AddExpense';
import Statistics from './components/Statistics/statistics';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



function App() {
  const [bdg,setbdg]=useState(0)
  const [alertstatus,setalertstatus]=useState(false)
  const [alerttype,setalerttype]=useState()
  const [alerttitle,setalerttitle]=useState()
  const [name,setname]=useState("")
  const [cost,setcost]=useState("")
  const [date,setdate]=useState("")
  const [category,setcategory]=useState("car")
  const [expenses,setexpenses]=useState([])
  const [rest,setrest]=useState(bdg)
  const [isactive,setisactive]=useState(false)
  const [datachart1,setdatachart1]=useState({
    labels: ["car", "clothing", "education", "Food and cuisine", "Health and hospitals", "other"],
                datasets: [
                    {
                        fill: true,
                        data: [],
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
  })
  const [datachart2,setdatachart2]=useState({
    labels: ["car", "clothing", "education", "Food and cuisine", "Health and hospitals", "other"],
                datasets: [
                    {
                        fill: true,
                        label: 'Dataset 1',
                        data: [],
                        backgroundColor: [

                        ],
                        borderColor: [

                        ],
                        borderWidth: 2,
                    }
                ]
  })
  const [data,setdata]=useState([  { name: "car", value: 0, prix: 0 },
  { name: "clothing", value: 0, prix: 0 },
  { name: "education", value: 0, prix: 0 },
  { name: "Food and cuisine", value: 0, prix: 0 },
  { name: "Health and hospitals", value: 0, prix: 0 },
  { name: "other", value: 0, prix: 0 }])
  let navigate = useNavigate();

    const gotoTry = () => {
      navigate("/AddExpense");
    };

  const converBudget =()=>{
    if (bdg!=="" && Number(bdg)!==0  && Number(bdg) >= 1500){
      setisactive(true)
      setalertstatus(true) 
      setalerttitle("successfull ")
      setalerttype("success")
      gotoTry()
    } 
    else{
      setisactive(false) 
      setalertstatus(true) 
      setalerttitle("Please enter a valid budget")
      setalerttype("error")
      setbdg(0)
    } 
  }
  const saveExpense=(e)=>{
    if (Number(rest )<cost){
      setalertstatus(true)
      setalerttitle("Your balance is insufficient")
      setalerttype("error")
    }
    else {
      setexpenses([...expenses, { name: name, category: category, date: date, cost: cost }] )
      setdata( data.map((item) => item.name === category ? { ...item, prix: item.prix + Number(cost), value: item.value + 1 } : { ...item }))
      setrest(rest=>rest-cost)
    }


}
const cancel =()=>{
    setcost("")
    setdate("")
    setname("")
    setcategory("car")
}

useEffect(()=>{
  setrest(rest=>bdg)
  setexpenses([])
  
},[bdg])
useEffect(()=>{
  setdatachart2(
     {
        labels: data.map((item) => item.name),
        datasets: [
            {
                fill: true,
                label: 'Total  Cost',
                data: data.map((item) => item.prix)
                ,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    })
    setdatachart1(
       {
          labels: data.map((item) => item.name),
          datasets: [
              {
                  label: '',
                  data: data.map((item) => item.value),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'

                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 2,
              }
          ]
      }
  )
},[data])
const somcosts=()=> {
  let som = 0
  expenses.map((item) => som = som + Number(item.cost))
  return som
}

const remove=(index, itm)=> {
  confirmAlert({
      title: 'Confirm to Delete',
      message: 'Do you want to delete it ? ',
      buttons: [
          {
              label: 'Yes',
              onClick: () => {
                  setexpenses( expenses=> expenses.filter((ex, i) => i !== index) )
                  setalertstatus(true)
                  setalerttitle("deleted successfully")
                  setalerttype("success")
                  setdata( data=> data.map((item) => item.name === itm.category ? { ...item, prix: item.prix - Number(itm.cost), value: item.value - 1 } : { ...item }) )
                  setrest(rest=>rest+Number(itm.cost))
              }


          },
          {
              label: 'No',
              onClick: () =>{
                setalertstatus(true)
                setalerttitle("operation failed")
                setalerttype("error")
              }

          }
      ]
  });
}
const removebdg=()=>{
  setbdg(0)
  setisactive(false)
}

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={< Sidbare isactive={isactive} AddBudget={converBudget} bdg={bdg} Changebdj={(e)=>setbdg(bdg=>e.target.value) }/>} >
        <Route path='Account' element={<Account  isactive={isactive} bdg={bdg} Changebdj={(e)=>setbdg(bdg=>e.target.value) } AddBudget={converBudget} Total={somcosts()} nbexpenses={expenses.length} Rest={rest} removebdg={()=>removebdg()}/>}  />
        <Route path='expenses' element={<Expenses isactive={isactive} expenses= {expenses} remove={remove}/>} />
        <Route path='statistics' element={<Statistics  isactive={isactive} datac1={datachart1} datac2={datachart2}/>} />
        <Route path='Addexpense' element={<AddExpense 
        isactive={isactive}
        name={name}
        cost={cost}
        date={date}
        category={category}
        namechange={(e) => setname(e.target.value)}
        costchange={(e) => setcost(e.target.value)}
        datechange={(e) => setdate(e.target.value)}
        categorychange={(e) => setcategory(e.target.value)}
        save={(e) =>saveExpense(e)}
        cancel={()=>cancel()}/>} />
        
                            

        </Route>
      </Routes>
      <ReactJsAlert
                    status={alertstatus}   // true or false
                    type={alerttype}   // success, warning, error, info
                    title={alerttitle}   // title you want to display
                    Close={() => setalertstatus(false)}   // callback method for hide
                />
    </div>
  );
}

export default App