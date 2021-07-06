import React from 'react'
import './App.css';
import firebase from 'firebase'
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      selectedNoteIndex:null,
      selectedNote:null,
      //array of all the notes we will be grabbing all the notes from firebase setting and filling all in notes
      notes:null
    };
  }

  //when the app component is loaded successfully inside the dom this function will be called
  componentDidMount=()=>{
    //onsnapshot gets automatically called whenever the notes collection gets updated inside firebase
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate=>{ 
       //our notes  
        const notes = serverUpdate.docs.map(_doc=>{
          //grabbing  the data
          const data = _doc.data(); 
          data['id'] = _doc.id;
          return data;
        });
        this.setState({notes:notes})
      });

  }

  selectNote = (note, index)  =>{
    this.setState({selectedNoteIndex:index, selectedNote:note})
  }

  newNote = async(title)=>{
    const note = { 
      title:title,
      body:''
    }
    const newFromDB= await firebase.firestore()
                                    .collection('notes')
                                    .add({
                                      title:note.title,
                                      body:note.body,
                                      timestamp:firebase.firestore.FieldValue.serverTimestamp()
                                    })
    const newId = newFromDB.id;
    await this.setState({
      notes:[...this.state.notes, note]
    })
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note=>_note.id===newId)[0])
    this.setState({selectedNote:this.state.notes[newNoteIndex], selectedNoteIndex:newNoteIndex});
  }

  //adding new note to firebase
  noteUpdate=(id,noteobj)=>{
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title:noteobj.title,
        body:noteobj.body,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
  }


  deleteNote =async (note)=>{
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes:this.state.notes.filter(_note=>_note!==note)})
    if(this.state.selectedNoteIndex === noteIndex){ 
     this.setState({selectedNoteIndex:null, selectedNote:null});
    }else{
      this.state.notes.length>1?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex-1], this.state.selectedNoteIndex-1):
      this.setState({selectedNoteIndex:null, selectedNote:null})
    }

    firebase.firestore()
            .collection('notes')
            .doc(note.id)
            .delete();
  }  

  render(){
    return (
      <div className='app-container'>
          <SidebarComponent deleteNote={this.deleteNote} selectNote={this.selectNote} newNote={this.newNote} selectedNoteIndex={this.state.selectedNoteIndex} notes={this.state.notes}  ></SidebarComponent> 
          {
            this.state.selectedNote ?
            <EditorComponent noteUpdate={this.noteUpdate} selectedNote={this.state.selectedNote} selectedNoteIndex={this.state.selectedNoteIndex} notes={this.state.notes}></EditorComponent>
          : null
          }
    </div>
    )
  }

}
export default App;
