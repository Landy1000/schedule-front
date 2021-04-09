import React from 'react';
import TextFeild from "@material-ui/core/TextField";

const TextInput = (props) => {
  return (
    <TextFeild
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput



