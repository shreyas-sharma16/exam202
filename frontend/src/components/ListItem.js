import { Link } from "react-router-dom";

function getTitle(note) {
  const title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.splice(0, 45);
  }

  return title;
}

function getTime(ts) {
  return new Date(ts).toDateString();
}

function getContent(note) {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
}

export default function ListItem({ note }) {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getTime(note.updated)}</span>
          <span>{getContent(note)}</span>
        </p>
      </div>
    </Link>
  );
}
