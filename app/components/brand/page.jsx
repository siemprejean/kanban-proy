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
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MuiModal from "../customcomponent/modal";
import MuiTable from "../customcomponent/table";
import MuiTextField from "../customcomponent/formcontrol";
import MuiCheckList from "../customcomponent/checklist";
import { getBrand, getBrands, getCompanies, getStores, postBrand } from "@/app/data/api";
import MuiDialog from "../customcomponent/dialog";
import MuiSelect from "../customcomponent/Select";

export default function Brand() {
    const [open, setOpen, page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [detail, setDetail] = useState([]);
    const [getsstores, setStores] = useState([]);
    const [companyId, setCompanyID] = useState(0);
    const [brandName, setBrandName] = useState('');
    const [getsCompanies, setCompanies] = useState([]);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [preselectedItems, setPreselectedItems] = useState([]);
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
        event.preventDefault();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChange =
        (event) => {
            setBrandName(event.target.value);
            console.log("Esto tiene event.target.value: ", event.target.value)
        };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const companies = await getCompanies();
                const brands = await getBrands();
                const stores = await getStores();

                // Asociar tiendas a marcas
                const dataWithStores = brands.map((brand) => ({
                    ...brand,
                    stores: stores.filter((store) => store.id_brand === brand.id),
                }));
                setCompanies(companies);
                setData(dataWithStores);
                console.log("Esto tiene compañia", companies)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    async function onSubmit() {
        //event.preventDefault();
        try {
            console.log("Esto tiene responseData ", {
                name: brandName,
                slug: brandName,
                id_company: companyId,
            })
            // Llamar a la función en api/empresas.js para crear una nueva empresa
            let responseData = await postBrand({
                name: brandName,
                slug: brandName,
                id_company: companyId,
            });
            console.log("Esto tiene responseData ", responseData)
            // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
            console.log('Empresa creada exitosamente:', responseData);
        } catch (error) {
            // Manejar errores en caso de que la creación falleç
            console.error('Error al crear la marca:', error.message);
        }
    }
    async function updateBrand() {
        //event.preventDefault();
        try {
            console.log("Esto tiene responseData ", {
                name: brandName,
                slug: brandName,
                id_company: companyId,
            })
            // Llamar a la función en api/empresas.js para crear una nueva empresa
            let responseData = await postBrand({
                name: brandName,
                slug: brandName,
                id_company: companyId,
            });
            console.log("Esto tiene responseData ", responseData)
            // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
            console.log('Empresa creada exitosamente:', responseData);
        } catch (error) {
            // Manejar errores en caso de que la creación falleç
            console.error('Error al crear la marca:', error.message);
        }
    }
    const fetchDetail = async (id) => {
        try {
            const brand = await getBrand(id);
            const storesd = await getStores();
            // Asociar tiendas a marca
            const brandWithstores = {
                ...brand,
                storesd: storesd.filter((store) => store.id_brand === brand.id),
            };
            const preselectedStores = brandWithstores.storesd
                .filter((store) => store.id_brand === brand.id)
                .map((brand) => brand.id);
            setPreselectedItems(preselectedStores);
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

        <h4 style={{ color: "black" }}><DeleteForeverIcon style={{ backgroundColor: "white", color: "#FF3D57" }} /> ELIMINAR TIENDA</h4>
        <Divider style={{ border: '1px solid', color: "#AAAAAA" }} />
    </>
    );
    const actions = (<>
        <Button style={{ backgroundColor: "#7E7E7E", color: "white", borderRadius: "20px", border: "outset" }} onClick={handleClose}>CANCELAR</Button>
        <Button style={{ backgroundColor: "#FF3D57", color: "white", borderRadius: "20px", border: "outset" }} onClick={handleClose}>ACEPTAR</Button>
    </>);
    const contentDialog = (
        <DialogContentText style={{ color: "black" }}>
            ¿Esta seguro que desea eliminar esta tienda?
        </DialogContentText>);
    const modalCreate = (
        <div>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
                    <MuiTextField title="Nombre de la Marca:" value={brandName} onChange={handleChange} inputKey={'MuiTextField'} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <MuiSelect title="Empresa" items={getsCompanies} values={companyId} customStyles={listStyles} onChange={(event) => setCompanyID(event)} selectKey={'MuiSelect'} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { onSubmit(); closeModalCreate }}>
                        <SaveIcon /> GUARDAR
                    </Button>
                </Col>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }} onClick={closeModalCreate}>
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
                    <MuiTextField title="Nombre de la Marca:" value={detail.name} onChange={handleChange} inputKey={'MuiTextField'} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <MuiCheckList title="Tiendas" items={detail.storesd} customStyles={listStyles} preselectedItems={preselectedItems} />
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={updateBrand}>
                        <SaveIcon /> GUARDAR
                    </Button>
                </Col>
                <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }} onClick={closeModal}>
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
                        <Button style={{ backgroundColor: "#03386a", color: "HighlightText" }} onClick={() => { fetchDetail(row.id); openModal() }}><EditIcon /> </Button>
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
                            <Button style={{ backgroundColor: "#FF3D57", color: "HighlightText" }} onClick={handleOpen}>
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
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} placeholder="Search" />
                                        <SearchIcon style={{ width: "15%", right: 0, position: "absolute", margin: "5px", padding: "1px" }} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
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
                                </Grid>
                                <Grid item xs={2}>
                                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }}>
                                        <DownloadIcon /> IMPORTAR
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </CardContent>
                    {<div style={{ height: 400, width: '100%', align: 'center' }}>
                        <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.count} />
                    </div>}
                </Card>
            </DashboardLayout >
        </>
    );
}