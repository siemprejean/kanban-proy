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
import { getBrands, getCompanies, getCompany, getCountries, getEmployees, getStores, postCompany } from "@/app/data/api";
import MuiModal from "../customcomponent/modal";
import MuiFormControl from "../customcomponent/formcontrol";
import { Col, Row } from "react-bootstrap";
import MuiCheckList from "../customcomponent/checklist";
import MuiTable from "../customcomponent/table";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import MuiDialog from "../customcomponent/dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MuiSelect from "../customcomponent/Select";
/* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); */
export default function Company() {
  useEffect(() => {
    fetchData();
    fetchCountries();
 }, []);
  //Variables de estados
  const [open, setOpen, page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [detail, setDetail] = React.useState([]);
  const [getscountries, setCountries] = React.useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [data, setData] = useState([]);
  const [preselectedItems, setPreselectedItems] = useState([]);
  const [companyName, setcompanyName] = useState('');
  const [companyFiscalId, setcompanyFiscalId] = useState('');
  const [companyIdCountry, setcompanyIdCountry] = useState(0);
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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeCountry = async (event) => {
    //event.preventDefault();
    //console.log("esto tiene event", event.target.value)
    const selectedCountry = event;
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
      // Asociar marcas a empresas
      const dataWithBrands = companies.map((company) => ({
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
      // Obtener los valores de las refs
      /*console.log("Esto tiene companyNameRef ", companyNameRef.current)
      const companyName = companyNameRef.current ? companyNameRef.current.value : '';
      const companyFiscalId = companyFiscalIdRef.current.value;
      const companyIdCountry = companyIdCountryRef.current.value;*/

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
    } catch (error) {
      // Manejar errores en caso de que la creación falle
      console.error('Error al crear la empresa:', error.message);
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

  //Contenido del modal de creación
  const modalCreate = (
    <div>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="Nombre de la Empresa:" value={companyName} onChange={(e) => setcompanyName(e.target.value)} type="text"/>
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="ID Fiscal:" value={companyFiscalId} onChange={(e) => setcompanyFiscalId(e.target.value)} type="text"/>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px", width: "100%" }}>
          <MuiSelect title="Pais:" items={getscountries} value={companyIdCountry} onChange={handleChangeCountry}/>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <Button style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => { handleCreateCompany(), closeModalCreate }}>
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
          <MuiFormControl title="Nombre de la Empresa:" value={detail.name} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="ID Fiscal:" value={detail.id} />
        </Col>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiFormControl title="No. Empleados:" value={detail.employeesd?.length || 0} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ position: "relative", borderRadius: "10px", backgroundColor: "#ffffff", padding: "20px" }}>
          <MuiCheckList title="Marcas" items={detail.brandsd} customStyles={listStyles} preselectedItems={preselectedItems} />
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
/*   console.log(MuiModal.propTypes);
  console.log(MuiCheckList.propTypes); */
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
          <TableCell align="center">{row.employees.length}</TableCell>
          <TableCell align="center">
            <Stack direction="row" spacing={1} alignItems="center" style={{ flexWrap: 'wrap' }} >
              {row.brands.map((brand) => (<Chip label={brand.name} style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} size="small" variant="outlined" />))}
            </Stack>
          </TableCell>
          <TableCell align="center">Panama</TableCell>
          <TableCell align="center">
            <Button style={{ backgroundColor: "#03386a", color: "HighlightText" }} onClick={() => { fetchDetail(row.id); openModal() }}><EditIcon /> </Button>
            <MuiModal
              open={isModalOpen}
              onClose={closeModal}
              title="EDITAR EMPRESA"
              content={modalContent}
              customStyles={modalStylesEdit}
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
            <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.count} />
          </div >
        </Card >
      </DashboardLayout >
    </>
  );
}
