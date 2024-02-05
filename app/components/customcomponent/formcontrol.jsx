import propTypes from 'prop-types';

import { FormControl, Input } from '@mui/material';

const MuiFormControl = ({ title, value, onChange, type }) => {
    console.log("Esto tiene onChange", onChange)
    return (
        <FormControl variant="outlined" style={{ width: "100%" }}>
            <h5>{title}</h5>
            <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} value={value} onChange={onChange} type={type} />
        </FormControl>

    );

}
MuiFormControl.propTypes = {
    title: propTypes.string.isRequired,
    value: propTypes.node.isRequired,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
}
export default MuiFormControl;