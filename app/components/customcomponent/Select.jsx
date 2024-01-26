import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import PropTypes from 'prop-types';
const MuiSelect = ({ title, items, selectRef }) => {
    console.log("Esto tiene countriesitems: ", items)
    return (
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                {title}
            </InputLabel>
            <NativeSelect
                ref={selectRef}
                inputProps={{
                    name: 'name',
                    id: 'uncontrolled-native',
                }}
            >
                {
                    items.map((value) => (
                        <option value={value.id}>{value.name}</option>
                    ))}
            </NativeSelect>
        </FormControl>
    );
}
MuiSelect.PropTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};
export default MuiSelect;