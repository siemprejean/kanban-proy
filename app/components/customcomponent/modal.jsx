import React from 'react';
import { Modal, Box, Button, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Backdrop from '@mui/material/Backdrop';
//import { propTypes } from 'react-bootstrap/esm/Image';
const MuiModal = React.memo(({ open, onClose, title, content, customStyles }) => {
  console.log("Esto tiene open", open);
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={() => console.log('El modal ha perdido el foco')}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ ...customStyles }}>

        <h4 style={{ fontWeight: "bold" }} id="modal-title" variant="h6" component="h2">{title}</h4>
        <Divider style={{ border: '1px solid' }} />
        <div id="modal-description">
          <Form>
            {content}
          </Form>
        </div>
      </Box>
    </Modal>
  );
});

MuiModal.props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  customStyles: PropTypes.object,
};

export default MuiModal;