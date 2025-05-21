'use client'
import DashboardLayout from "../home/layout";
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import {Button, Card,TableCell, TableRow, CardContent, MenuItem, styled, Divider, Stack, Chip, DialogContentText, Slide, FormControl,InputLabel, Select, IconButton, FormHelperText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import { getUser, getRol, mostrarUser, updateUserPermissions, getCompanies, postUser} from "@/app/data/api";
import MuiModal from "../customcomponent/modal";
import MuiTextField from "../customcomponent/formcontrol";
import { Col, Row, Form } from "react-bootstrap";
import MuiCheckList from "../customcomponent/checklist";
import MuiTable from "../customcomponent/table";
import SaveIcon from '@mui/icons-material/Save';
import MuiDialog from "../customcomponent/dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { VerifiedOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import CardHeader from '@mui/material/CardHeader';
import dateFormat from 'dateformat';
import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';
import { useRef} from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Company() {
  //Variables de estados
  const [open, setOpen] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [detail, setDetail] = React.useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate()};
  const handleClose = () => setOpen(false);
  const openModal = () => setModalOpen(true);
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModal = () => setModalOpen(false);
  const closeModalCreate = () => setModalCreateOpen(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [Username, setUname] = useState("");
  const [Email, setEmail] = useState("");
  const [Companyid, setCompany] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [conPassword, setconPassword] = useState("");
  const [updateNam, setUpdateName] = useState("");
  const [updateuser, setUpdateUname] = useState("");
  const [updatemail, setemail] = useState("");
  const [selectedroles, setSelectedroles] = useState([]);
  const [getsCompanies, setCompanies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);


  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const timeoutModal = async (val) => {
    if (val === 1) {
        setMessage("Usuario creado exitosamente!!");
      setTimeout(() => closeModalCreate(), 2000);
    } else {
        setMessage("Usuario actualizado exitosamente!!");
      setTimeout(() => closeModal(), 2000);
    }
  
    setSuccessModalOpen(true);
    setTimeout(() => setSuccessModalOpen(false), 2000);
    handleCancelCreate();
};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    //setcompanyIdCountry(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

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

  const columnsTable = [{ label: 'ID', field: 'id' },
  { label: 'Nombre', field: 'name' },
  { label: 'Usuario', field: 'username', render: (row) => row.brands.join(', ') }, 
  { label: 'Correo Electronico', field: 'email' },
  { label: 'Roles', field: 'role_id' },
  { label: 'Creado En', field: 'created_at' }, { label: '', field: '' }, { label: '', field: '' }];

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

    const fetchData = async () => {
      try {
        const result = await getUser();
        const result2 = await getRol();
        const companies = await getCompanies();
  
        setData(result);
        setData1(result2);
        setCompanies(companies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  const handleRowClick = async (id) => {
    const userData = await mostrarUser(id); // Make sure token_temis is available in this scope
  
    if (!userData) return;
  
    setUpdateName(userData.name);
    setUpdateUname(userData.username);
    setemail(userData.email);
  
    const preselected = userData.roles.map((role) => role.id);
    setSelectedroles(preselected);
  
    setDetail({ id });
    openModal();
  };
  
  const updatePermission = async (userId) => {
    try {
      const payload = {
        name: updateNam,
        username: updateuser,
        email: updatemail,
        avatar: "",
        id_company: 1,
        status_user: true,
        id: userId,
        roles: selectedroles,

      };
      console.log('que hay dentro:', payload);
      await updateUserPermissions(payload); // This should be your API call
      timeoutModal();
      fetchData();
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const handleCancelCreate = () => {
    setUname('');
    setEmail('');
    setCompany('');
    setName('');
    setPassword('');
    setconPassword('');
    setSelectedroles('');
    setErrors({});
  };

  const [errors, setErrors] = useState({
    Username: '',
    Email: '',
    Companyid: '',
    Password: '',
    Name: '',
    conPassword: ''
  });
  
  const validateFields = () => {
    const newErrors = {
      Username: '',
      Email: '',
      Companyid: '',
      Password: '',
      Name: '',
      conPassword: ''
    };
    
    if (!Name.trim()) {
      newErrors.Name = 'Debe colocar un nombre.';
    } else if (Name.length > 50) {
      newErrors.Name = 'Máximo 50 caracteres.';
    }

    if (!Username.trim()) {
      newErrors.Username = 'Debe colocar un nombre.';
    } else if (Username.length > 50) {
      newErrors.Username = 'Máximo 50 caracteres.';
    }
  
    if (!Email) {
      newErrors.Email = 'Debe ingresar un correo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      newErrors.Email = 'Formato de correo inválido.';
    }    

    if (!Companyid) {
        newErrors.Companyid = 'Debe colocar una empresa asociada.';
    }

    if (!Password) {
      newErrors.Password = 'Debe colocar una contraseña.';
    } else if (Password.length < 8) {
      newErrors.Password = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!/[A-Z]/.test(Password)) {
      newErrors.Password = 'La contraseña debe tener al menos una letra mayúscula.';
    } else if (!/[a-z]/.test(Password)) {
      newErrors.Password = 'La contraseña debe tener al menos una letra minúscula.';
    } else if (!/[0-9]/.test(Password)) {
      newErrors.Password = 'La contraseña debe tener al menos un número.';
    } else if (!/[!@#$%^&*]/.test(Password)) {
      newErrors.Password = 'La contraseña debe tener al menos un carácter especial (!@#$%^&*).';
    } else if (Password !== conPassword) {
      newErrors.conPassword = 'Las contraseñas no coinciden.';
    }

    if (!conPassword) {
      newErrors.conPassword = 'Debe colocar una contraseña para verificar .';
    } 
  
    setErrors(newErrors);
    
    // Check if there are any errors
    return !newErrors.Username && !newErrors.Email && !newErrors.Companyid && !newErrors.Password && !newErrors.conPassword;
  };

  const handleCreateUser = async () => {
    try {
  
        if (Username !== '' && Username !== null) {
          console.log("Esto tiene responseData ", {
            username: Username,
            email: Email,
            id_company: Companyid,
            name: Name,
            user_password: Password,
            remember_password: Password,
            avatar: "",
            status_user: true,
            roles: selectedroles
          })
          // Llamar a la función en api/empresas.js para crear una nueva empresa
          const responseData = await postUser({
            username: Username,
            email: Email,
            id_company: Companyid,
            name: Name,
            user_password: Password,
            remember_password: Password,
            avatar: "",
            status_user: true,
            roles: selectedroles
          });
          console.log("Esto tiene responseData ", responseData)
          // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
          timeoutModal(1);
          setSuccessModalOpen(true);
          fetchData();
        }
      } catch (error) {
        // Manejar errores en caso de que la creación falle
        console.error('Error al crear la empresa:', error.message);
    }
  };

  const titledialog = (
    <>
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

  //Contenido del modal de creacion
    const modalCreate = (
      <div className="modal-content">
        <MuiTextField title="Nombre:" value={Name} onChange={(e) => setName(e.target.value)} type="text" className="modal-col-6" error={!!errors.Name} helperText={errors.Name}/>
        <MuiTextField title="Nombre de Usuario:" value={Username} onChange={(e) => setUname(e.target.value)} type="text" className="modal-col-6" error={!!errors.Username} helperText={errors.Username}/>
        <MuiTextField title="Correo:" value={Email} onChange={(e) => setEmail(e.target.value)} type="email" className="modal-col-6" error={!!errors.Email} helperText={errors.Email}/>
        <FormControl className="modal-col-6-drop" style={{ top: 25 }} error={!!errors.Companyid}>
            <InputLabel id="empresa-label">
              Empresa
            </InputLabel>
            <Select
              labelId="empresa-label"
              value={Companyid ?? ''}
              onChange={(e) => setCompany(parseInt(e.target.value))}
              label="Empresa"
            >
              {getsCompanies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
            ))}
            </Select>
              {errors.Companyid && (
            <FormHelperText>{errors.Companyid}</FormHelperText>
              )}
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'center' }} className="modal-col-6">
          <MuiTextField title="Contraseña:" value={Password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="flex-grow-1"
          error={!!errors.Password}
          helperText={errors.Password}
          autoComplete="new-password"
          />
            <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{ ml: 1, top: '25px'}}
            >
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }} className="modal-col-6">
          <MuiTextField title="Confirmar Contraseña:" value={conPassword} onChange={(e) => setconPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="flex-grow-1"
          error={!!errors.conPassword}
          helperText={errors.conPassword}
          />
        </div>
        <MuiCheckList title="Permisos" items={data1} customStyles={listStyles} onNewSelectedItems={(selectedItems) => setSelectedroles(selectedItems)} className="modal-checklist mt-6"/>
        <Row style={{ width: "100%" }}>
          <Col className="modal-col-btn">
          <Button onClick={() => {
            if (validateFields()) {
              handleCreateUser();
            }
            }}>
            <SaveIcon /> GUARDAR
          </Button>
            <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
          </Col>
        </Row>
      </div>
    );

  //Contenido del modal de edicion
  const modalContent = (
    <div ref={modalRef} className="modal-content">
        <MuiTextField title="Nombre" value={updateNam} type="text" className="modal-col-6" InputProps={{ readOnly: true }}/>
        <MuiTextField title="Usuario" value={updateuser} type="text" className="modal-col-6" InputProps={{ readOnly: true }}/>
        <MuiCheckList title="Permisos" items={data1} customStyles={listStyles} preselectedItems={selectedroles} onNewSelectedItems={(selectedItems) => setSelectedroles(selectedItems)} className="modal-checklist mt-6"/>
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
                updatePermission(detail.id);
              }}
            >
              <SaveIcon /> GUARDAR
            </Button>
            <MuiDialog
              open={successModalOpen}
              onClose={handleCloseSuccessModal}
              title={titledialogSucces}
              content={contentDialogSucces}
              actions={actionsSucces}
              className="modal-dialog-container"
            />
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
          <TableCell align="left" className="highlight-column">{row.name}</TableCell>
          <TableCell align="left" className="highlight-column">{row.username}</TableCell>
          <TableCell align="center" className="highlight-column">{row.email}</TableCell>
          <TableCell align="center" className="highlight-column">
            <Stack direction="row" spacing={1} alignItems="center" style={{ flexWrap: 'wrap' }} >
              {row.roles.map((ro, index) => (<Chip key={index} label={ro.name} style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green', borderRadius: '5px' }} size="small" variant="outlined" />))}
            </Stack>
          </TableCell>
          <TableCell align="center" className="highlight-column">{dateFormat(row.created_at, "mmmm d, yyyy ")}</TableCell>
          <TableCell align="center">
            <Styledbuttons 
              style={{ backgroundColor: "#03386a", color: "HighlightText" }} 
              onClick={() => { handleRowClick(row.id) }}
            >
              EDITAR USUARIO
            </Styledbuttons>
          </TableCell>
        </TableRow>
      ))}
      <MuiModal
        open={isModalOpen}
        onClose={closeModal}
        title="EDITAR USUARIO"
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
            title={<h3> Usuarios </h3>}
            subheader={
              <Row className="card-config-header">
                <div className="card-config-header-left">
                  <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                    <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                  </Form>
                </div>
                <div className="card-header-buttons-company">
                  <Styledbuttons style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "10%", color: "HighlightText", flex: "auto", height: "50px", marginRight: "2%"  }} onClick={() => {openModalCreate() }}>
                    <AddIcon /> CREAR
                  </Styledbuttons>
                    <MuiModal
                      open={isModalCreateOpen}
                      onClose={() => {
                        closeModalCreate();
                        handleCancelCreate();
                        setErrors({
                                  countryName: '',
                                  isoCode: '',
                                  coinName: ''
                                  });
                        }}
                      title="CREAR USUARIO"
                      content={modalCreate}
                      customStyles={modalStyles}
                      modalRef={modalRef}
                    />
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