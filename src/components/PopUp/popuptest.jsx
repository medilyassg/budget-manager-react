import { useEffect, useState } from "react";
import styles from './popup.module.css'
const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className={styles.popup}
    >
      <div>
        <div>
          <span onClick={closeHandler}>
            &times;
          </span>
        </div>

        <div className={styles.children}>{props.children}</div>
      </div>
    </div>
  );
};




export default function Expop(props) {
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = () => {
    setVisibility(false);
  };

  return (
    <>
      <button onClick={() => setVisibility(true)}>Get Started →</button>
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
      >
        <h2>Enter your budget<br></br> <span>* Budget greater than  1500 *</span></h2>
        <input type="number" name="budget" value={props.budget} onChange={props.change} placeholder="00000$" />
        <button onClick={props.save}>save</button>
      </CustomPopup>
    </>
  );
}
