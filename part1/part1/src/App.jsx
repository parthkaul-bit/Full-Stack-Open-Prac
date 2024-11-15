// const App = () => {
//   const now = new Date();
//   const a = 10;
//   const b = 20;
//   console.log(now, a + b);

//   return (
//     <div>
//       <p>Hello world, it is {now.toString()}</p>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>
//     </div>
//   );
// };

// import React from "react";

// const App = () => {
//   const now = new Date();
//   const a = 10;
//   const b = 20;
//   return React.createElement(
//     "div",
//     null,
//     React.createElement("p", null, "Hello world, it is ", now.toString()),
//     React.createElement("p", null, a, " plus ", b, " is ", a + b)
//   );
// };

// const Hello = () => {
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello />
//       <Hello />
//       <Hello />
//       <Hello />
//     </div>
//   );
// };

// const Hello = (props) => {
//   const bornYear = () => {
//     const yearNow = new Date().getFullYear();
//     return yearNow - props.age;
//   };

//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   );
// };

// const App = () => {
//   const name = "Peter";
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   );
// };
import { useState } from "react";
// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0,
//   });
//   const handleLeftClick = () => {
//     const newClicks = {
//       left: clicks.left + 1,
//       right: clicks.right,
//     };
//     setClicks(newClicks);
//   };

//   const handleRightClick = () => {
//     const newClicks = {
//       left: clicks.left,
//       right: clicks.right + 1,
//     };
//     setClicks(newClicks);
//   };
//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   );
// };
const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
    setTotal(left + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
    setTotal(left + right);
  };
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  );
  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}

      <p>{allClicks.join(" ")}</p>
      <p>total {total}</p>
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
