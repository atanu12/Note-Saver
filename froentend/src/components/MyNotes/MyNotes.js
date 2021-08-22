import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainScreen from '../MainScreen/MainScreen'
import './mynotes.css'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme)=>({
    acodian:{
        marginTop:'2rem',
        background:"#f5f5f5",
        // color:'#ffffff',
    },
    arc_details:{
        background:"#eeeeee"
    }
}))


const MyNotes = () => {
    const classes = useStyles();

    const [notes, setNotes] = useState([])

    // Delete Note Function
    const deleteHandler =(id)=>{
        if(window.confirm("Are You Sure ?")){

        }
    }
// Material UI Collapse
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    //   fetching The data from Backend

    const fetchNotes = async()=>{
        const { data } = await axios.get('/api/notes');
        setNotes(data);
    }

      useEffect(()=>{
        fetchNotes()
      },[])
    return (
        <MainScreen title='Welcome Back Atanu Mondal'>
           <div className="createNotes">
              <Link to="/createnote">
              <Button variant="contained" color="primary">
                   Create Notes
               </Button>
              </Link>
           </div>
            {
                notes.map(note=>(
                    <div className="my_notes" style={{marginTop:'2rem'}}>
               <Accordion className={classes.acodian}
               expanded={expanded === `${note._id}`} onChange={handleChange(`${note._id}`)}>
                   <AccordionSummary>
                      <div className="arc_head_main">
                          <div className="arc_head_title">
                          <Typography>{note.title}</Typography>
                          </div>
                          <div className="arc_action_btn">
                          <Button variant="contained" className="edit_btn" href={`/note/${note._id}`}>Edit</Button>
                       <Button variant="contained" color="secondary" onClick={()=> deleteHandler(note._id)} >Delete</Button>
                          </div>
                      </div>
                   </AccordionSummary>
                   <AccordionDetails className={classes.arc_details}>
                       <Typography>
                       <p><Chip color="primary" label={`Category - ${note.category}`}/></p>
                        <p>{note.content}</p>
                           
                       <p className='notes_footer' > Created on --date</p>
                       </Typography>
                   </AccordionDetails>
               </Accordion>
           </div>  
                ))
            }
        </MainScreen>
    )
}

export default MyNotes
