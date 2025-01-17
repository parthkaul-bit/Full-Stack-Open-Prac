import { gql, useQuery } from "@apollo/client";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import { useState } from "react";
import PhoneForm from "./PhoneForm";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;
// const Persons = ({ persons }) => {
//   return (
//     <div>
//       <h2>Persons</h2>
//       {persons.map((p) => (
//         <div key={p.name}>
//           {p.name} {p.phone}
//         </div>
//       ))}
//     </div>
//   );
// };
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>something went wrong...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

export default App;
