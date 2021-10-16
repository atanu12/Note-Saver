const mongoos = require('mongoose');

const notesSchema = mongoos.Schema({
    title:{
        type: String, 
        required : true,
    },
    content:{
        type: String, 
        required : true,
    },
    category:{
        type: String, 
        required : true,
    },
    user:{
        type: mongoos.Schema.Types.ObjectId, 
        required : true,
        ref: "User"
    },
},{
    timestamps: true,
});

const Note = mongoos.model("Note", notesSchema);
module.exports = Note