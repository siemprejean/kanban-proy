'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, Card, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, CardHeader, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MuiModal from "../customcomponent/modal";
import MuiTable from "../customcomponent/table";
import MuiFormControl from "../customcomponent/formcontrol";
import MuiCheckList from "../customcomponent/checklist";
import { getBrand, getBrands, getStores } from "@/app/data/api";
import MuiDialog from "../customcomponent/dialog";
//import { DetailModal } from "./detailmodal";
//import DetailModal from "./detailmodal";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Brand() {
    const [open, setOpen, page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [detail, setDetail] = React.useState([]);
    const [getsstores, setStores] = React.useState([]);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openModalCreate = () => setModalCreateOpen(true);
    const closeModalCreate = () => setModalCreateOpen(false);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const columnsTable = [{ label: 'Fiscal Id', field: 'id' },
    { label: 'Nombre', field: 'name' },
    { label: 'No. Empleados', field: 'id_country' },
    { label: 'Marcas', field: 'brands', render: (row) => row.brands.join(', ') },
    { label: 'Pais', field: 'country' }];

    //Estilos
    const listStyles = {
        display: 'contents',
        margin: 1,
        flex: "auto",
        right: '10%',
        width: '75%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };

    const modalStyles = {
        position: 'absolute',
        margin: 1,
        flex: "auto",
        right: '10%',
        width: '75%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const brands = await getBrands();
                const stores = await getStores();

                // Asociar tiendas a marcas
                const dataWithStores = brands.map((brand) => ({
                    ...brand,
                    stores: stores.filter((store) => store.id_brand === brand.id),
                }));

                setData(dataWithStores);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchDetail = async (id) => {
        try {
            const brand = await getBrand(id);
            const storesd = await getStores();
            // Asociar tiendas a marca
            const brandWithstores = {
                ...brand,
                storesd: storesd.filter((store) => store.id_brand === brand.id),
            };

            setDetail(brandWithstores);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchStores = async () => {
        try {
            const storesd = await getStores();
            // Asociar tiendas a marca

            setStores(storesd);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const titledialog = (<>
    
        <h4 style={{ color:"black"}}><DeleteForeverIcon style={{ backgroundColor:"white", color:"#FF3D57"}}/> ELIMINAR TIENDA</h4>
        <Divider style={{ border: '1px solid', color:"#AAAAAA"}} />
      </>
      );
      const actions = (<>
        <Button style={{ backgroundColor:"#7E7E7E", color:"white", borderRadius: "20px", border: "outset"}} onClick={handleClose}>CANCELAR</Button>
        <Button style={{ backgroundColor:"#FF3D57", color:"white", borderRadius: "20px", border: "outset"}} onClick={handleClose}>ACEPTAR</Button>
      </>);
      const contentDialog = (
        <DialogContentText  style={{ color:"black"}}>
          ¿Esta seguro que desea eliminar esta tienda?
        </DialogContentText>);
    const modalCreate = (
        <div>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
                    <MuiFormControl title="Nombre de la Marca:" value={''} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <MuiCheckList title="Tiendas" items={getsstores} customStyles={listStyles} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={handleClose}>
                        <SaveIcon /> GUARDAR
                    </Button>
                </Col>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }} onClick={handleClose}>
                        <CancelIcon /> CANCELAR
                    </Button>
                </Col>
            </Row>
        </div>
    );
    const modalContent = (
        <div>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
                    <MuiFormControl title="Nombre de la Marca:" value={detail.name} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <MuiCheckList title="Tiendas" items={detail.storesd} customStyles={listStyles} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={handleClose}>
                        <SaveIcon /> GUARDAR
                    </Button>
                </Col>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }} onClick={handleClose}>
                        <CancelIcon /> CANCELAR
                    </Button>
                </Col>
            </Row>
        </div>
    );
    const body = (
        <>
            {data.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.id_country}</TableCell>
                    <TableCell align="center">
                        <Stack direction="row" spacing={1} alignItems="center" style={{ flexWrap: 'wrap' }} >
                            {row.stores.map((store) => (<Chip label={store.name} style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} size="small" variant="outlined" />))}
                        </Stack>
                    </TableCell>
                    <TableCell align="center">Panama</TableCell>
                    <TableCell align="center">
                        <Button style={{ backgroundColor: "#03386a", color:"HighlightText" }} onClick={() => { fetchDetail(row.id); openModal() }}><EditIcon /> </Button>
                        <MuiModal
                            open={isModalOpen}
                            onClose={closeModal}
                            title="EDITAR MARCA"
                            content={modalContent}
                            customStyles={modalStyles}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <React.Fragment>
                            <Button style={{ backgroundColor: "#FF3D57", color:"HighlightText" }} onClick={handleOpen}>
                                <DeleteOutlineIcon />
                            </Button>
                            <MuiDialog open={open} onClose={handleClose} title={titledialog} content={contentDialog} actions={actions} />
                        </React.Fragment>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
    return (
        <>
            <DashboardLayout className="justify-content-center">
                <Card className="align-items-center justify-content-center g-0 min-vh-100 ">
                    <div className='d-flex justify-content-between w-100 m-2'>
                        <div className="d-flex align-items-center">
                            <Link href="/">
                                <ArrowBackIcon size="18px" />
                            </Link>
                            <div className="ms-lg-3 d-none d-md-none d-lg-block">
                                {/* Search Form */}
                                <h3 style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                                    Configuración de Marca
                                </h3>
                            </div>
                        </div>
                    </div>
                    <Divider style={{ border: '1px solid' }} />
                    <CardContent className="p-6" style={{ justifyContent: 'center' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <Item>
                                        <FormControl variant="outlined" style={{ width: "100%" }}>
                                            <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} placeholder="Search" />
                                            <SearchIcon style={{ width: "15%", right: 0, position: "absolute", margin: "5px", padding: "1px" }} />
                                        </FormControl>
                                    </Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item >
                                        <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { fetchStores(); openModalCreate() }}>
                                            <AddIcon /> CREAR
                                        </Button>
                                        <MuiModal
                                            open={isModalCreateOpen}
                                            onClose={closeModalCreate}
                                            title="CREAR MARCA"
                                            content={modalCreate}
                                            customStyles={modalStyles}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>
                                        <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }}>
                                            <DownloadIcon /> IMPORTAR
                                        </Button>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>

                    </CardContent>
                    <div style={{ height: 400, width: '100%', align: 'center' }}>
                        <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.count} />
                    </div>
                </Card>
            </DashboardLayout >
        </>
    );
}