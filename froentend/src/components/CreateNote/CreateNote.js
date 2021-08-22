import { FormControl, makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  create_note_main_wrapper: {
    margin: "40px 40px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
  },
  notesField: {
    width: "60%",
  },
}));
const CreateNote = () => {
  const classes = useStyles();
  return (
    <div className={classes.create_note_main_wrapper}>
      <FormControl>
        <TextField
          className={classes.notesField}
          label="Outlined"
          variant="outlined"
        />
      </FormControl>
    </div>
  );
};

export default CreateNote;
