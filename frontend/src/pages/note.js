import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'

export default function Note({ match, history }) {

    const noteId = match.params.id
    const [note, setNote] = useState(null)
    
    useEffect(() => {
        getNote()
    }, [noteId])

  const getNote = async () => {
    if (noteId === 'new') return
    
      let response = await fetch(`/api/notes/${noteId}/`)
      let data = await response.json()
      setNote(data)
  }
  
  const createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    })
  }

  const updateNote = async () => {
    await fetch(`/api/notes/${noteId}/update/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    })
  }

  console.log(note)

  
  let deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/delete/`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });
    history.push('/')
  }
  
  let handleSubmit = () => {
    if (noteId !== "new" && note.body === '') {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote(note);
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
    history.push('/')
  }

  

    return (
      <div className="note">
        <div className="note-header">
          <h3 className="">
            <ArrowLeft onClick={handleSubmit} />
          </h3>
          {noteId !== "new" ? (
            <button type="button" onClick={deleteNote}>
              Delete
            </button>
          ) : (
            <button type="button" onClick={handleSubmit}>
              Done
            </button>
          )}
        </div>
        <textarea
          value={note?.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
        ></textarea>
      </div>
    );
}
