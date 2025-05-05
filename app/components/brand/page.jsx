'use client'
import DashboardLayout from "../home/layout";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CardHeader from '@mui/material/CardHeader';
import {Button, Card, Paper, TableCell, TableRow, CardContent, FormControl, InputLabel, MenuItem, styled, Divider, Select,FormHelperText, Stack, Chip, DialogContentText} from "@mui/material";
import React, {useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import MuiModal from "../customcomponent/modal";
import MuiTable from "../customcomponent/table";
import MuiTextField from "../customcomponent/formcontrol";
import { getBrand, getBrands, getCompanies, getStores, postBrand, putBrand } from "@/app/data/api";
import MuiDialog from "../customcomponent/dialog";
import MuiSelect from "../customcomponent/Select";
import { VerifiedOutlined } from "@mui/icons-material";
import { useRef} from "react";

import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';

export default function Brand() {
    useEffect(() => {
        fetchData();
    }, []);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [detail, setDetail] = useState([]);
    const [companyId, setCompanyID] = useState(0);
    const [brandName, setBrandName] = useState('');
    const [updateBrandName, setUpdateBrandName] = useState('');
    const [getsCompanies, setCompanies] = useState([]);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const modalRef = useRef(null);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data
    .map((brand) => ({
        ...brand,
        stores: brand.stores.filter((store) =>
            (store.name || store.store_name || '').toLowerCase().includes(searchTerm.toLowerCase())
          )      
    }))
    .filter((brand) =>
        brand.stores.length > 0  // Only include brands that have stores that match the search term
    );

    const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate() };
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openModalCreate = () => setModalCreateOpen(true);
    const closeModalCreate = () => setModalCreateOpen(false);

    const columnsTable = [{ label: 'ID', field: 'id' },
    { label: 'Marca', field: 'name' },
    { label: 'Tiendas', field: 'stores', render: (row) => row.brands.join(', ') },
    { label: '', field: '' }];

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

    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCancelCreate = () => {
        setBrandName('');
        setCompanyID('');
    };

    const timeoutModal = async (val) => {
        if (val === 1) {
            setMessage("Marca creada exitosamente!!");
          setTimeout(() => closeModalCreate(), 2000);
        } else {
            setMessage("Marca actualizada exitosamente!!");
          setTimeout(() => closeModal(), 2000);
        }
      
        setSuccessModalOpen(true);
        setTimeout(() => setSuccessModalOpen(false), 2000);
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

    const [errors, setErrors] = useState({
        brandName: '',
        companyId: ''
      });

    const validateFields = () => {
        const newErrors = {
          brandName: '',
          companyId: ''
        };
      
        if (!brandName.trim()) {
          newErrors.brandName = 'Debe colocar un nombre.';
        } else if (brandName.length > 50) {
          newErrors.brandName = 'Máximo 50 caracteres.';
        }
      
        if (!companyId) {
          newErrors.companyId = 'Debe seleccionar una empresa.';
        }
      
        setErrors(newErrors);
      
        return !newErrors.brandName && !newErrors.companyId;
    };

    const fetchData = async () => {
        try {
            const companies = await getCompanies();
            const brands = await getBrands();
            const stores = await getStores();

            // Asociar tiendas a marcas
            const dataWithStores = brands.map((brand) => ({
                ...brand,
                stores: stores.filter((store) => store.brand_id === brand.id),
            }));
            setCompanies(companies);
            setData(dataWithStores);
            console.log("Mapped brands with stores:", dataWithStores);
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
                company_id: companyId,
            })
            // Llamar a la función en api/empresas.js para crear una nueva empresa
            let responseData = await postBrand({
                name: brandName,
                slug: brandName,
                company_id: companyId,
            });
            console.log("Esto tiene responseData ", responseData)
            // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario

            timeoutModal(1);
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
                company_id: companyId,
            })
            // Llamar a la función en api/empresas.js para crear una nueva empresa
            let responseData = await putBrand({
                name: updateBrandName,
                slug: updateBrandName,
                company_id: companyId,
            }, id);
            console.log("Esto tiene responseData ", responseData)
            // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
            timeoutModal();
            fetchData();
        } catch (error) {
            // Manejar errores en caso de que la creación falleç
            console.error('Error al crear la marca:', error.message);
        }
    }

    const fetchDetail = async (id) => {
        try {
          const brand = await getBrand(id);
          const companies = await getCompanies();
      
          const company = companies.find((company) => company.id === brand.company_id);
      
          const brandWithCompany = {
            ...brand,
            company,
          };
      
          setDetail(brandWithCompany);
          setUpdateBrandName(brand.name);
          setCompanyID(brand.company_id);
        } catch (error) {
          console.error('Error fetching brand detail:', error);
        }
      };

    const titledialogSucces = (<>
        <h4><VerifiedOutlined /> REGISTRO EXITOSO</h4>
        <Divider className="divider" />
    </>
    );

    const titledialogSuccesedit = (<>
        <h4><VerifiedOutlined /> ACTUALIZACION EXITOSA</h4>
        <Divider className="divider" />
    </>
    );
    
    const contentDialogSucces = (
        <DialogContentText style={{ color: "black" }}>
            {message}
        </DialogContentText>);

    //MODAL CREACION MARCAS
    const modalCreate = (
        <div ref={modalRef} className="modal-content">
            <MuiTextField title="Nombre de la Marca:" value={brandName} onChange={handleChange} className="modal-col-6" error={!!errors.brandName} helperText={errors.brandName}/>
            <FormControl className="modal-col-6" style={{ top: 25 }} error={!!errors.companyId}>
                <InputLabel id="empresa-label" style={{ top: 5, left: 10 }}>
                Empresa
                </InputLabel>
            <Select
                labelId="empresa-label"
                value={companyId ?? ''}
                onChange={(e) => setCompanyID(parseInt(e.target.value))}
            >
                {getsCompanies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
                {company.name}
            </MenuItem>
            ))}
            </Select>
                {errors.companyId && (
            <FormHelperText>{errors.companyId}</FormHelperText>
                )}
            </FormControl>
            <Row style={{ width: "100%" }}>
                <Col className="modal-col-btn">
                <Button onClick={() => {
                    if (validateFields()) {
                        onSubmit();
                    }
                }}>
                <SaveIcon /> GUARDAR
                </Button>
                    <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} className="modal-dialog-container" />
                </Col>
            </Row>
        </div>
    );

    //MODAL EDICION MARCAS
    const modalContent = (
        <div ref={modalRef} className="modal-content">
            <MuiTextField title="Nombre de la Marca:" value={updateBrandName} onChange={(e) => setUpdateBrandName(e.target.value)} className="modal-col-6" />
            <MuiSelect title="Empresa" items={getsCompanies} values={companyId} onChange={(value) => setCompanyID(parseInt(value, 10))} className="modal-col-6"/>
            <Row style={{ width: "100%" }}>
                <Col className="modal-col-btn">
                    <Button onClick={() => updateBrand(detail.id)}>
                        <SaveIcon /> GUARDAR
                    </Button>
                    <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSuccesedit} content={contentDialogSucces} className="modal-dialog-container" />
                </Col>
            </Row>
        </div>
    );

// TABLA MARCAS
const body = (
    <>
      {filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="left" className="highlight-column">
              {row.name}
            </TableCell>
            <TableCell align="left" className="highlight-column">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ flexWrap: 'wrap' }}
              >
                {row.stores.map((store, index) => (
                  <Chip
                    key={index}
                    label={store.name || store.store_name}
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
            </TableCell>
            <TableCell align="center" className="button-td">
              <Button className="edit-button-g" onClick={() => handleRowClick(row.id)}>
                <EditIcon />
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
    </>
  );
  

    //BOTON CREAR Y SEARCH
    return (
        <>
            <DashboardLayout className="justify-content-center">
                <Card className="card-configuraciones">
                    <CardHeader className="card-header"
                        title={<h3> Configuración de Marca </h3>}
                        subheader={
                            <Row className="card-config-header">
                                <div className="card-config-header-left">
                                    <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                                        <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                                    </Form>
                                </div>
                                <div className="card-header-buttons-company">
                                    <Styledbuttons style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => {openModalCreate() }}>
                                        <AddIcon /> CREAR
                                    </Styledbuttons>
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
                                        title="CREAR MARCA"
                                        content={modalCreate}
                                        customStyles={modalStyles}
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