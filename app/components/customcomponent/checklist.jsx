import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  IconButton,
  ListItemText,
} from '@mui/material';
import Comment from '@mui/icons-material/Comment';

const MuiCheckList = ({ customStyles, title, items, preselectedItems }) => {
  const [checked, setChecked] = React.useState(preselectedItems || []);
  console.log("Esto tiene Checked ", preselectedItems)
  React.useEffect(() => {
    // Establecer los elementos preseleccionados cuando cambien
    setChecked(preselectedItems || []);
  }, [preselectedItems]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log("Esto tiene newChecked ", newChecked)
  };
  console.log("Esto tiene items: ", items)
  return (
    <List sx={{ ...customStyles }}>
      <h3>{title}</h3>
      {items && items.length > 0 ? (
        items.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Comment />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton onClick={handleToggle(value.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })
      ) : (
        <p>No hay elementos para mostrar.</p>
      )}
    </List>
  );
};

/*MuiCheckList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  customStyles: PropTypes.object,
  preselectedItems: PropTypes.array,
};*/

export default MuiCheckList;