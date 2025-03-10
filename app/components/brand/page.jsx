'use client'
import DashboardLayout from "../home/layout";
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
import CardHeader from '@mui/material/CardHeader';
import { Box, Button, Card, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, TextField, Avatar } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import MuiModal from "../customcomponent/modal";
import MuiTable from "../customcomponent/table";
import MuiTextField from "../customcomponent/formcontrol";
import MuiCheckList from "../customcomponent/checklist";
import { getBrand, getBrands, getCompanies, getStores, postBrand, putBrand } from "@/app/data/api";
import MuiDialog from "../customcomponent/dialog";
import MuiSelect from "../customcomponent/Select";
import { VerifiedOutlined } from "@mui/icons-material";

import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';

export default function Brand() {
    useEffect(() => {
        fetchData();
    }, []);
    const [open, setOpen] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [detail, setDetail] = useState([]);
    const [getsstores, setStores] = useState([]);
    const [companyId, setCompanyID] = useState(0);
    const [brandName, setBrandName] = useState('');
    const [updateBrandName, setUpdateBrandName] = useState('');
    const [getsCompanies, setCompanies] = useState([]);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [preselectedItems, setPreselectedItems] = useState([]);
    const [data, setData] = useState([]);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate() };
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
    { label: 'Pais', field: 'country' },
    { label: '', field: '' },
    { label: '', field: '' }];

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
        // p: 4
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
    const handleRowClick = async (brandId) => {
        try {
            await fetchDetail(brandId); // Obtener detalles de la empresa
            openModal(); // Abrir el modal después de obtener los detalles
        } catch (error) {
            console.error('Error fetching brand details:', error);
        }
    };
    const handleRow1Click = async (brandId) => {
        try {
            console.log('brandId:', brandId);
            //await fetchDetail(companyId); // Obtener detalles de la empresa
            handleOpen(); // Abrir el modal después de obtener los detalles
        } catch (error) {
            console.error('Error fetching brand details:', error);
        }
    };

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
            console.log("Esto tiene marca", companies)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
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
            console.log('Marca creada exitosamente:', responseData);
            setMessage("Marca creada exitosamente!!");
            setSuccessModalOpen(true);
            fetchData();
        } catch (error) {
            // Manejar errores en caso de que la creación falleç
            console.error('Error al crear la marca:', error.message);
        }
    }
    async function updateBrand(id) {
        //event.preventDefault();
        try {
            console.log("Esto tiene id: ", id)
            console.log("Esto tiene responseData ", {
                name: updateBrandName,
                slug: updateBrandName,
                id_company: companyId,
            })
            // Llamar a la función en api/empresas.js para crear una nueva empresa
            let responseData = await putBrand({
                name: updateBrandName,
                slug: updateBrandName,
                id_company: companyId,
            }, id);
            console.log("Esto tiene responseData ", responseData)
            // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
            console.log('Marca actualizada exitosamente:', responseData);
            setMessage("Marca actualizada exitosamente!!");
            setSuccessModalOpen(true);
            fetchData();
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
            setUpdateBrandName(brandWithstores.name);
            setCompanyID(brandWithstores.id_company);
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

        <h4><DeleteForeverIcon /> ELIMINAR TIENDA</h4>
        <Divider className="divider" />
    </>
    );
    const actions = (<>
        <Button onClick={handleClose}>ACEPTAR</Button>
    </>);
    const contentDialog = (
        <DialogContentText style={{ color: "black" }}>
            ¿Esta seguro que desea eliminar esta tienda?
        </DialogContentText>);

    const titledialogSucces = (<>
        <h4><VerifiedOutlined /> REGISTRO EXITOSO</h4>
        <Divider className="divider" />
    </>
    );
    const actionsSucces = (
        <Button onClick={handleCloseSuccessModal}>ACEPTAR</Button>
    );
    const contentDialogSucces = (
        <DialogContentText style={{ color: "black" }}>
            {message}
        </DialogContentText>);
    const modalCreate = (
        <div className="modal-content">
            <MuiTextField title="Nombre de la Marca:" value={brandName} onChange={handleChange} className="modal-col-12" />
            <MuiSelect title="Empresa" items={getsCompanies} values={companyId} onChange={(event) => setCompanyID(parseInt(event))} selectKey={'MuiSelect'} className="modal-col-12" />
            <Row style={{ width: "100%" }}>
                <Col className="modal-col-btn">
                    <Button onClick={() => { onSubmit() }}>
                        <SaveIcon /> GUARDAR
                    </Button>
                    <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
                </Col>
            </Row>
        </div>
    );
    const modalContent = (
        <div className="modal-content">
            <MuiTextField title="Nombre de la Marca:" value={updateBrandName} onChange={(e) => setUpdateBrandName(e.target.value)} className="modal-col-12" />
            <MuiCheckList title="Tiendas" items={detail.storesd} preselectedItems={preselectedItems} className="modal-checklist" />
            <Row style={{ width: "100%" }}>
                <Col className="modal-col-btn">
                    <Button onClick={() => updateBrand(detail.id)}>
                        <SaveIcon /> GUARDAR
                    </Button>
                    <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
                </Col>
            </Row>
        </div>
    );

    const body = (
        <>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                            {row.stores.map((store, index) => (<Chip  key = {index} label={store.name} style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} size="small" variant="outlined" />))}
                        </Stack>
                    </TableCell>
                    <TableCell align="center">Panama</TableCell>
                    <TableCell align="center" className="button-td">
                        <Button className="edit-button-g" onClick={() => { handleRowClick(row.id) }}><EditIcon /> </Button>
                    </TableCell>
                    <TableCell align="center" className="button-td">
                        <Button className="delete-button-g" onClick={() => { handleRow1Click(row.id) }}>
                            <DeleteOutlineIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
            <MuiModal
                open={isModalOpen}
                onClose={closeModal}
                title="EDITAR MARCA"
                content={modalContent}
                customStyles={modalStyles}
            />
            <MuiDialog open={open} onClose={handleClose} title={titledialog} content={contentDialog} actions={actions} className="modal-dialog-container-delete" />
        </>
    );
    return (
        <>
            <DashboardLayout className="justify-content-center">
                <Card className="card-configuraciones">
                    <CardHeader className="card-header"
                        title={<h3> Configuración de Marca </h3>}
                        subheader={
                            <Row className="card-config-header">
                                <div className="card-config-header-left">
                                    <Form className="card-config-search">
                                        <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                                        <span className= "material-symbols-outlined"> search </span>
                                    </Form>
                                    {/* <FormControl className="card-config-search">
                                        <Input type="search" placeholder="Search" />
                                        <span className= "material-symbols-outlined"> search </span>
                                    </FormControl> */}
                                </div>
                                <div className="card-header-buttons">
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
                                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }}>
                                        <DownloadIcon /> IMPORTAR
                                    </Button>
                                </div>
                            </Row>
                        }
                    />
                    <Divider className="divider" />
                    <CardContent className="card-content">
                        <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.length} />
                    </CardContent>
                </Card >
            </DashboardLayout >
        </>
    );
}