import { AiOutlineHome } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { GoListOrdered } from 'react-icons/go';
import { RiPlayListAddLine } from 'react-icons/ri';
import { Link, Outlet } from "react-router-dom";
import img from "./homepage-banner-animation.gif"
import Expop from '../PopUp/popuptest';
import { slide as Menu, } from 'react-burger-menu'
import "./sidbare.css"

function Sidbare(props) {

  return (
    <div className='header'>
      <Menu >
        <Link to="/" className="menu-item" >
          <AiOutlineHome style={{ margin: "10px", fontSize: "25px" }} />
          Home
        </Link>

        <Link to="Account" className="menu-item" >
          <VscAccount style={{ margin: "10px", fontSize: "25px" }} />
          account
        </Link>
        <Link to="statistics" className="menu-item" >
          <FaRegChartBar style={{ margin: "10px", fontSize: "25px" }} />
          statistics
        </Link>
        <Link to="Expenses" className="menu-item" >
          <GoListOrdered style={{ margin: "10px", fontSize: "25px" }} />
          Expenses
        </Link>
        <Link to="AddExpense" className="menu-item" >
          <RiPlayListAddLine style={{ margin: "10px", fontSize: "25px" }} />
          add Expens
        </Link>

      </Menu>
      {
        !props.isactive ?
          <div className="getstartedzone">
            <h1> Welcome To The  <span>Budget Manager </span></h1>
            <div className='descriptionzone'>
              <p>Budget Manager - the #1 financial planning, review, expense tracking, and personal asset management!

                Budget Manager makes managing personal finances  as easy as pie! Now easily record your personal and business financial transactions, generate spending reports, review your daily, weekly and monthly financial data and manage your assets with Money Manager's spending tracker and budget planner.</p>
              <img src={img} alt="" />
            </div>
            <Expop budget={props.bdg} change={props.Changebdj} save={props.AddBudget} />


          </div>
          : ""
      }

      <Outlet />

    </div>
  );
};
export default Sidbare