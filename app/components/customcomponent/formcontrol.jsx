import PropTypes from 'prop-types';

import { FormControl, Input } from '@mui/material';

const MuiFormControl = ({ title, inputRef, type }) => {
console.log("Esto tiene inputRef", inputRef)
    return (
        <FormControl variant="outlined" style={{ width: "100%" }}>
            <h5>{title}</h5>
            <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} ref={inputRef} type={type}/>
        </FormControl>
    );
}
MuiFormControl.PropTypes={
    title: PropTypes.string.isRequired,
    inputRef: PropTypes.string.isRequired,
    type:PropTypes.string.isRequired
}
export default MuiFormControl;