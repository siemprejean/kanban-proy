'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, Card, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, CardHeader, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getStore, getStores } from "@/app/data/api";
import MuiTable from "../customcomponent/table";
import MuiFormControl from "../customcomponent/formcontrol";
import { Col, Row } from "react-bootstrap";
import MuiModal from "../customcomponent/modal";
import MuiDialog from "../customcomponent/dialog";


export default function Store() {

  const [open, setOpen, page, setPage] = React.useState(0);
  const [checked, setChecked] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [detail, setDetail] = React.useState([]);
  const [storeName, setStoreName] = useState('');
  const [storeComision, setStoreComision] = useState('');
  const [storeRetention, setStoreRetention] = useState('');
  const [storeExcedent, setStoreExcedent] = useState('');
  const [storeIncentive, setStoreIncentive] = useState('');
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModalCreate = () => setModalCreateOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const [data, setData] = useState([]);

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
    const fetchData = async () => {
      try {
        const stores = await getStores();
        setData(stores);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchDetail = async (id) => {
    try {
      const store = await getStore(id);

      setDetail(store);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log("Esto tiene data", data);
  const modalCreate = (
    <div>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
          <MuiFormControl title="Nombre de la Tienda:" value={storeName} onChange={(e) => setStoreName(e.target.value)} style={{ align: "center" }} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Tipo de comisión:" value={storeComision} onChange={(e) => setStoreComision(e.target.value)} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Retención:" value={storeRetention} onChange={(e) => setStoreRetention(e.target.value)} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Excedente:" value={storeExcedent} onChange={(e) => setStoreExcedent(e.target.value)} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Incentivo de domingos:" value={storeIncentive} onChange={(e) => setStoreIncentive(e.target.value)} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={closeModalCreate}>
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
          <MuiFormControl title="Nombre de la Tienda:" value={detail.name} style={{ align: "center" }} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Tipo de comisión:" value={''} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Retención:" value={detail.retention} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Excedente:" value={detail.surplus} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Incentivo de domingos:" value={detail.incentive_sunday} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={closeModal}>
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
          <TableCell align="center">
            <Button style={{ backgroundColor: "#03386a", color:"HighlightText" }} onClick={() => { fetchDetail(row.id); openModal() }}><EditIcon /> </Button>
            <MuiModal
              open={isModalOpen}
              onClose={closeModal}
              title="EDITAR TIENDA"
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
                  Configuración de Tiendas
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
                    <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { openModalCreate() }}>
                      <AddIcon /> CREAR
                    </Button>
                    <MuiModal
                      open={isModalCreateOpen}
                      onClose={closeModalCreate}
                      title="CREAR EMPRESA"
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
          <div style={{ height: 400, width: '100%', align: 'center' }}>
            <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.count} />
          </div>
        </Card>
      </DashboardLayout >
    </>
  );
}
