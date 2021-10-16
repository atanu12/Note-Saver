const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) =>{

    // find the notes belong to the user
    const notes = await Note.find({ user: req.user._id});
    res.json(notes)
})

// create Note

const createNote = asyncHandler( async (req, res)=>{
    const {title, content, category} = req.body;
    if(!title || !content || !category ){
        res.status(400);
        throw new Error('Please fill all the feilds');
    }else{
        const note  = new Note({
            user:req.user._id,
            title,
            content,
            category,
        })
        const createNote = await note.save();
        res.status(201).json(createNote)
    }
})

// get notesbyid
const getNoteById = asyncHandler( async(req, res)=>{
    const note = await Note.findById(req.params.id);

    if(note){
        res.json(note)
    }else{
        res.status(404).json({message : 'Note not found'});
    }
})

// update note
const updateNotes = asyncHandler( async(req, res)=>{
    const {title, content, category} = req.body;

    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't update the note")
    }

    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        // save all the data to db
        const updatenote = await note.save();
        res.json(updatenote)
    }else{
        res.status(404);
        throw new Error('Note is not found')
    }
})

// delete Notes
const deleteNote = asyncHandler(async(req, res)=>{
    const note = await Note.findById(req.params.id);

    if(note.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action")
    }
    if(note){
        await note.remove();
        res.json({message: "Note is Removed"});
    }else{
        res.status(404);
        throw new Error("Note is not found!")
    }

})

module.exports = { getNotes, createNote,getNoteById,updateNotes,deleteNote}