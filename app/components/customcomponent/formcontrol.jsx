import PropTypes from 'prop-types';

import { FormControl, Input, TextField } from '@mui/material';
import { useCallback } from 'react';

const MuiTextField = ({ title, value, onChange, inputKey, defaultValue }) => {
    console.log("Esto tiene onChange", onChange)
    return (
        <FormControl variant="outlined" style={{ width: "100%" }} >
            <h5>{title}</h5>
            <TextField
                style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }}
                defaultValue={defaultValue}
                value={value}
                id={inputKey}
                onChange={onChange}
                onBlur={() => console.log('El campo ha perdido el foco')}
                onFocus={() => console.log('El campo ha obtenido el foco')}
                htmlFor="uncontrolled-native"
            />
        </FormControl>

    );

}
/*MuiTextField.PropTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
}*/
export default MuiTextField;