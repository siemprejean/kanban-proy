'use client'
import DashboardLayout from "../home/layout";
import Link from "next/link";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, Card, FormControl, IconButton, InputLabel, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, CardHeader, Grid, styled, Divider, Stack, Chip, DialogContentText, FormGroup, FormControlLabel, Switch } from "@mui/material";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

//import { DetailModal } from "./detailmodal";
//import DetailModal from "./detailmodal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getPermission, getPermissions, getRole, getRoles, postPermission, postRole, putPermission, putRole } from "@/app/data/api";
import MuiTextField from "../customcomponent/formcontrol";
import { NotesOutlined, SaveAltOutlined, SupervisedUserCircleSharp, VerifiedOutlined } from "@mui/icons-material";
import MuiDialog from "../customcomponent/dialog";
import MuiCheckList from "../customcomponent/checklist";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import MuiModal from "../customcomponent/modal";
import MuiTable from "../customcomponent/table";

import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';

export default function RolesPermision() {

  const [open, setOpen] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [checked, setChecked] = React.useState(0);
  const [detail, setDetail] = React.useState([]);
  const [detail1, setDetail1] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleSlug, setRoleSlug] = useState('');
  const [roleStatus, setRoleStatus] = useState(true);
  const [updateRoleName, setUpdateRoleName] = useState('');
  const [updateRoleSlug, setUpdateRoleSlug] = useState('');
  const [updateRoleStatus, setUpdateRoleStatus] = useState(true);
  const [preselectedItems, setPreselectedItems] = useState([]);
  const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate() };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModalCreate = () => setModalCreateOpen(false);
  const [openp, setOpenp] = React.useState(0);
  const [successModalOpenp, setSuccessModalOpenp] = useState(false);
  const handleCloseSuccessModalp = () => { setSuccessModalOpenp(false); closeModalp(); closeModalCreatep() };
  const handleClosep = () => setOpenp(false);
  const handleOpenp = () => setOpenp(true);
  const [isModalOpenp, setModalOpenp] = useState(false);
  const [isModalCreateOpenp, setModalCreateOpenp] = useState(false);
  const openModalp = () => setModalOpenp(true);
  const closeModalp = () => setModalOpenp(false);
  const openModalCreatep = () => setModalCreateOpenp(true);
  const closeModalCreatep = () => setModalCreateOpenp(false);
  const [permissionName, setPermissionName] = useState('');
  const [permissionSlug, setPermissionSlug] = useState('');
  const [permissionHttpMethod, setPermissionHttpMethod] = useState('');
  const [permissionHttpPath, setPermissionHttpPath] = useState('');
  const [updatePermissionName, setUpdatePermissionName] = useState('');
  const [updatePermissionSlug, setUpdatePermissionSlug] = useState('');
  const [updatePermissionHttpMethod, setUpdatePermissionHttpMethod] = useState('');
  const [updatePermissionHttpPath, setUpdatePermissionHttpPath] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [value, setValue] = React.useState("one");
  const columnsTable = [{ label: 'Id', field: 'id' },
  { label: 'Nombre', field: 'name' },
  { label: 'Descripcion', field: 'slug' },
  { label: 'Permisos', field: 'permissions', render: (row) => row.permissions.join(', ') },
  { label: 'Creado en', field: 'created_at' }, { label: '', field: '' }, { label: '', field: '' }];

  const columnsTablePermissions = [{ label: 'Id', field: 'id' },
  { label: 'Nombre Corto', field: 'name' },
  { label: 'Descripcion', field: 'slug' },
  { label: 'Creado En', field: 'permissions', render: (row) => row.permissions.join(', ') },
  { label: 'Actualizado En', field: 'created_at' }, { label: '', field: '' }, { label: '', field: '' }];

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

  const modalStylesp = {
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
  //VARIABLES PARA ROLES
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    fetchData();
    fetchDatap();
  }, []);

  const fetchData = async () => {
    try {
      const roles = await getRoles();
      console.log("estyo tiene data", data)
      setData(roles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDetail = async (id) => {
    try {
      const role = await getRole(id);
      const preselectedPermissions = role.permissions.map((permission) => permission.id);
      setDetail(role);
      setUpdateRoleName(role.name);
      setUpdateRoleSlug(role.slug);
      setUpdateRoleStatus(role.status_role)
      setPreselectedItems(preselectedPermissions);
      console.log("Esto tiene status_role", role.status_role);
      console.log("Esto tiene preselectedBrands", preselectedPermissions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function handleCreateRole() {
    //event.preventDefault();
    console.log("Esto tiene preselectedItems", preselectedItems)
    try {
      console.log("Esto tiene responseData ", {
        name: roleName,
        slug: roleSlug,
        status_role: roleStatus,
        permissions: preselectedItems
      })
      // Llamar a la función en api/empresas.js para crear una nueva empresa
      let responseData = await postRole({
        name: roleName,
        slug: roleSlug,
        status_role: roleStatus,
        permissions: preselectedItems
      });
      console.log("Esto tiene responseData ", responseData)
      // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
      console.log('Role creado exitosamente:', responseData);
      setMessage("Role creado exitosamente!!");
      setSuccessModalOpen(true);
      closeModalCreate();
      fetchData();
    } catch (error) {
      // Manejar errores en caso de que la creación falleç
      console.error('Error al crear el role:', error.message);
    }
  }
  async function updateRole(id) {
    //event.preventDefault();
    try {
      console.log("Esto tiene id: ", id)
      console.log("Esto tiene responseData ", {
        name: roleName,
        slug: roleSlug,
        status_role: roleStatus,
        permissions: preselectedItems
      })
      // Llamar a la función en api/empresas.js para crear una nueva empresa
      let responseData = await putRole({
        name: updateRoleName,
        slug: updateRoleSlug,
        status_role: updateRoleStatus,
        permissions: preselectedItems
      }, id);
      console.log("Esto tiene responseData ", responseData)
      // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
      console.log('Marca actualizada exitosamente:', responseData);
      setMessage("Marca actualizada exitosamente!!");
      setSuccessModalOpen(true);
      fetchData();
    } catch (error) {
      // Manejar errores en caso de que la creación falleç
      console.error('Error al actualizar el rol:', error.message);
    }
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleRowClick = async (roleId) => {
    try {
      await fetchDetail(roleId); // Obtener detalles de la empresa
      openModal(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };
  const handleRow1Click = async (roleId) => {
    try {
      console.log('roleId:', roleId);
      //await fetchDetail(companyId); // Obtener detalles de la empresa
      handleOpen(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };
  //DIALOG DE ELIMINACION
  const titledialog = (
    <>
      <h4><DeleteForeverIcon /> ELIMINAR ROLE</h4>
      <Divider className="divider" />
    </>
  );
  const actions = (<>
    <Button onClick={handleClose}>ACEPTAR</Button>
  </>);
  const contentDialog = (
    <DialogContentText style={{ color: "black" }}>
      ¿Esta seguro que desea eliminar este role?
    </DialogContentText>);

  //DIALOG DE REGISTRO EXITOSO
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

  const handleChangers = (event) => {
    setRoleStatus(event.target.checked);

  };
  //CONTENT MODAL DE CREACION ROLES
  const modalCreate = (
    <div className="modal-content">
      <MuiTextField title="Nombre del Rol:" value={roleName} onChange={(e) => setRoleName(e.target.value)} type="text" className="modal-col-12" />
      <MuiTextField title="Slug:" value={roleSlug} onChange={(e) => setRoleSlug(e.target.value)} type="text" className="modal-col-12" />
      <FormGroup>
        <FormControlLabel control={<Switch checked={roleStatus} onChange={handleChangers} />} label="Activo" />
      </FormGroup>
      <MuiCheckList title="Permisos" items={data1} customStyles={listStyles} preselectedItems={preselectedItems} onNewSelectedItems={(selectedItems) => {
        setPreselectedItems(selectedItems)
      }} className="modal-checklist" />
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button onClick={() => { handleCreateRole() }}>
            <SaveAltOutlined /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );

  //CONTENT MODAL DE EDICION ROLES
  const modalContent = (
    <div className="modal-content">
      <MuiTextField title="Nombre del Rol:" value={updateRoleName} onChange={(e) => setUpdateRoleName(e.target.value)} type="text" className="modal-col-6" />
      <MuiTextField title="Descripción:" value={updateRoleSlug} onChange={(e) => setUpdateRoleSlug(e.target.value)} className="modal-col-6" />
      <FormGroup>
        <FormControlLabel control={<Switch checked={updateRoleStatus} onChange={(event) => {
          setUpdateRoleStatus(event.target.checked);
        }} />} label="Activo" />
      </FormGroup>
      <MuiCheckList title="Permisos" items={data1} customStyles={listStyles} preselectedItems={preselectedItems} onNewSelectedItems={(selectedItems) => {
        setPreselectedItems(selectedItems)
      }} className="modal-checklist" />
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => updateRole(detail.id)}>
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
          <TableCell align="center">{row.slug}</TableCell>
          <TableCell align="center">
            <Stack direction="row" spacing={1} alignItems="center" style={{ flexWrap: 'wrap' }} >
              {row.permissions.map((permission, index) => (<Chip key={index} label={permission.name} style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} size="small" variant="outlined" />))}
            </Stack>
          </TableCell>
          <TableCell align="center">{row.created_at}</TableCell>
          <TableCell align="center">
            <Button style={{ backgroundColor: "#03386a", color: "HighlightText" }} onClick={() => { handleRowClick(row.id) }}><EditIcon /> </Button>
          </TableCell>
          <TableCell align="center">
            <React.Fragment>
              <Button style={{ backgroundColor: "#FF3D57", color: "HighlightText" }} onClick={() => { handleRow1Click(row.id) }}>
                <DeleteOutlineIcon />
              </Button>
            </React.Fragment>
          </TableCell>
        </TableRow>
      ))}
      <MuiModal
        open={isModalOpen}
        onClose={closeModal}
        title="EDITAR ROL"
        content={modalContent}
        customStyles={modalStyles}
      />
      <MuiDialog open={open} onClose={handleClose} title={titledialog} content={contentDialog} actions={actions} className="modal-dialog-container-delete" />
    </>
  );

  //VARIABLES DE PERMISOS
  const fetchDatap = async () => {
    try {
      const permissions = await getPermissions();
      console.log("estyo tiene data", data1)
      setData1(permissions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDetailp = async (id) => {
    try {
      const permission = await getPermission(id);
      setDetail1(permission);
      setUpdatePermissionName(permission.name);
      setUpdatePermissionSlug(permission.slug)
      setUpdatePermissionHttpMethod(permission.http_method)
      setUpdatePermissionHttpPath(permission.http_path);
      console.log("Esto tiene permission", permission);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function handleCreatePermission() {
    //event.preventDefault();
    try {
      console.log("Esto tiene responseData ", {
        name: permissionName,
        slug: permissionSlug,
        http_method: permissionHttpMethod,
        http_path: permissionHttpPath
      })
      // Llamar a la función en api/empresas.js para crear una nueva empresa
      let responseData = await postPermission({
        name: permissionName,
        slug: permissionSlug,
        http_method: permissionHttpMethod,
        http_path: permissionHttpPath
      });
      console.log("Esto tiene responseData ", responseData)
      // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
      console.log('Permiso creado exitosamente:', responseData);
      setMessage("Permiso creado exitosamente!!");
      setSuccessModalOpenp(true);

      //closeModalCreatep();
      fetchDatap();
    } catch (error) {
      // Manejar errores en caso de que la creación falleç
      console.error('Error al crear el permiso:', error.message);
    }
  }
  async function updatePermission(id) {
    //event.preventDefault();
    try {
      console.log("Esto tiene id: ", id)
      console.log("Esto tiene responseData ", {
        name: updatePermissionName,
        slug: updatePermissionSlug,
        http_method: updatePermissionHttpMethod,
        http_path: updatePermissionHttpPath
      })
      // Llamar a la función en api/empresas.js para crear una nueva empresa
      let responseData = await putPermission({
        name: updatePermissionName,
        slug: updatePermissionSlug,
        http_method: updatePermissionHttpMethod,
        http_path: updatePermissionHttpPath
      }, id);
      console.log("Esto tiene responseData ", responseData)
      // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
      console.log('Permiso actualizado exitosamente:', responseData);
      setMessage("Permiso actualizado exitosamente!!");
      setSuccessModalOpenp(true);
      fetchData();
    } catch (error) {
      // Manejar errores en caso de que la creación falleç
      console.error('Error al actualizar el rol:', error.message);
    }
  }
  const handleSearchp = (e) => {
    setSearchTerm1(e.target.value);
  };
  const filteredDatap = data1.filter((item) =>
    item.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );
  const handleRowClickp = async (permissionId) => {
    try {
      await fetchDetailp(permissionId); // Obtener detalles de la empresa
      openModalp(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };
  const handleRow1Clickp = async (permissionId) => {
    try {
      console.log('roleId:', permissionId);
      //await fetchDetail(companyId); // Obtener detalles de la empresa
      handleOpenp(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };
  //DIALOG DE ELIMINACION
  const titledialogp = (
    <>
      <h4><DeleteForeverIcon /> ELIMINAR PERMISO</h4>
      <Divider className="divider" />
    </>
  );
  const actionsp = (<>
    <Button onClick={handleClosep}>ACEPTAR</Button>
  </>);
  const contentDialogp = (
    <DialogContentText style={{ color: "black" }}>
      ¿Esta seguro que desea eliminar este permiso?
    </DialogContentText>);

  //DIALOG DE REGISTRO EXITOSO
  const titledialogSuccesp = (
    <>
      <h4><VerifiedOutlined /> REGISTRO EXITOSO</h4>
      <Divider className="divider" />
    </>
  );
  const actionsSuccesp = (<>
    <Button onClick={handleCloseSuccessModalp}>ACEPTAR</Button>
  </>);
  const contentDialogSuccesp = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);

  //CONTENT MODAL DE CREACION ROLES
  const modalCreatep = (
    <div className="modal-content">
      <MuiTextField title="Nombre del Permiso:" value={permissionName} onChange={(e) => setPermissionName(e.target.value)} type="text" className="modal-col-6" />
      <MuiTextField title="Descripcion:" value={permissionSlug} onChange={(e) => setPermissionSlug(e.target.value)} type="text" className="modal-col-6" />
      <MuiTextField title="Metodo Http:" value={permissionHttpMethod} onChange={(e) => setPermissionHttpMethod(e.target.value)} type="text" className="modal-col-6" />
      <MuiTextField title="Path Http:" value={permissionHttpPath} onChange={(e) => setPermissionHttpPath(e.target.value)} type="text" className="modal-col-6" />
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button onClick={() => { handleCreatePermission() }}>
            <SaveAltOutlined /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpenp} onClose={handleCloseSuccessModalp} title={titledialogSuccesp} content={contentDialogSuccesp} actions={actionsSuccesp} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );

  //CONTENT MODAL DE EDICION ROLES
  const modalContentp = (
    <div className="modal-content">
      <MuiTextField title="Nombre del Rol:" value={updatePermissionName} onChange={(e) => setUpdatePermissionName(e.target.value)} type="text" className="modal-col-6" />
      <MuiTextField title="Descripción:" value={updatePermissionSlug} className="modal-col-6" onChange={(e) => setUpdatePermissionSlug(e.target.value)} />
      <MuiTextField title="Metodo Http:" value={updatePermissionHttpMethod} onChange={(e) => setUpdatePermissionHttpMethod(e.target.value)} type="text" className="modal-col-6" />
      <MuiTextField title="Path Http:" value={updatePermissionHttpPath} onChange={(e) => setUpdatePermissionHttpPath(e.target.value)} type="text" className="modal-col-6" />
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => updatePermission(detail1.id)}>
            <SaveIcon /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpenp} onClose={handleCloseSuccessModalp} title={titledialogSuccesp} content={contentDialogSuccesp} actions={actionsSuccesp} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );
  const bodyp = (
    <>
      {filteredDatap.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.slug}</TableCell>
          <TableCell align="center">{row.created_at}</TableCell>
          <TableCell align="center">{row.updated_at}</TableCell>
          <TableCell align="center">
            <Button style={{ backgroundColor: "#03386a", color: "HighlightText" }} onClick={() => { handleRowClickp(row.id) }}><EditIcon /> </Button>
          </TableCell>
          <TableCell align="center">
            <React.Fragment>
              <Button style={{ backgroundColor: "#FF3D57", color: "HighlightText" }} onClick={() => { handleRow1Clickp(row.id) }}>
                <DeleteOutlineIcon />
              </Button>
            </React.Fragment>
          </TableCell>
        </TableRow>
      ))}
      <MuiModal
        open={isModalOpenp}
        onClose={closeModalp}
        title="EDITAR PERMISO"
        content={modalContentp}
        customStyles={modalStylesp}
      />
      <MuiDialog open={openp} onClose={handleClosep} title={titledialogp} content={contentDialogp} actions={actionsp} className="modal-dialog-container-delete" />
    </>
  );
  return (
    <>
      <DashboardLayout className="justify-content-center">
        <TabContext value={value}>
          <Card className="card-configuraciones">
            <CardHeader className="card-header"
              title={<h3> Configuración de Roles y Permisos </h3>}
              subheader={
                <TabList
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                  className="card-header-tab"
                >
                  <Tab value="one" label="Gestionar Roles" icon={<SupervisedUserCircleSharp style={{ position: "absolute", left: "40px" }} />} wrapped style={{ width: "35%", }} />
                  <Tab icon={<NotesOutlined style={{ position: "absolute", left: "40px" }} />} value="two" label="Gestionar Permisos" style={{ width: "35%" }} />
                </TabList>
              }
            />
            <TabPanel value="one" index={0} className="card-configuraciones">
              <div className="card-header">
                <Row className="card-config-header">
                  <div className="card-config-header-left">
                    <Form className="card-config-search">
                      <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                      <span className= "material-symbols-outlined"> search </span>
                    </Form>
                  </div>
                  <div className="card-header-buttons">
                    <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { openModalCreate() }}>
                      <AddIcon /> CREAR
                    </Button>
                    <MuiModal
                      open={isModalCreateOpen}
                      onClose={closeModalCreate}
                      title="CREAR ROL"
                      content={modalCreate}
                      customStyles={modalStyles}
                    />
                  </div>
                </Row>
              </div>
              <Divider className="divider" />
              <CardContent className="card-content">
                <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.length} />
              </CardContent>
            </TabPanel>
            <TabPanel value="two" index={1} className="card-configuraciones">
              <div className="card-header">
                <Row className="card-config-header">
                  <div className="card-config-header-left">
                    <Form className="card-config-search">
                      <Form.Control type="search" placeholder="Search" onChange={handleSearchp} />
                      <span className= "material-symbols-outlined"> search </span>
                    </Form>
                  </div>
                  <div className="card-header-buttons">
                    <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { openModalCreatep() }}>
                      <AddIcon /> CREAR
                    </Button>
                    <MuiModal
                      open={isModalCreateOpenp}
                      onClose={closeModalCreatep}
                      title="CREAR PERMISO"
                      content={modalCreatep}
                      customStyles={modalStylesp}
                    />
                  </div>
                </Row>
              </div>
              <Divider className="divider" />
              <CardContent className="card-content">
                <MuiTable columns={columnsTablePermissions} body={bodyp} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data1.length} />
              </CardContent>
            </TabPanel>
          </Card >
        </TabContext>
      </DashboardLayout >
    </>
  );
}
