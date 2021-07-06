import React from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helper'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import styles from './style'
import { withStyles } from '@material-ui/core'


class EditorComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            text:'',
            title:'',
            id:''
        }
    }

    updateBody = async (val)=>{
        await this.setState({text:val});
        this.update();
    }

    update=debounce(()=>{
        this.props.noteUpdate(this.state.id, {
            title:this.state.title,
            body:this.state.text
        })
    }, 1500);

    componentDidMount = ()=>{
        this.setState({
            text:this.props.selectedNote.body,
            title:this.props.selectedNote.title,
            id:this.props.selectedNote.id
        })
    }

    componentDidUpdate=()=>{
        if(this.props.selectedNote.id!==this.state.id){
            this.setState({
                text:this.props.selectedNote.body,
                title:this.props.selectedNote.title, 
                id:this.props.selectedNote.id
            })
        }
    }

    updateTitle = async(txt)=>{
        await this.setState({title:txt})
        this.update();
    }

    render(){

        const {classes} = this.props;

        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input className={classes.titleInput} placeholder='Note Title' value={this.state.title?this.state.title:''} onChange={(e)=>this.updateTitle(e.target.value)} />
                <ReactQuill value={this.state.text} onChange={this.updateBody}></ReactQuill>
            </div>
        )
    }
}

// styles is a function which gets executed when we export it an then the component withstyles will invoke another function (editorcomponent)
export default withStyles(styles)(EditorComponent);