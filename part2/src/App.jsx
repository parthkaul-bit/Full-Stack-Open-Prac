// import Note from "./components/Note";

// // const promise2 = axios.get("http://localhost:3001/foobar");
// // console.log(promise2);
// const App = ({ notes }) => {
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {/* <li>{notes[0].content}</li>
//         <li>{notes[1].content}</li>
//         <li>{notes[2].content}</li> */}
//         <ul>
//           {notes.map((note) => (
//             <Note key={note.id} note={note} />
//           ))}
//         </ul>
//       </ul>
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };
  // useEffect(() => {
  //   console.log("effect");
  //   axios.get("http://localhost:3001/notes").then((response) => {
  //     console.log("promise fulfilled");
  //     setNotes(response.data);
  //   });
  // }, []);

  console.log("render", notes.length, "notes");

  return (
    <div>
      <h1>Notes</h1>
      {/* <Notification message={errorMessage} /> */}
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        <ul>
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => {
                toggleImportanceOf(note.id);
              }}
            />
          ))}
        </ul>
      </ul>
    </div>
  );
};
export default App;
