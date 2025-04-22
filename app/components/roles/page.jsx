'use client'
import DashboardLayout from "../home/layout";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import {Button, Card, FormControl, IconButton, InputLabel, TableCell, TableRow, CardContent, CardHeader, Divider, Stack, Chip, DialogContentText, FormGroup, FormControlLabel, Switch } from "@mui/material";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import { useRef} from "react";

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
import dateFormat from 'dateformat';

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
  const handleCloseSuccessModalp = () => {console.log("Closing modal..."); setSuccessModalOpenp(false); closeModalp(); closeModalCreatep() };
  const handleClosep = () => setOpenp(false);
  const handleOpenp = () => setOpenp(true);
  const [isModalOpenp, setModalOpenp] = useState(false);
  const [isModalCreateOpenp, setModalCreateOpenp] = useState(false);
  const openModalp = () => setModalOpenp(true);
  const closeModalp = () => {console.log("closeModalCreatep called!"); setModalOpenp(false)};
  const openModalCreatep = () => setModalCreateOpenp(true);
  const closeModalCreatep = () => {console.log("closeModalCreatep called!"); setModalCreateOpenp(false)};
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
  const modalRef = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [value, setValue] = React.useState("one");
  const columnsTable = [{ label: 'ID', field: 'id' },
  { label: 'Nombre', field: 'name' },
  { label: 'Descripcion', field: 'slug' },
  { label: 'Permisos', field: 'permissions', render: (row) => row.permissions.join(', ') },
  { label: 'Creado en', field: 'created_at' }, { label: '', field: '' }, { label: '', field: '' }];

  const columnsTablePermissions = [{ label: 'Id', field: 'id' },
  { label: 'Nombre Corto', field: 'name' },
  { label: 'Descripcion', field: 'slug' },
  { label: 'Creado En', field: 'permissions', render: (row) => row.permissions.join(', ') },
  { label: 'Actualizado En', field: 'created_at', className: 'updated-at' }, { label: '', field: '' }, { label: '', field: '' }];

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

  const StyledButton = styled(Button)`
    background-color: #03386a;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
    right: 100%;
    bottom: 5px;
    &:hover {
    background-color: #0457a0;
    transform: scale(1.05);
    }
  `;

  const Styledbuttons = styled(Button)`
    background-color: #03386a;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;  
    &:hover {
    background-color: #0457a0;
    transform: scale(1.05);
    }
  `;

  const StyledmethodButton = styled(Button)`
  background-color: ${(props) => (props.active ? "#03386a" : "#e0e0e0")};  // Updated to #03386a for active state
  color: ${(props) => (props.active ? "white" : "black")};
  margin-right: 10px;
  width: 120px;
  height: 40px;
  padding: 0;
  text-transform: none;
  font-size: 14px;
  top: 30px;

  &:hover {
    background-color: ${(props) => (props.active ? "#03386a" : "#e0e0e0")} !important;
    color: ${(props) => (props.active ? "white" : "black")} !important;
          }
  }
`;

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

  const timeoutModalp = () => { 
    setSuccessModalOpenp(true);
    setTimeout(() => setSuccessModalOpenp(false), 2000);
    setTimeout(() => handleCloseeditModalp(), 2000);
  }

  const timeoutModal = () => { 
    setSuccessModalOpenp(true);
    setTimeout(() => setSuccessModalOpen(false), 2000);
    setTimeout(() => handleCloseeditModal(), 2000);
  }

  const handleCloseModal = () => {
    setRoleName('');
    setRoleSlug('');
    setPreselectedItems([]);
    setSuccessModalOpen(false); // Ensure success modal is also closed
    setModalCreateOpen(false);
  };
  
  const handleCloseeditModal = () => {
    setModalOpen(false);  // Open modal
  };

  const handleCloseModalp = () => {
    setPermissionName('');
    setPermissionSlug('');
    setPermissionHttpMethod('');
    setPermissionHttpPath('');
    setModalCreateOpenp(false);
  };

  const handleCloseeditModalp = () => {
    setModalOpenp(false);
  };

    //VARIABLES DE PERMISOS
  const fetchDatap = async () => {
    try {
      const permissions = await getPermissions();
      console.log("esto tiene data", data1)
      setData1(permissions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const roles = await getRoles();
      console.log("esto tiene data", data)
      setData(roles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
  fetchData();
  fetchDatap();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Prevent the default action & stop propagation
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };
  
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

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
    // Validate inputs
    if (!roleName.trim() || preselectedItems.length === 0) {
      alert("Debe completar el campo 'Nombre del Rol' y seleccionar al menos un permiso.");
      return;
    }
  
    try {
      console.log("Esto tiene responseData ", {
        name: roleName,
        slug: roleSlug,
        status_role: roleStatus,
        permissions: preselectedItems,
      });
  
      // Crea nuevo rol
      let responseData = await postRole({
        name: roleName,
        slug: roleSlug,
        status_role: roleStatus,
        permissions: preselectedItems,
      });
  
      console.log("Esto tiene responseData ", responseData);
  
      // Informa si se creó bien el rol
      console.log("Role creado exitosamente:", responseData);
      setRoleName("");
      setRoleSlug("");
      setPreselectedItems([]);
      setSuccessModalOpen(true); // Open success modal
      closeModalCreate();
      fetchData();
    } catch (error) {
      // Manejar errores en caso de que la creación falle
      console.error("Error al crear el role:", error.message);
    }
  }
  
  async function updateRole(id) {
    //event.preventDefault();
    try {
      console.log("Esto tiene id: ", id)
      console.log("Esto tiene responseData ", {
        name: roleName,
        slug: roleSlug,
        status_role: "true",
        permissions: preselectedItems
      })
      // Llamar a la función en api/empresas.js para crear una nueva empresa
      let responseData = await putRole({
        name: updateRoleName,
        slug: updateRoleSlug,
        status_role: "true",
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
  </>);
  const contentDialogSucces = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);
  
  //CONTENT MODAL DE CREACION ROLES
  const modalCreate = (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content" style={{ position: "relative" }}>
        <IconButton 
          onClick={handleCloseModal} 
          style={{ position: "absolute", top: -80, right: -25, backgroundColor: "white", transition: "background-color 0.3s ease"}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
        >
          <CloseIcon />
        </IconButton>
  
        <FormControl fullWidth className="modal-col-6" sx={{ marginBottom: 2 }}>
          <InputLabel shrink htmlFor="nombre-rol" sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Nombre del Rol:
          </InputLabel>
          <MuiTextField
            id="nombre-rol"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            type="text"
            InputProps={{ style: { fontSize: "18px" } }}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
  
        <FormControl fullWidth className="modal-col-12-slug">
          <InputLabel shrink htmlFor="descripcion" sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Descripción:
          </InputLabel>
          <MuiTextField
            id="descripcion"
            value={roleSlug}
            onChange={(e) => setRoleSlug(e.target.value)}
            multiline
            rows={4}
            InputProps={{ style: { fontSize: "18px", minHeight: 100 } }}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
  
        <MuiCheckList 
          title="Permisos" 
          items={data1} 
          customStyles={listStyles} 
          preselectedItems={preselectedItems} 
          onNewSelectedItems={(selectedItems) => setPreselectedItems(selectedItems)} 
          className="modal-checklist" 
        />
  
        <Row style={{ width: "95%" }}>
          <Col className="modal-col-btn">
            <Button onClick={() => 
            { handleCreateRole();
              timeoutModal();
             }}
            style={{ left: "30%", position: "relative" }}>
              <SaveAltOutlined /> GUARDAR
            </Button>
            <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
          </Col>
        </Row>
      </div>
    </div>
  );

  
  //CONTENT MODAL DE EDICION ROLES
      const modalContent = (
      <div ref={modalRef} className="modal-content" style={{ position: "relative" }}>
      
      <IconButton 
      onClick={handleCloseeditModal} 
      style={{ position: 'absolute', top: -80, right: -25, backgroundColor: "white",transition: "background-color 0.3s ease"}}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
      >
      <CloseIcon />
      </IconButton>

      <FormControl fullWidth className="modal-col-6" sx={{ marginBottom: 2 }}>
        <InputLabel 
          shrink 
          htmlFor="nombre-rol"
          sx={{ fontSize: '20px', fontWeight: 'bold' }}
        >
          Nombre del Rol:
        </InputLabel>
        <MuiTextField
          id="nombre-rol"
          value={updateRoleName}
          onChange={(e) => setUpdateRoleName(e.target.value)}
          type="text"
          InputProps={{ style: { fontSize: '18px' } }}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormControl fullWidth className="modal-col-12-slug">
        <InputLabel 
          shrink 
          htmlFor="descripcion"
          sx={{ fontSize: '20px', fontWeight: 'bold' }}
        >
          Descripción:
        </InputLabel>
        <MuiTextField
          id="descripcion"
          value={updateRoleSlug}
          onChange={(e) => setUpdateRoleSlug(e.target.value)}
          multiline
          rows={4}
          InputProps={{ style: { fontSize: '18px', minHeight: 100 } }}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormGroup>
        <FormControlLabel control={<Switch checked={updateRoleStatus} onChange={(event) => {
          setUpdateRoleStatus(event.target.checked);
        }} />} label="Activo" />
      </FormGroup>

      <MuiCheckList title="Permisos" items={data1} customStyles={listStyles} preselectedItems={preselectedItems} onNewSelectedItems={(selectedItems) => {
        setPreselectedItems(selectedItems)
      }} className="modal-checklist" />

      <Row style={{ width: "45%" }}>
        <Col className="modal-col-btn">
          <Button 
          style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto", left: "120%", position: "relative" }} 
          onClick={() => 
          {updateRole(detail.id)
          timeoutModal();
          }}>

            <SaveIcon /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );

  //TABLA ROLES
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
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.slug}</TableCell>
          <TableCell align="left">
            <Stack direction="row" spacing={1} alignItems="center" style={{ flexWrap: 'wrap' }} >
              {row.permissions.map((permission, index) => (<Chip key={index} label={permission.name} className="badge-roles" style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green', borderRadius: '5px' }} size="small" variant="outlined" />))}
            </Stack>
          </TableCell>
          <TableCell align="left">{row.created_at}</TableCell>
          <TableCell align="center">
            <Styledbuttons onClick={() => { handleRowClick(row.id) }}><EditIcon /> </Styledbuttons>
          </TableCell>
          <TableCell align="center">
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

  </>);
  
  const contentDialogSuccesp = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);

  //CONTENT MODAL DE CREACION PERMISOS
  const modalCreatep = (
    <div ref={modalRef} className="modal-content">
            <IconButton 
      onClick={handleCloseModalp} 
      style={{ position: 'absolute', top: -80, right: -25, backgroundColor: "white", transition: "background-color 0.3s ease"}}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
        >
      <CloseIcon />
      </IconButton>
      <MuiTextField title="Nombre del Permiso:" value={permissionName} onChange={(e) => setPermissionName(e.target.value)} type="text" className="modal-col-6 input-disabled" disabled />
      <MuiTextField title="Descripcion:" value={permissionSlug} onChange={(e) => setPermissionSlug(e.target.value)} type="text" className="modal-col-6 textarea-disabled" multiline rows={3}/>
      <div className="modal-col-6">
        <StyledmethodButton
          active={permissionHttpMethod === "GET"}
          onClick={() => setPermissionHttpMethod("GET")}
        >
          GET
        </StyledmethodButton>
        <StyledmethodButton
          active={permissionHttpMethod === "POST"}
          onClick={() => setPermissionHttpMethod("POST")}
        >
          POST
        </StyledmethodButton>
        <StyledmethodButton
          active={permissionHttpMethod === "PUT"}
          onClick={() => setPermissionHttpMethod("PUT")}
        >
          PUT
        </StyledmethodButton>
      </div>
      <MuiTextField title="Path Http:" value={permissionHttpPath} onChange={(e) => setPermissionHttpPath(e.target.value)} type="text" className="modal-col-6" />
      <Row style={{ width: "95%" }}>
        <Col className="modal-col-btn">
          <Button onClick={() => 
          { handleCreatePermission();
            timeoutModalp();
          }}
            style={{ left: "30%", position: "relative" }}
          >
            <SaveAltOutlined /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpenp} onClose={handleCloseSuccessModalp} title={titledialogSuccesp} content={contentDialogSuccesp} actions={actionsSuccesp} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );

  //CONTENT MODAL DE EDICION PERMISOS
  const modalContentp = (
    <div ref={modalRef} className="modal-content">
      <IconButton 
        onClick={handleCloseeditModalp} 
        style={{ position: 'absolute', top: -80, right: -25, backgroundColor: "white", transition: "background-color 0.3s ease"}}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}

      >
        <CloseIcon />
      </IconButton>

      <MuiTextField
        title="Nombre del Rol:"
        value={updatePermissionName}
        onChange={(e) => setUpdatePermissionName(e.target.value)}
        type="text"
        className="modal-col-6"
      />
      <MuiTextField
        title="Descripción:"
        value={updatePermissionSlug}
        onChange={(e) => setUpdatePermissionSlug(e.target.value)}
        type="text"
        className="modal-col-6"
      />
      <MuiTextField
        title="Metodo Http:"
        value={updatePermissionHttpMethod}
        onChange={(e) => setUpdatePermissionHttpMethod(e.target.value)}
        type="text"
        className="modal-col-6"
      />
      <MuiTextField
        title="Path Http:"
        value={updatePermissionHttpPath}
        onChange={(e) => setUpdatePermissionHttpPath(e.target.value)}
        type="text"
        className="modal-col-6"
      />

      <Row style={{ width: "45%" }}>
        <Col className="modal-col-btn">
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#FFAF38",
              width: "100%",
              color: "HighlightText",
              flex: "auto",
              left: "120%",
              position: "relative",
            }}
            onClick={() => {
              updatePermission(detail1.id);
              timeoutModalp();
            }}
          >
            <SaveIcon /> GUARDAR
          </Button>
          <MuiDialog
            open={successModalOpenp}
            onClose={() => setSuccessModalOpenp(false)}
            title={titledialogSuccesp}
            content={contentDialogSuccesp}
            actions={actionsSuccesp}
            className="modal-dialog-container"
          />
        </Col>
      </Row>
    </div>
  );

  // Wrap your modal content with ThemeProvider

  //TABLA DE PERMISOS
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
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.slug}</TableCell>
          <TableCell align="left">{row.created_at}</TableCell>
          <TableCell align="left">{row.updated_at}</TableCell>
          <TableCell align="center">
            <Styledbuttons onClick={() => { handleRowClickp(row.id) }}><EditIcon /> </Styledbuttons>
          </TableCell>
          <TableCell align="center">
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

  //SEARCH Y BOTON CREAR ROLES Y PERMISOS
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
                  <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                    {/* Search Icon Positioned Inside Input */}
                    <span 
                      style={{ pointerEvents: "none", fontSize: "20px", left: "10px" }} 
                    >
                      search
                    </span>
                    
                    {/* Input Field with Proper Padding */}
                    <Form.Control 
                      type="search" 
                      onChange={handleSearch} 
                      className="ps-5" 
                      style={{ paddingLeft: "3.5rem", position: "relative" }} 
                    />
                  </Form>
                  
                  </div>
                  <div className="card-header-buttons-roles">
                    <StyledButton onClick={() => { openModalCreate()}} style={{ borderRadius: "10px", height: "50px" }} >
                      <AddIcon /> CREAR
                    </StyledButton>
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
                  <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                  <span 
                      className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ps-3 text-muted" 
                      style={{ pointerEvents: "none", fontSize: "20px", left: "10px" }} 
                    >
                      search
                    </span>
                  <Form.Control 
                      type="search" 
                      onChange={handleSearch} 
                      className="ps-5" 
                      style={{ paddingLeft: "3.5rem", position: "relative" }} 
                    />
                  </Form>
                  </div>
                  <div className="card-header-buttons-roles">
                    <StyledButton onClick={() => { openModalCreatep() }} style={{ borderRadius: "10px", height: "50px" }}>
                      <AddIcon /> CREAR
                    </StyledButton>
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
