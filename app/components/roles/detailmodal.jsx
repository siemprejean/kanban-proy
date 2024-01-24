import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, IconButton, Input, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, OutlinedInput, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { Col, Row } from "react-bootstrap";
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import SimpleBar from "simplebar-react";
import TextField from '@mui/material/TextField';


export function DetailModal() {
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
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
            <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={handleOpen}>
                <AddIcon /> CREAR
            </Button>
            <Modal resposive
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    margin: 1,
                    flex: "auto",
                    right: '20%',
                    maxWidth:'960px',
                    minWidth:'600px',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  
                    
                }}>

                    <Card
                    sx={{
                        
                        overflow:'scroll',
                        maxHeight:'100%',
                        
                    }}>
                        <CardContent>
                            <SimpleBar style={{ maxHeight: '100vh' }}>
                                <h4 style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                                    EDITAR ROL
                                </h4>
                                <Divider style={{ border: 'double' }} />
                                <Row style={{ width: "100%" }}>
                                    <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
                                        <FormControl variant="outlined" style={{ width: "100%" }}>
                                            <h5>Nombre del Rol:</h5>
                                            <TextField id="outlined-basic" label="" variant="outlined" />
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{ width: "100%" }}>
                                    <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                                        <FormControl variant="outlined" style={{ width: "100%" }}>
                                            <h5>Descripción:</h5>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label=""
                                                multiline
                                                maxRows={4}
                                            />
                                        </FormControl>
                                    </Col>

                                </Row>
                                <Row style={{ width: "100%" }}>
                                    <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                                    <h5>Permisos</h5>
                                        <List sx={{ width: '50%', maxWidth: '100%', bgcolor: 'ghostwhite', border: 'inset', padding: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                                           
                                            {[0, 1, 2, 3].map((value) => {
                                                const labelId = `checkbox-list-label-${value}`;

                                                return (
                                                    <ListItem
                                                        key={value}
                                                        secondaryAction={
                                                            <IconButton edge="end" aria-label="comments">
                                                            </IconButton>
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                            <ListItemIcon>
                                                                <Checkbox
                                                                    edge="start"
                                                                    //checked={checked.indexOf(value) !== -1}
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText id={labelId} primary={`Permiso ${value + 1}`} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
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