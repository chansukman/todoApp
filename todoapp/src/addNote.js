import  {useState,useEffect} from 'react'

const AddNote=(props)=>{

    const addClick = async () => {
        const data = new FormData();
        data.append("newNotes", props.newNotes);
    
        fetch(props.API_URL + "api/todoapp/AddNotes", {
          method: "POST",
          body: data
        })
          .then(res => res.json())
          .then(result => {
            alert(result);
            props.refreshNotes();
          });
      };


    return(
        <div>
            <input id='newNotes' value={props.newNotes} onChange={(e) => props.setNewNotes(e.target.value)}></input>
            <button onClick={addClick}>Add Notes</button>
        </div>
    );

}

export default AddNote;