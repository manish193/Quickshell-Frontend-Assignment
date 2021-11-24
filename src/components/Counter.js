import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { GET_URL, PUT_URL, MAX_VAL, MIN_VAL } from "../constants/Constants";
import Loader from "./Loader";
export default function Counter() {
  const [counterValue, setCounter] = useState();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    axios.get(GET_URL).then((res) => {
      let value = res.data;
      if (value === null) {
        setCounter(1);
      } else {
        value = Math.max(MIN_VAL, value);
        value = Math.min(MAX_VAL, value);

        setCounter(value);
      }
    });
  }, [counterValue]);
  async function setValue(delta) {
    let value = Math.max(delta, 1);
    value = Math.max(MIN_VAL, value);
    value = Math.min(MAX_VAL, value);
    setloader(true);
    await axios.put(PUT_URL, { counter1: value });
    setloader(false);

    setCounter(value);
  }
  async function onChnage(e){
    let value = Math.max(e.target.value, 1);
    value = Math.max(MIN_VAL, value);
    value = Math.min(MAX_VAL, value);
    setloader(true);
    await axios.put(PUT_URL, { counter1: value });
    setloader(false);

    setCounter(value);
  }
  return (
    <div className="board">
      <div className="container">
        <div className="loader">{loader === true ? <Loader /> : null}</div>
        <div className="buttons">
          <button
            className="minusCounter"
            onClick={() => setValue(counterValue - 1)}
          >
            {" "}
            -{" "}
          </button>
          <input className="value" onChange={onChnage} value={counterValue || 1}/>
          <button
            className="plusCounter"
            onClick={() => setValue(counterValue + 1)}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div className="text">Counter Value : {counterValue}</div>
      </div>
    </div>
  );
}
