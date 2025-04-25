import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  FormHelperText,
} from '@mui/material';

const MuiCheckList = ({
  className,
  title,
  items,
  preselectedItems,
  onNewSelectedItems,
  error,
  helperText
}) => {
  const [checked, setChecked] = React.useState(preselectedItems || []);

  useEffect(() => {
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
    onNewSelectedItems(newChecked);
  };

  return (
    <div className={className}>
      <h5>{title}</h5>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <List dense>
          {items && items.length > 0 ? (
            items.map((value) => {
              const labelId = `checkbox-list-label-${value.id}`;

              return (
                <ListItem key={value.id} disablePadding>
                  <ListItemButton dense onClick={handleToggle(value.id)}>
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
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </div>
    </div>
  );
};

export default MuiCheckList;
