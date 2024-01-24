import PropTypes from 'prop-types';

import { FormControl, Input } from '@mui/material';

const MuiFormControl = ({ title, value }) => {

    return (
        <FormControl variant="outlined" style={{ width: "100%" }}>
            <h5>{title}</h5>
            <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} value={value} />
        </FormControl>
    );
}
MuiFormControl.PropTypes={
    title: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
}
export default MuiFormControl;