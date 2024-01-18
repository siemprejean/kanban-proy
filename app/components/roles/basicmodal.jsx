import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { Card, CardContent, Checkbox, Divider, FormControl, Grid, IconButton, Input, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, OutlinedInput, Paper, styled } from '@mui/material';
import { Comment } from '@mui/icons-material';
import SimpleBar from 'simplebar-react';
import { Col, Row } from 'react-bootstrap';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <Button style={{ backgroundColor: "#03386a" }} onClick={handleOpen}><EditIcon /> </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    margin: 1,
                    flex: "auto",
                    right: '10%',
                    width: '75%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>

                    <Card>
                        <CardContent>
                            <SimpleBar style={{ maxHeight: '100vh' }}>
                                <h4 style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                                    EDITAR PERMISO
                                </h4>
                                <Divider style={{ border: 'double' }} />
                                <Row style={{ width: "100%" }}>
                                    <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
                                        <FormControl variant="outlined" style={{ width: "100%" }}>
                                            <h5>Nombre Corto</h5>
                                            <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} />
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{ width: "100%" }}>
                                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                                        <FormControl variant="outlined" style={{ width: "100%" }}>
                                            <h5>Descripción:</h5>
                                            <textarea name="postContent" rows={4} cols={40} style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} />
                                        </FormControl>
                                    </Col>
                                    
                                </Row>
                              
                                <Row style={{ width: "100%" }}>
                                    <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                                        <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }}>
                                            <SaveIcon /> GUARDAR
                                        </Button>
                                    </Col>
                                    <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                                        <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }}>
                                            <CancelIcon /> CANCELAR
                                        </Button>
                                    </Col>
                                </Row>
                            </SimpleBar>
                        </CardContent>
                        {/* 
                    <CardBody>

                    </CardBody>
                */}

                    </Card>

                </Box>
            </Modal>
        </div>
    );
}