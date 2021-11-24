import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { GET_URL, PUT_URL } from "../constants/URLs";
import Loader from "./Loader";
export default function Counter() {
  const [counterValue, setCounter] = useState();
  const [loader, setloader] = useState(false);
  

  useEffect(() => {
    axios.get(GET_URL).then((res) => {
      const value = res.data;
      if (value == null) {
        setCounter(1);
      } else {
        setCounter(value);
      }
    });
  }, [counterValue]);
  async function setValue(delta) {
    const value =  Math.max(delta, 1);
    setloader(true);
    await axios.put(PUT_URL, { counter1: value })
    setloader(false);

    setCounter(value);
  }
  return (
    <div className="board">
       {loader === true ? <Loader/> : null}
      <div className="buttons">
        <button active= {(!loader).toString()} className="minusCounter" onClick={() => setValue(counterValue-1)}> - </button>
        < button className="value">{counterValue}</button>
        <button active= {(!loader).toString()} className="plusCounter" onClick={() => setValue(counterValue+1)}> + </button>
      </div>
    </div>
  );
}
