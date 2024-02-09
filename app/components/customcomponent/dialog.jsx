import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MuiDialog = ({ open, onClose, title, content, actions, className}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            className={className}
        >
            <DialogTitle className="modal-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions className="modal-dialog-btn">
                {actions}
            </DialogActions>
        </Dialog>
    );
};
/*MuiDialog.PropTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    actions: PropTypes.node.isRequired,
    customStyles: PropTypes.object,
};*/

export default MuiDialog;