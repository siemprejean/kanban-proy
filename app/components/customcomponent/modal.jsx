import React from 'react';
import { Modal, Box, Button, Divider }  from '@mui/material';
import PropTypes from 'prop-types';
//import { propTypes } from 'react-bootstrap/esm/Image';
const MuiModal = ({ open, onClose, title, content, customStyles }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...customStyles }}>
          <h4 style={{ fontWeight: "bold" }} id="modal-title" variant="h6" component="h2">{title}</h4>
          <Divider style={{ border: '1px solid' }} />
          <div id="modal-description">
            {content}
          </div>
        </Box>
      </Modal>
    );
  };
  
  MuiModal.PropTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    customStyles: PropTypes.object,
  };
  
  export default MuiModal;