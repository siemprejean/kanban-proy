'use client'
import DashboardLayout from "../home/layout";
import AddIcon from '@mui/icons-material/Add';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Button, Card,  TableCell, TableRow, CardContent, styled, Divider, Stack, Chip, DialogContentText} from "@mui/material";
import React, { useEffect, useState } from "react";
import {  getCompanies, getCountries, postCountry } from "@/app/data/api";
import MuiModal from "../customcomponent/modal";
import MuiTextField from "../customcomponent/formcontrol";
import LoadingSpinner from "../customcomponent/formcontrol";
import { Col, Row, Form } from "react-bootstrap";
import MuiTable from "../customcomponent/table";
import SaveIcon from '@mui/icons-material/Save';
import MuiDialog from "../customcomponent/dialog";
import { VerifiedOutlined } from "@mui/icons-material";
import CardHeader from '@mui/material/CardHeader';
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [getscountries, setCountries] = React.useState([]);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [data, setData] = useState([]);
  const [countryName, setcountryName] = useState('');
  const [isoCode, setisoCode] = useState('');
  const [coinName, setcoinName] = useState('');
  const [updateCompanycountry, setUpdateCompanycountry] = useState('');
  const [companyIdCountry, setcompanyIdCountry] = useState(0);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate()};
  const closeModal = () => {
    setcompanyIdCountry(null);
    setModalOpen(false);
  };
  const openModalCreate = () => setModalCreateOpen(true);
  const closeModalCreate = () => setModalCreateOpen(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);
    
  const filteredCountries = getscountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );  
  
  const groupedByCountry = filteredCountries.reduce((acc, country) => {
    const associatedCompanies = data.filter(
      (company) => company.country === country.name
    );
    acc[country.name] = associatedCompanies.map((c) => c.name);
    return acc;
  }, {});  


  if (!data) {
    return <LoadingSpinner />;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleCancelCreate = () => {
    setcountryName('');
    setisoCode('');
    setcoinName('');
    setErrors({});
  };

  const timeoutModal = async (val) => {

      setMessage("Pais creado exitosamente!!");
      setTimeout(() => closeModalCreate(), 2000);
      setSuccessModalOpen(true);
      setTimeout(() => setSuccessModalOpen(false), 2000);
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

  const columnsTable = [{ label: 'Pais', field: 'name' },
  { label: 'Empresas', field: 'company', render: (row) => row.brands.join(', ') }];

  //Estilos
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

  const [errors, setErrors] = useState({
    countryName: '',
    isoCode: '',
    coinName: ''
  });

  const validateFields = () => {
    const newErrors = {
      countryName: '',
      isoCode: '',
      coinName: ''
    };
  
    if (!countryName.trim()) {
      newErrors.countryName = 'Debe colocar un nombre.';
    } else if (countryName.length > 50) {
      newErrors.countryName = 'Máximo 50 caracteres.';
    }
  
    if (!isoCode) {
      newErrors.isoCode = 'Debe colocar un nombre corto.';
    }

    if (!coinName) {
        newErrors.coinName = 'Debe colocar una divisa.';
    }
  
    setErrors(newErrors);
    
    // Check if there are any errors
    return !newErrors.countryName && !newErrors.isoCode && !newErrors.coinName;
  };

  const fetchData = async () => {
    try {
      const companies = await getCompanies();
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
  
      // Store data
      setData(companiesWithCountry);
      setCountries(countries); // In case needed for form dropdown
    } catch (error) {
      console.error('Error fetching data:', error);
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
  
  const handleCreateCountry = async () => {
    try {

      if (countryName !== '' && countryName !== null) {
        console.log("Esto tiene responseData ", {
          name: countryName,
          ISOCODE: isoCode,
          currency: coinName
        })
        // Llamar a la función en api/empresas.js para crear una nueva empresa
        const responseData = await postCountry({
            name: countryName,
            ISOCODE: isoCode,
            currency: coinName
        });
        console.log("Esto tiene responseData ", responseData)
        // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
        timeoutModal();
        setSuccessModalOpen(true);
        fetchData();
      }
    } catch (error) {
      // Manejar errores en caso de que la creación falle
      console.error('Error al crear la empresa:', error.message);
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
  const actionsSucces = (<>
  </>);

  const contentDialogSucces = (
    <DialogContentText style={{ color: "black" }}>
      {message}
    </DialogContentText>);

  //Contenido del modal de creación
  const modalCreate = (
    <div className="modal-content">
      <MuiTextField title="Nombre del Pais:" value={countryName} onChange={(e) => setcountryName(e.target.value)} type="text" className="modal-col-12" error={!!errors.countryName} helperText={errors.countryName} style={{ marginBottom: '2%' }}/>
      <MuiTextField title="Nombre corto del Pais:" value={isoCode} onChange={(e) => setisoCode(e.target.value)} type="text" className="modal-col-6" error={!!errors.isoCode} helperText={errors.isoCode}/>
      <MuiTextField title="Divisa:" value={coinName} onChange={(e) => setcoinName(e.target.value)} type="text" className="modal-col-6" error={!!errors.coinName} helperText={errors.coinName}/>
       <Row style={{ width: "100%" }}>
        <Col className="modal-col-btn">
        <Button onClick={() => {
          if (validateFields()) {
            handleCreateCountry();
          }
          }}>
          <SaveIcon /> GUARDAR
        </Button>
          <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} actions={actionsSucces} className="modal-dialog-container" />
        </Col>
      </Row>
    </div>
  );


  //TABLA DE CONTENIDO
  const body = (
    <>
      {Object.entries(groupedByCountry).map(([country, companyNames]) => (
        <TableRow key={country}>
          <TableCell align="left" className="highlight-column">
            {country}
          </TableCell>
  
          <TableCell align="left" className="col-sm-9">
            {companyNames.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {companyNames.map((name, index) => (
                  <Chip
                    key={index}
                    label={name}
                    className="badge"
                    style={{
                      backgroundColor: 'honeydew',
                      color: 'green',
                      borderColor: 'green',
                    }}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <em style={{ color: "#aaa" }}>Sin empresas asociadas</em>
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );  

  return (
    <>
      <DashboardLayout className="justify-content-center">

        <Card className="card-configuraciones">
          <CardHeader className="card-header"
            title={<h3> Configuración de Paises </h3>}
            subheader={
              <Row className="card-config-header">
                <div className="card-config-header-left">
                  <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                    <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                  </Form>

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
                        countryName: '',
                        isoCode: '',
                        coinName: ''
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
            <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={getscountries.length} />
          </CardContent>
        </Card >
      </DashboardLayout >
    </>
  );
}
