'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { Nav, Navbar, Form, Card } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getBrands, getStore, getStores, postStore, putStore } from "@/app/data/api";
import MuiTable from "../customcomponent/table";
import MuiFormControl from "../customcomponent/formcontrol";
import MuiModal from "../customcomponent/modal";
import MuiDialog from "../customcomponent/dialog";

import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';
import { VerifiedOutlined } from "@mui/icons-material";
import MuiSelect from "../customcomponent/Select";


export default function Store() {

  const [open, setOpen] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [checked, setChecked] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [getsBrands, setBrands] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [storeSlug, setStoreSlug] = useState('');
  const [storeComision, setStoreComision] = useState('');
  const [storeRetention, setStoreRetention] = useState('');
  const [storeExcedent, setStoreExcedent] = useState('');
  const [storeIncentive, setStoreIncentive] = useState('');
  const [updateStoreName, setUpdateStoreName] = useState('');
  const [updateStoreSlug, setUpdateStoreSlug] = useState('');
  const [updateStoreComision, setUpdateStoreComision] = useState('');
  const [updateStoreRetention, setUpdateStoreRetention] = useState('');
  const [updateStoreExcedent, setUpdateStoreExcedent] = useState('');
  const [updateStoreIncentive, setUpdateStoreIncentive] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal() };
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModalCreate = () => setModalCreateOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columnsTable = [{ label: 'Id', field: 'id' },
  { label: 'Tienda', field: 'name' }];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
  console.log(MuiModal.PropTypes);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const stores = await getStores();
      const brands = await getBrands();
      setData(stores);
      setBrands(brands);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDetail = async (id) => {
    try {
      const store = await getStore(id);
      setDetail(store);
      setUpdateStoreName(store.name);
      setUpdateStoreSlug(store.slug);
      setUpdateStoreComision(store.comission);
      setUpdateStoreExcedent(store.surplus);
      setUpdateStoreIncentive(store.incentive_sunday);
      setUpdateStoreRetention(store.retention);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log("Esto tiene data", data);

  const handleCreateStore = async () => {
    try {

      if (storeName !== '' && storeName !== null) {
        console.log("Esto tiene responseData ", {
          name: storeName,


        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await postStore({
          name: storeName,
          slug: "tp2",
          id_brand: brandId,
          retention: parseFloat(storeRetention),
          surplus: parseFloat(storeExcedent),
          incentive_sunday: parseFloat(storeIncentive),
          icg_brand: "t",
          icg_serie: "2t"
        });
        console.log("Esto tiene responseData ", responseData)
        // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
        console.log('Empresa creada exitosamente:', responseData);
        setMessage("Empresa creada exitosamente!!");
        setSuccessModalOpen(true);
        closeModalCreate();
        fetchData();
      }
    } catch (error) {
      // Manejar errores en caso de que la creación falle
      console.error('Error al crear la empresa:', error.message);
    }
  };

  const handleUpdateStore = async (id) => {
    try {
      console.log("Esto tiene id: ", id)
      if (updateStoreName !== '' && updateStoreName !== null) {
        console.log("Esto tiene responseData ", {
          name: updateStoreName,
          slug: updateStoreSlug,
          retention: updateStoreRetention,
          surplus: updateStoreExcedent,
          incentive_sunday: updateStoreIncentive,
          id_brand: detail.id_brand,
          icg_brand: detail.icg_brand,
          icg_serie: detail.icg_serie
        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await putStore({
          name: updateStoreName,
          slug: updateStoreSlug,
          retention: updateStoreRetention,
          surplus: updateStoreExcedent,
          incentive_sunday: updateStoreIncentive,
          id_brand: detail.id_brand,
          icg_brand: detail.icg_brand,
          icg_serie: detail.icg_serie
        }, id);
        console.log("Esto tiene responseData ", responseData)
        // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
        console.log('Empresa actualizada exitosamente:', responseData);
        setMessage("Empresa actualizada exitosamente!!");
        setSuccessModalOpen(true);
        fetchData();
        //

      }
    } catch (error) {
      // Manejar errores en caso de que la creación falle
      console.error('Error al actualizar la empresa:', error.message);
    }
  };


  const titledialogSucces = (
    <>
      <h4><VerifiedOutlined /> REGISTRO EXITOSO</h4>
      <Divider className="divider" />
    </>
  );
  const actionsSucces = (<>
    <Button onClick={handleCloseSuccessModal}>ACEPTAR</Button>
  </>);
  const contentDialogSucces = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);

  const modalCreate = (
    <div className="modal-content">
      <MuiFormControl title="Nombre de la Tienda:" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="modal-col-12" />
      <MuiFormControl title="Tipo de comisión:" value={storeComision} onChange={(e) => setStoreComision(e.target.value)} className="modal-col-6" />
      <MuiFormControl title="Retención:" value={storeRetention} onChange={(e) => setStoreRetention(e.target.value)} className="modal-col-6" />
      <MuiFormControl title="Excedente:" value={storeExcedent} onChange={(e) => setStoreExcedent(e.target.value)} className="modal-col-6" />
      <MuiFormControl title="Incentivo de domingos:" value={storeIncentive} onChange={(e) => setStoreIncentive(e.target.value)} className="modal-col-6" />
      <MuiSelect title="Marca" items={getsBrands} values={brandId} onChange={(event) => setBrandId(parseInt(event))} selectKey={'MuiSelect'} className="modal-col-12" />
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button onClick={() => { handleCreateStore() }}>GUARDAR</Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );
  const modalContent = (
    <div className="modal-content">
      <MuiFormControl title="Nombre de la Tienda:" value={updateStoreName} onChange={(e) => setUpdateStoreName(e.target.value)} className="modal-col-12" />
      <MuiFormControl title="Tipo de comisión:" value={updateStoreComision} onChange={(e) => setUpdateStoreComision(e.target.value)} className="modal-col-6" />
      <MuiFormControl title="Retención:" value={updateStoreRetention} onChange={(e) => setUpdateStoreRetention(e.target.value)} className="modal-col-6" />
      <MuiFormControl title="Excedente:" value={updateStoreExcedent} onChange={(e) => setUpdateStoreExcedent(e.target.value)} className="modal-col-6" />
      <MuiFormControl title="Incentivo de domingos:" value={updateStoreIncentive} onChange={(e) => setUpdateStoreIncentive(e.target.value)} className="modal-col-6" />
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button onClick={() => { handleUpdateStore(detail.id) }}>GUARDAR</Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );

  const titledialog = (
    <>
      <h4><DeleteForeverIcon /> ELIMINAR TIENDA</h4>
      <Divider className="divider" />
    </>
  );

  const actions = (
    <>
      <Button onClick={handleClose}>ACEPTAR</Button>
    </>
  );

  const contentDialog = (
    <DialogContentText style={{ color: "black" }}>
      ¿Esta seguro que desea eliminar esta tienda?
    </DialogContentText>);

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
          <TableCell align="center" className="button-td">
            <Button className="edit-button-g" onClick={() => { fetchDetail(row.id); openModal() }}><EditIcon /> </Button>
          </TableCell>
          <TableCell align="center" className="button-td">
            <React.Fragment>
              <Button className="delete-button-g" onClick={handleOpen}>
                <DeleteOutlineIcon />
              </Button>
            </React.Fragment>
          </TableCell>
        </TableRow>
      ))}
      <MuiModal
        open={isModalOpen}
        onClose={closeModal}
        title="EDITAR TIENDA"
        content={modalContent}
        customStyles={modalStyles}
      />
      <MuiDialog open={open} onClose={handleClose} title={titledialog} content={contentDialog} actions={actions} className="modal-dialog-container-delete" />
    </>
  );

  return (
    <>
      <DashboardLayout>
        <Card className="card-configuraciones">
          <Card.Header>
            <Row>
              <h3 id="modal-modal-title">
                Configuración de Tiendas
              </h3>
            </Row>
            <Row className="card-config-header">
              <div className="card-config-header-left">
                <Form className="card-config-search">
                  <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                  <span class="material-symbols-outlined"> search </span>
                </Form>
              </div>
              <div className="card-config-header-right">
                <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { openModalCreate() }}>
                  <AddIcon /> CREAR
                </Button>
                <MuiModal
                  open={isModalCreateOpen}
                  onClose={closeModalCreate}
                  title="CREAR TIENDA"
                  content={modalCreate}
                  customStyles={modalStyles}
                />
                <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }}>
                  <DownloadIcon /> IMPORTAR
                </Button>
              </div>
            </Row>
          </Card.Header>
          <div className="card-content">
            <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.count} />
          </div>
        </Card>
      </DashboardLayout>
    </>
  );
}
