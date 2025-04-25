'use client'
import DashboardLayout from "../home/layout";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import {Button, Card, Paper, TableCell, TableRow, CardContent, styled, Divider, Stack, Chip, DialogContentText, Slide, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBrands, getCompanies, getCompany, getCountries, postCompany, putCompany} from "@/app/data/api";
import MuiModal from "../customcomponent/modal";
import MuiTextField from "../customcomponent/formcontrol";
import { Col, Row, Form } from "react-bootstrap";
import MuiTable from "../customcomponent/table";
import SaveIcon from '@mui/icons-material/Save';
import MuiDialog from "../customcomponent/dialog";
import MuiSelect from "../customcomponent/Select";
import { VerifiedOutlined } from "@mui/icons-material";
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';
import { useRef} from "react";


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
  const [companyName, setcompanyName] = useState('');
  const [updateCompanyName, setUpdateCompanyName] = useState('');
  const [updateCompanycountry, setUpdateCompanycountry] = useState('');
  const [companyIdCountry, setcompanyIdCountry] = useState(0);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate()};
  const handleClose = () => setOpen(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setcompanyIdCountry(null);
    setModalOpen(false);
  };
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModalCreate = () => setModalCreateOpen(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);
  const activeCountryId = companyIdCountry || updateCompanycountry;
  const selectedCountry = getscountries.find(
    (country) => country.id === activeCountryId
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const timeoutModal = async (val) => {
    if (val === 1) {
      setMessage("Empresa creada exitosamente!!");
      setTimeout(() => closeModalCreate(), 2000);
    } else {
      setMessage("Empresa actualizada exitosamente!!");
      setTimeout(() => closeModal(), 2000);
    }
  
    setSuccessModalOpen(true);
    setTimeout(() => setSuccessModalOpen(false), 2000);
  };  

  const handleRowClick = async (companyId) => {
    try {
      await fetchDetail(companyId); // Obtener detalles de la empresa
      openModal(); // Abrir el modal después de obtener los detalles
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  const handleChangeCountry = async (event) => {
    const selectedCountry = parseInt(event.target.value, 10);
    setcompanyIdCountry(selectedCountry);
    console.log("esto tiene selectedCountry", selectedCountry);
  };  

  const handleCancelCreate = () => {
    setcompanyName('');
    setcompanyIdCountry('');
    setErrors({});
  };

   const StyledButton = styled(Button)`
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
  /*   console.log(MuiModal.propTypes); */

  const [errors, setErrors] = useState({
    companyName: '',
    companyIdCountry: ''
  });

  const validateFields = () => {
    const newErrors = {
      companyName: '',
      companyIdCountry: ''
    };
  
    if (!companyName.trim()) {
      newErrors.companyName = 'Debe colocar un nombre.';
    } else if (companyName.length > 50) {
      newErrors.companyName = 'Máximo 50 caracteres.';
    }
  
    if (!companyIdCountry) {
      newErrors.companyIdCountry = 'Debe seleccionar un país.';
    }
  
    setErrors(newErrors);
    
    // Check if there are any errors
    return !newErrors.companyName && !newErrors.companyIdCountry;
  };

  const fetchData = async () => {
    try {
      const companies = await getCompanies();
      const brands = await getBrands();
      const countries = await getCountries();
  
      // Attach country name to each company
      const companiesWithCountry = companies.map((company) => {
        const matchedCountry = countries.find(
          (country) => country.id === company.country_id
        );
        return {
          ...company,
          country: matchedCountry ? matchedCountry.name : 'Unknown',
        };
      });
  
      // Attach brands to each company
      const dataWithBrands = companiesWithCountry.map((company) => ({
        ...company,
        brands: brands.filter((brand) => brand.company_id === company.id),
      }));
  
      // Store data
      setData(dataWithBrands);
      setCountries(countries); // In case needed for form dropdown
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };   

  const fetchDetail = async (id) => {
    try {
      const company = await getCompany(id);
  
      // Set only the needed company details
      setDetail(company);
      setUpdateCompanyName(company.name);
      setUpdateCompanycountry(company.country_id);
  
      console.log("Esto tiene companyId:", company.id);
    } catch (error) {
      console.error('Error fetching company detail:', error);
    }
  };
   

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
          country_id: companyIdCountry,
        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await postCompany({
          name: companyName,
          //fiscal_Id: companyFiscalId,
          country_id: companyIdCountry,
        });
        console.log("Esto tiene responseData ", responseData)
        // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
        timeoutModal(1);
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
          country_id: companyIdCountry,
        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await putCompany({
          name: updateCompanyName,
          //fiscal_Id: updateCompanyFiscalId,
          country_id: companyIdCountry,
        }, id);
        console.log("Esto tiene responseData ", responseData)
        // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
        timeoutModal();
        fetchData();
        //

      }
    } catch (error) {
      // Manejar errores en caso de que la creación falle
      console.error('Error al actualizar la empresa:', error.message);
    }
  };

  <ClickAwayListener
    onClickAway={(event) => {
      const clickedInsideMuiSelect = document.querySelector('.MuiPopover-root')?.contains(event.target);
      if (clickedInsideMuiSelect) return;
      handleCancelCreate ();
      closeModal();
    }}
  >
    <div className="modal-content">
      {/* modalCreate contents here */}
    </div>
  </ClickAwayListener>
   
  const titledialogSucces = (
    <>
      <h4><VerifiedOutlined /> REGISTRO EXITOSO</h4>
      <Divider className="divider" />
    </>
  );

  const titledialogSuccesedit= (
    <>
      <h4><VerifiedOutlined /> ACTUALIZACION EXITOSA</h4>
      <Divider className="divider" />
    </>
  );

  const contentDialogSucces = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);

  //Contenido del modal de creación
  const modalCreate = (
    <div className="modal-content">
      <MuiTextField title="Nombre de la Empresa:" value={companyName} onChange={(e) => setcompanyName(e.target.value)} type="text" className="modal-col-6" error={!!errors.companyName} helperText={errors.companyName} />
      <FormControl className="modal-col-6" style={{top: 25}} error={!!errors.companyIdCountry}>
        <InputLabel id="pais-label" style={{top: 5 ,left: 10 }} >País</InputLabel>
          <Select
            labelId="pais-label"
            value={companyIdCountry ?? ''}
            onChange={handleChangeCountry}
          >
            {getscountries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
            {country.name}
            </MenuItem>
            ))}
          </Select>
        {errors.companyIdCountry && (
        <FormHelperText>{errors.companyIdCountry}</FormHelperText>
        )}
      </FormControl>
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
        <Button onClick={() => {
          if (validateFields()) {
            handleCreateCompany();
          }
          }}>
          <SaveIcon /> GUARDAR
        </Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );

  //Contenido del modal de edicion
  const modalContent = (
    <div ref={modalRef} className="modal-content">
      <MuiTextField title="Nombre de la Empresa:" value={updateCompanyName} onChange={(e) => setUpdateCompanyName(e.target.value)} type="text" className="modal-col-6" />
      <MuiSelect title="Pais" items={getscountries} values={activeCountryId} onChange={(value) => setcompanyIdCountry(parseInt(value, 10))} className="modal-col-6"/>
      <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
          <Button 
            style={{ borderRadius: "10px", backgroundColor: "#FFAF38", width: "100%", color: "HighlightText", flex: "auto" }} 
            onClick={() => handleUpdateCompany(detail.id)}
          >
            <SaveIcon /> GUARDAR
          </Button>
  
          <MuiDialog 
            open={successModalOpen} 
            onClose={handleCloseSuccessModal} 
            title={titledialogSuccesedit} 
            content={contentDialogSucces} 
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
          <TableCell align="left" className="col-sm-3">
            <Stack direction="row" spacing={1} alignitems="center" style={{ flexWrap: 'wrap' }}>
              {row.brands.map((brand, index) => (
                <Chip 
                  key={index}
                  className="badge"
                  label={brand.name} 
                  style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} 
                  size="small" 
                  variant="outlined" 
                />
              ))}
            </Stack>
          </TableCell>
          <TableCell alignitems="center" className="col-sm-3">
            <Chip
              label={row.country}
              className="badge"
              style={{
                backgroundColor: 'honeydew',
                color: 'green',
                borderColor: 'green',
              }}
              size="small"
              variant="outlined"
            />
          </TableCell>
          <TableCell align="center">
            <Styledbuttons style={{ backgroundColor: "#03386a", color: "HighlightText" }} onClick={() => { handleRowClick(row.id) }}>
              <EditIcon />
            </Styledbuttons>
          </TableCell>
        </TableRow>
      ))}
      <MuiModal
        open={isModalOpen}
        onClose={closeModal}
        title="EDITAR EMPRESA"
        content={modalContent}
        customStyles={modalStyles}
      />
    </>
  );  

  return (
    <>
      <DashboardLayout className="justify-content-center">

        <Card className="card-configuraciones">
          <CardHeader className="card-header"
            title={<h3> Configuración de Empresas </h3>}
            subheader={
              <Row className="card-config-header">
                <div className="card-config-header-left">
                  <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                    <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                  </Form>
                  {/* <FormControl className="card-config-search">
                                        <Input type="search" placeholder="Search" />
                                        <span className= "material-symbols-outlined"> search </span>
                                    </FormControl> */}
                </div>
                <div className="card-header-buttons-company">
                  <StyledButton style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "10%", color: "HighlightText", flex: "auto", height: "50px", marginRight: "2%"  }} onClick={() => { fetchCountries(), openModalCreate() }}>
                    <AddIcon /> CREAR
                  </StyledButton>
                  <MuiModal
                    open={isModalCreateOpen}
                    onClose={() => {
                      closeModalCreate();
                      handleCancelCreate();
                      setErrors({
                        companyName: '',
                        companyIdCountry: ''
                      });
                    }}
                    title="CREAR EMPRESA"
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
