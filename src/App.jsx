import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NoteList from "./components/notesList";
import Search from "./components/Search";
import Header from "./components/Header";
function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <>
      <div className={`${darkMode && "dark-mode"}`}>
        <div className="container">
          <Header handleDarkMode={setDarkMode} />
          <Search handleSearchNote={setSearchText} />
          <NoteList
            notes={notes.filter((note) =>
              note.text.toLowerCase().includes(searchText)
            )}
            handleAddNote={addNote}
            handleDeleteNotes={deleteNote}
          />
        </div>
      </div>
    </>
  );
}

export default App;
