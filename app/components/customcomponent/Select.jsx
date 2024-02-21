import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import PropTypes from 'prop-types';
import { useCallback } from "react";
const MuiSelect = ({ title, items, values, onChange, selectKey, className }) => {
    console.log("Esto tiene values: ", values)
    console.log("Esto tiene onChange: ", onChange)
    console.log("Esto tiene items: ", items)
    const handleChange = useCallback(
        (event) => {
          onChange(event.target.value);
          console.log("Esto tiene event.target.value: ", event.target.value)
        },
        [onChange]
      );
    return (
        <FormControl fullWidth onChange={handleChange} className={className}>
            <h5 variant="standard" htmlFor="uncontrolled-native">
                {title}
            </h5>
            <NativeSelect
                value={values}
                key={selectKey}
                onBlur={() => console.log('El campo ha perdido el foco')}
                onFocus={() => console.log('El campo ha obtenido el foco')}
                inputProps={{
                    name: 'name',
                    id: 'uncontrolled-native',
                }}
            >
                {
                    items.map((value) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                    ))}
            </NativeSelect>
        </FormControl>
    );
}
/*MuiSelect.PropTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    values: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
};*/
export default MuiSelect;