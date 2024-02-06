'use client'
import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, Card, FormControl, Input, Paper, TableCell, TableRow, CardContent, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBrands, getCompanies, getCompany, getCountries, getEmployees, getStores, postCompany, putCompany } from "@/app/data/api";
import MuiModal from "../customcomponent/modal";
import MuiTextField from "../customcomponent/formcontrol";
import { Col, Row } from "react-bootstrap";
import MuiCheckList from "../customcomponent/checklist";
import MuiTable from "../customcomponent/table";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import MuiDialog from "../customcomponent/dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MuiSelect from "../customcomponent/Select";
import { VerifiedOutlined } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); 
export default function Company() {
  useEffect(() => {
    fetchData();
    fetchCountries();
  }, []);
  //Variables de estados
  const [open, setOpen] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [detail, setDetail] = React.useState([]);
  const [getscountries, setCountries] = React.useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [data, setData] = useState([]);
  const [preselectedItems, setPreselectedItems] = useState([]);
  const [companyName, setcompanyName] = useState('');
  const [updateCompanyName, setUpdateCompanyName] = useState('');
  const [companyFiscalId, setcompanyFiscalId] = useState('');
  const [updateUompanyFiscalId, setUpdateCompanyFiscalId] = useState('');
  const [companyIdCountry, setcompanyIdCountry] = useState(0);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal() };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModalCreate = () => setModalCreateOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    //setcompanyIdCountry(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleChangeCountry = async (event) => {
    //event.preventDefault();
    //console.log("esto tiene event", event.target.value)
    const selectedCountry = parseInt(event);
    setcompanyIdCountry(selectedCountry);
    console.log("esto tiene selectedCountry", selectedCountry)
  };
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
  { label: 'Pais', field: 'country' }, { label: '', field: '' }, { label: '', field: '' }];

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
    margin: '30vh auto',
    flex: "auto",
    right: '10%',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  const modalStylesEdit = {
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
/*   console.log(MuiModal.propTypes); */



  const fetchData = async () => {
    try {
      const companies = await getCompanies();
      const brands = await getBrands();
      const stores = await getStores();
      const employees = await getEmployees();
      const countries = await getCountries();
      const companiesCountry = companies.map((companycoun) => ({
        ...companycoun,
        country: countries.filter((country) => country.id === companycoun.id_country,).map((country) => country.name),
      }));
      // Asociar marcas a empresas
      const dataWithBrands = companiesCountry.map((company) => ({
        ...company,
        brands: brands.filter((brand) => brand.id_company === company.id),
      }));

      const dataWithStores = dataWithBrands.map((items) => ({
        ...items,
        stores: stores.filter((store) => items.brands.some((brand) => brand.id === store.id_brand))
      }));
      const dataWithEmployees = dataWithStores.map((items) => ({
        ...items,
        employees: employees.filter((employee) => items.stores.some((store) => store.id === employee.id_store))
      }));
      console.log("esto tiene dataWithEmployees ", dataWithEmployees)
      setData(dataWithEmployees);
      setCountries(countries);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDetail = async (id) => {
    try {
      const company = await getCompany(id);
      const brandsd = await getBrands();
      const stores = await getStores();
      const employees = await getEmployees();

      // Asociar marcas a empresa
      const companyWithBrands = {
        ...company,
        brandsd: brandsd.filter((brand) => brand.id_company === company.id),
      };
      const companyWithStores = {
        ...companyWithBrands,
        storesd: stores.filter((store) => companyWithBrands.brandsd.some((brand) => brand.id === store.id_brand))
      };
      const companyWithEmployees = {
        ...companyWithStores,
        employeesd: employees.filter((employee) => companyWithStores.storesd.some((store) => store.id === employee.id_store))
      };
      const preselectedBrands = companyWithBrands.brandsd
        .filter((brand) => brand.id_company === company.id)
        .map((brand) => brand.id);
      setDetail(companyWithEmployees);
      setUpdateCompanyName(companyWithEmployees.name);
      setcompanyIdCountry(companyWithEmployees.id_country)
      //setUpdateCompanyIdCountry(companyWithEmployees.id_company)
      setPreselectedItems(preselectedBrands);
      console.log("Esto tiene preselectedBrands", preselectedBrands);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const fetchCountries = async () => {
    try {
      const countries = await getCountries();
      setCountries(countries);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('Esto tiene countries:', getscountries);

  const handleCreateCompany = async () => {
    try {

      if (companyName !== '' && companyName !== null) {
        console.log("Esto tiene responseData ", {
          name: companyName,
          fiscal_Id: companyFiscalId,
          id_country: companyIdCountry,
        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await postCompany({
          name: companyName,
          //fiscal_Id: companyFiscalId,
          id_country: companyIdCountry,
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

  const handleUpdateCompany = async (id) => {
    try {
      console.log("Esto tiene id: ", id)
      if (updateCompanyName !== '' && updateCompanyName !== null) {
        console.log("Esto tiene responseData ", {
          name: updateCompanyName,
          //fiscal_Id: updateCompanyFiscalId,
          id_country: companyIdCountry,
        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await putCompany({
          name: updateCompanyName,
          //fiscal_Id: updateCompanyFiscalId,
          id_country: companyIdCountry,
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

  const titledialogSucces = (<>

    <h4 style={{ color: "black" }}><VerifiedOutlined style={{ backgroundColor: "white", color: "#FF3D57" }} /> REGISTRO EXITOSO</h4>
    <Divider style={{ border: '1px solid', color: "#AAAAAA" }} />
  </>
  );
  const actionsSucces = (<>
    <Button style={{ backgroundColor: "#FF3D57", color: "white", borderRadius: "20px", border: "outset" }} onClick={handleCloseSuccessModal}>ACEPTAR</Button>
  </>);
  const contentDialogSucces = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);

  //Contenido del modal de creación
  const modalCreate = (
    <div>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiTextField title="Nombre de la Empresa:" value={companyName} onChange={(e) => setcompanyName(e.target.value)} type="text" />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiTextField title="ID Fiscal:" value={companyFiscalId} onChange={(e) => setcompanyFiscalId(e.target.value)} type="text" />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
          <MuiSelect title="Pais:" items={getscountries} value={companyIdCountry} onChange={handleChangeCountry} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { handleCreateCompany() }}>
            <SaveIcon /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} />
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
          <MuiTextField title="Nombre de la Empresa:" value={updateCompanyName} onChange={(e) => setUpdateCompanyName(e.target.value)} type="text" />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiTextField title="ID Fiscal:" value={detail.id} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiTextField title="No. Empleados:" value={detail.employeesd?.length || 0} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiCheckList title="Marcas" items={detail.brandsd} customStyles={listStyles} preselectedItems={preselectedItems} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { handleUpdateCompany(detail.id) }}>
            <SaveIcon /> GUARDAR
          </Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }} onClick={closeModal}>
            <CancelIcon /> CANCELAR
          </Button>
        </Col>
      </Row>
    </div>
  );
  console.log(MuiModal.PropTypes);
  console.log(MuiCheckList.propTypes);
  const handleRowClick = async (companyId) => {
    try {
      await fetchDetail(companyId); // Obtener detalles de la empresa
      openModal(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };
  const handleRow1Click = async (companyId) => {
    try {
      console.log('companyId:', companyId);
      //await fetchDetail(companyId); // Obtener detalles de la empresa
      handleOpen(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };
  const body = (
    <>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.employees.length}</TableCell>
          <TableCell align="center">
            <Stack direction="row" spacing={1} alignItems="center" style={{ flexWrap: 'wrap' }} >
              {row.brands.map((brand) => (<Chip label={brand.name} style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} size="small" variant="outlined" />))}
            </Stack>
          </TableCell>
          <TableCell align="center">Panama</TableCell>
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
        title="EDITAR EMPRESA"
        content={modalContent}
        customStyles={modalStylesEdit}
      />
      <MuiDialog open={open} onClose={handleClose} title={titledialog} content={contentDialog} actions={actions} />
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
                  Configuración de Empresas
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
                  <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { fetchCountries(), openModalCreate() }}>
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
            <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.length} />
          </div >
        </Card >
      </DashboardLayout >
    </>
  );
}
