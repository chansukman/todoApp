const TodoListDisplay = (props)=>{
    const deleteClick = (id) => {
        fetch(props.API_URL + "api/todoapp/DeleteNotes?id=" + id, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(result => {
            alert(result);
            props.refreshNotes();
          });
      };

    return(
        <div>
        {props.notes.map(note =>
        <p key={note.id}>
          <b>{note.description}</b>
          <button onClick={() => deleteClick(note.id)}>Delete Notes</button>
        </p>
      )}
        </div>
    );
}
export default TodoListDisplay;