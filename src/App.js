import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./components/Account/Account";
import Expenses from "./components/Expenses/Expenses";
import Sidbare from "./components/SideBare/sidbare";
import { useNavigate } from "react-router-dom";
import AddExpense from "./components/AddExpenses/AddExpense";
import Statistics from "./components/Statistics/statistics";

// CommonJS
function App() {
  const Swal = require("sweetalert2");
  const [bdg, setbdg] = useState(0);
  const [name, setname] = useState("");
  const [cost, setcost] = useState("");
  const [date, setdate] = useState("");
  const [category, setcategory] = useState("car");
  const [expenses, setexpenses] = useState([]);
  const [rest, setrest] = useState(bdg);
  const [isactive, setisactive] = useState(false);
  const [datachart1, setdatachart1] = useState({
    labels: [
      "car",
      "clothing",
      "education",
      "Food and cuisine",
      "Health and hospitals",
      "other",
    ],
    datasets: [
      {
        fill: true,
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  const [datachart2, setdatachart2] = useState({
    labels: [
      "car",
      "clothing",
      "education",
      "Food and cuisine",
      "Health and hospitals",
      "other",
    ],
    datasets: [
      {
        fill: true,
        label: "Dataset 1",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      },
    ],
  });
  const [data, setdata] = useState([
    { name: "car", value: 0, prix: 0 },
    { name: "clothing", value: 0, prix: 0 },
    { name: "education", value: 0, prix: 0 },
    { name: "Food and cuisine", value: 0, prix: 0 },
    { name: "Health and hospitals", value: 0, prix: 0 },
    { name: "other", value: 0, prix: 0 },
  ]);
  let navigate = useNavigate();

  const gotoTry = () => {
    navigate("/AddExpense");
  };

  const converBudget = () => {
    if (bdg !== "" && Number(bdg) !== 0 && Number(bdg) >= 1500) {
      setisactive(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Budget has been Saved",
        showConfirmButton: false,
        timer: 1500,
      });
      gotoTry();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pleaze Enter A Valid Budget!",
      });
      setbdg(0);
    }
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "sucsses",
      cancelButton: "cancel",
    },
    buttonsStyling: false,
  });

  const saveExpense = (e) => {
    if (Number(rest) < cost) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your balance is insufficient!",
      });
    } else {
      setexpenses([
        ...expenses,
        { name: name, category: category, date: date, cost: cost },
      ]);
      setdata(
        data.map((item) =>
          item.name === category
            ? { ...item, prix: item.prix + Number(cost), value: item.value + 1 }
            : { ...item }
        )
      );
      setrest((rest) => rest - cost);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Expens has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const cancel = () => {
    setcost("");
    setdate("");
    setname("");
    setcategory("car");
  };

  useEffect(() => {
    setrest((rest) => bdg);
    setexpenses([]);
  }, [bdg]);
  useEffect(() => {
    setdatachart2({
      labels: data.map((item) => item.name),
      datasets: [
        {
          fill: true,
          label: "Total  Cost",
          data: data.map((item) => item.prix),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
    setdatachart1({
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "",
          data: data.map((item) => item.value),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    });
  }, [data]);
  const somcosts = () => {
    let som = 0;
    expenses.map((item) => (som = som + Number(item.cost)));
    return som;
  };

  const remove = (index, itm) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success",

            setexpenses((expenses) => expenses.filter((ex, i) => i !== index)),
            setdata((data) =>
              data.map((item) =>
                item.name === itm.category
                  ? {
                      ...item,
                      prix: item.prix - Number(itm.cost),
                      value: item.value - 1,
                    }
                  : { ...item }
              )
            ),
            setrest((rest) => rest + Number(itm.cost))
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const removebdg = () => {
    setbdg(0);
    setisactive(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Sidbare
              isactive={isactive}
              AddBudget={converBudget}
              bdg={bdg}
              Changebdj={(e) => setbdg((bdg) => e.target.value)}
            />
          }
        >
          <Route
            path="Account"
            element={
              <Account
                isactive={isactive}
                bdg={bdg}
                Changebdj={(e) => setbdg((bdg) => e.target.value)}
                AddBudget={converBudget}
                Total={somcosts()}
                nbexpenses={expenses.length}
                Rest={rest}
                removebdg={() => removebdg()}
              />
            }
          />
          <Route
            path="expenses"
            element={
              <Expenses
                isactive={isactive}
                expenses={expenses}
                remove={remove}
              />
            }
          />
          <Route
            path="statistics"
            element={
              <Statistics
                isactive={isactive}
                datac1={datachart1}
                datac2={datachart2}
              />
            }
          />
          <Route
            path="Addexpense"
            element={
              <AddExpense
                isactive={isactive}
                name={name}
                cost={cost}
                date={date}
                category={category}
                namechange={(e) => setname(e.target.value)}
                costchange={(e) => setcost(e.target.value)}
                datechange={(e) => setdate(e.target.value)}
                categorychange={(e) => setcategory(e.target.value)}
                save={(e) => saveExpense(e)}
                cancel={() => cancel()}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
