import React from 'react';
import { Modal, Box, Button, Divider }  from '@mui/material';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';
//import { propTypes } from 'react-bootstrap/esm/Image';
const MuiModal = React.memo(({ open, onClose, title, content, customStyles }) => {
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
            <Form>
            {content}
            </Form>
          </div>
        </Box>
      </Modal>
    );
  });
  
  MuiModal.propTypes = {
    open: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    content: propTypes.node.isRequired,
    customStyles: propTypes.object,
  };
  
  export default MuiModal;