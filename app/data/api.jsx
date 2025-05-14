let token_temis;
let token_expiration_date;
if (typeof window !== 'undefined') {
    token_temis = localStorage.getItem('token');
    token_expiration_date = localStorage.getItem('token_expiration_date');
}

export const postLogin = async (loginData) => {

    try {
        console.log("loginData", loginData);
        const response = await fetch("http://10.2.1.174:35789/admin/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        if (response.ok) {
            const data = await response.json();            
            //settoken_temis(data.token_temis);
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            return response;
        }
    } catch (error) {
        return error;
    }

};

export const mostrarUser = async (id) => {
    try {
      const response = await fetch(`http://10.2.1.174:35789/admin/users/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token_temis}`
        }
      });
  
      const result = await response.json();
      return result;
  
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  };  

export const switchPass = async () =>{
    console.log(idModal)
    console.log("password nuevo" + user_password)
    console.log(`Form submitted, ${user_password}`);
    try {
        const res = await fetch(`http://10.2.1.174:35789/admin/users/password-change/${idModal}`, {
            method: 'PUT',
            headers: new Headers({

                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer  ${token_temis}`
            }),
            body: JSON.stringify({
                user_id: idModal,
                user_password: user_password,
                remember_password: user_password
            })
        })
        let resJson = await res.json();
        console.log(resJson)
        if (res.status === 200) {
            console.log("logro put ");
        
            setPassword(res.user_password);
        
            setMessage("bien");
        } else {

            setMessage("Ocurrio un error");
        }
    } catch (err) {
        console.log(err);
    }
};

export const updateUserPermissions = async (data) => {
    try {
      const response = await fetch(`http://10.2.1.174:35789/admin/users/update/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token_temis}`
        },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          id_company: data.id_company,
          status_user: data.status_user,
          roles: data.roles,
        }),
      });
  
      const result = await response.json();
      console.log("Usuario actualizado:", result);
      return result;
    } catch (err) {
      console.error("Error actualizando el usuario:", err);
      throw err;
    }
  };
  

export const getUser = async () => {
    try {
        const response = await fetch(`http://10.2.1.174:35789/admin/users`, {
            method: "GET",
            headers: new Headers({

                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token_temis}`
            })

        });
        const result = await response.json();
        return result;
    
    } catch (err) {
        console.log(err);
    }
}

export const getRol = async () => {
    try {
        const response = await fetch(`http://10.2.1.174:35789/admin/roles`, {
            method: "GET",
            headers: new Headers({

                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token_temis}`
            })

        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

//EndPoints de Empresas
export const getCompanies = async () => {
    try {
        
        const result = await fetch('/api/companies', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene compañias:', data);
        return data;
    }catch (error) {
        console.error('Error fetching companies:', error);
        throw new Error('Failed to fetch companies');
    }
};

export const getCompany = async (id) => {
    try {
        const res = await fetch(`http://10.2.1.174:35789/general/companies/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching companies:', error);
        throw new Error('Failed to fetch companies');
    }
};

export const postCompany = async (companyData) => {
    try {
        console.log("companyData", companyData);
        const response = await fetch(`http://10.2.1.174:35789/general/companies/create`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            }),
            body: JSON.stringify({
                "name": companyData.name,
                "country_id": companyData.country_id
            }),
        });
        
        const data = await response.json();
        if (response.ok) {

            
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la empresa');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const putCompany = async (companyData, id) => {
    try {
        console.log("companyData", companyData);
        console.log("id", id);
        const response = await fetch(`http://10.2.1.174:35789/general/companies/update/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            }),
            body: JSON.stringify({
                "name": companyData.name,
                "country_id": companyData.country_id
            }),
        });
       
        const data = await response.json();
        if (response.ok) {

            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la empresa');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const getBrands = async () => {
    try {
        
        const result = await fetch('/api/brands', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene marcas:', data);
        return data;
    }catch (error) {
        console.error('Error fetching marcas:', error);
        throw new Error('Failed to fetch marcas');
    }
};

export const postBrand = async (brandData) => {
    try {
        console.log("brandData", brandData);
        const response = await fetch('http://10.2.1.174:35789/general/brands/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: brandData.name,
                slug: brandData.name,
                company_id: brandData.company_id
            }, console.log("brandData", brandData.name)),

        });
        if (response.ok) {
            const data = await response.json();
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la marcas');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};
export const putBrand = async (brandData, id) => {
    try {
        console.log("brandData", brandData);
        const response = await fetch(`http://10.2.1.174:35789/general/brands/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: brandData.name,
                slug: brandData.name,
                company_id: brandData.company_id
            }, console.log("brandData", brandData.name)),

        });
        if (response.ok) {
            const data = await response.json();
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la marcas');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const getBrand = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/brands/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching brand:', error);
        throw new Error('Failed to fetch brand');
    }
};

export const getRoles = async () => {
    try {
  
      const result = await fetch('/api/roles', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token_temis}`,
        },
      });
  
      if (!result.ok) {
        throw new Error(`Error del servidor: ${result.status}`);
      }
  
      const data = await result.json();
      console.log('Esto tiene posiciones:', data);
      return data;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw new Error('Failed to fetch positions');
    }
  };

export const getRole = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/admin/roles/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene role:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Roles:', error);
        throw new Error('Failed to fetch role');
    }
}

export const postRole = async (roleData) => {
    try {
        console.log("RoleData", roleData);
        const response = await fetch('http://10.2.1.174:35789/admin/roles/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: roleData.name,
                slug: roleData.slug,
                status_role: roleData.status_role,
                permissions: roleData.permissions
            }, console.log("roleData", roleData.name)),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear el Role');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const postUser = async (userData) => {
    try {
        console.log("RoleData", userData);
        const response = await fetch('http://10.2.1.174:35789/admin/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: userData.name,
                username: userData.username,
                email: userData.email,
                id_company: userData.id_company,
                user_password: userData.user_password,
                remember_password: userData.user_password,
                avatar: userData.avatar,
                status_user: userData.status_user,
                roles: userData.roles
            }, console.log("userData", userData.name)),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear el Role');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const putRole = async (roleData, id) => {
    try {
        console.log("RoleData", roleData);
        const response = await fetch(`http://10.2.1.174:35789/admin/roles/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: roleData.name,
                slug: roleData.slug,
                status_role: roleData.status_role,
                permissions: roleData.permissions
            }),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al actualizar el role');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

//ENDPOINTS DE PERMISOS
export const getPermissions = async () => {
    try {
  
      const result = await fetch('/api/permissions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token_temis}`,
        },
      });
  
      if (!result.ok) {
        throw new Error(`Error del servidor: ${result.status}`);
      }
  
      const data = await result.json();
      console.log('Esto tiene posiciones:', data);
      return data;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw new Error('Failed to fetch positions');
    }
  };

export const getPermission = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/admin/permissions/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene Permission:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Permission:', error);
        throw new Error('Failed to fetch Permission');
    }
}

export const postPermission = async (permissionData) => {
    try {
        console.log("permissionsData", permissionData);
        const response = await fetch('http://10.2.1.174:35789/admin/permissions/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: permissionData.name,
                slug: permissionData.slug,
                http_method: permissionData.http_method,
                http_path: permissionData.http_path
            }, console.log("brandData", permissionData.name)),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear el permiso');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const putPermission = async (permissionData, id) => {
    try {
        console.log("permissionData", permissionData);
        const response = await fetch(`http://10.2.1.174:35789/admin/permissions/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                name: permissionData.name,
                slug: permissionData.slug,
                http_method: permissionData.http_method,
                http_path: permissionData.http_path
            }, console.log("brandData", permissionData.name)),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al actualizar el permiso');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const getStores = async () => {
    try {
        
        const result = await fetch('/api/stores', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene tiendas:', data);
        return data;
    }catch (error) {
        console.error('Error fetching stores:', error);
        throw new Error('Failed to fetch stores');
    }
};

export const getStore = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/stores/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene store:', data);
        return data;
    } catch (error) {
        console.error('Error fetching store:', error);
        throw new Error('Failed to fetch store');
    }
};

export const postStore = async (storeData) => {
    try {
        console.log("storeData", storeData);
        const response = await fetch('http://10.2.1.174:35789/general/stores/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                store_name: storeData.store_name,
                slug: storeData.slug,
                brand_id: storeData.brand_id,
                retention: storeData.retention,
                surplus: storeData.surplus,
                incentive_sunday: storeData.incentive_sunday,
                icg_brand: storeData.icg_brand,
                icg_serie: storeData.icg_serie,
                incentive_type: storeData.incentive_type,
                store_status: storeData.store_status
            }, console.log("storeData", {
                name: storeData.name,
                slug: storeData.slug,
                id_brand: storeData.id_brand,
                retention: storeData.retention,
                surplus: storeData.surplus,
                incentive_sunday: storeData.incentive_sunday,
                icg_brand: storeData.icg_brand,
                icg_serie: storeData.icg_serie,
                incentive_type: storeData.incentive_type,
                store_status: storeData.store_status
            })),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la marcas');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

export const putStore = async (storeData, id) => {
    try {
        console.log("storeData", storeData);
        const response = await fetch(`http://10.2.1.174:35789/general/stores/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            },
            body: JSON.stringify({
                store_name: storeData.store_name,
                slug: storeData.store_name,
                brand_id: storeData.brand_id,
                retention: storeData.retention,
                surplus: storeData.surplus,
                incentive_sunday: storeData.incentive_sunday,
                incentive_type: storeData.incentive_type,
                icg_brand: storeData.icg_brand,
                icg_serie: storeData.icg_serie
            }, console.log("brandData", storeData.store_name)),

        });
        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la marcas');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

//Endpoints de Countries
export const getCountries = async () => {
    try {
        const result = await fetch(`/api/countries`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token_temis}`,
              },
        });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }
        const data = await result.json();
        console.log('Esto tiene countries:', data);
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
    }
};

//Endpoints de Countries
export const getCountry = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/countries/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene countries:', data);
        return data; countries
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
    }
};

export const getSales = async () => {
    try {
        
        const result = await fetch('/api/sales', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene empleados activos :', data);
        return data;
    }catch (error) {
        console.error('Error fetching employees active:', error);
        throw new Error('Failed to fetch employees active');
    }
};


export const getStore_Sales = async (id) => {
    try {   
        const result = await fetch(`/api/store_sales?id=${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene tiendas activos :', data);
        return data;
    }catch (error) {
        console.error('Error fetching employees active:', error);
        throw new Error('Failed to fetch employees active');
    }
};

//VENTAS Y ASISTENCIA //DETALLE DE EMPLEADO

export const getEmployeeActives = async () => {
    try {
        
        const result = await fetch('/api/employees_active', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene empleados activos :', data);
        return data;
    }catch (error) {
        console.error('Error fetching employees active:', error);
        throw new Error('Failed to fetch employees active');
    }
};

export const getEmployee = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/employees/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching empleados:', error);
        throw new Error('Failed to fetch empleados');
    }
};

export const getEmployees = async () => {
    try {
        
        const result = await fetch('/api/employees', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene empleados:', data);
        return data;
    }catch (error) {
        console.error('Error fetching employee:', error);
        throw new Error('Failed to fetch employee');
    }
};


export const getPositions = async () => {
    try {
  
      const result = await fetch('/api/positions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token_temis}`,
        },
      });
  
      if (!result.ok) {
        throw new Error(`Error del servidor: ${result.status}`);
      }
  
      const data = await result.json();
      console.log('Esto tiene posiciones:', data);
      return data;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw new Error('Failed to fetch positions');
    }
  }; 

export const getPayrolls = async () => {
    try {
  
      const result = await fetch('/api/payrolls', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token_temis}`,
        },
      });
  
      if (!result.ok) {
        throw new Error(`Error del servidor: ${result.status}`);
      }
  
      const data = await result.json();
      console.log('Esto tiene payroll:', data);
      return data;
    } catch (error) {
      console.error('Error fetching payroll:', error);
      throw new Error('Failed to fetch payroll');
    }
  };

  export const getSellerSummaries = async (id) => {
    try {   
        const result = await fetch(`/api/seller_summaries?id=${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token_temis}`,
            },
          });
        if (!result.ok) {
            throw new Error(`Error del servidor: ${result.status}`);
        }

        const data = await result.json();
        console.log('Esto tiene empleados activos :', data);
        return data;
    }catch (error) {
        console.error('Error fetching employees active:', error);
        throw new Error('Failed to fetch employees active');
    }
};

export const getSellerSummariesDaily = async (payroll_id,store_id,employee_id) => {
    try {
      const result = await fetch(`/api/seller_summaries_daily?payroll_id=${payroll_id}&store_id=${store_id}&employee_id=${employee_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token_temis}`
        }
      });
      const data = await result.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching ventas:', error);
      throw new Error('Failed to fetch ventas');
    }
  };

const token_vencido = () =>{
    const hoy = new Date();
    const fecha_token = new Date (token_expiration_date);

    if (fecha_token < hoy){
        return true;
    }else{
        return false;
    }


   
}

export const validarToken = () =>{
    if(token_temis == null){
        return 1;
    }else if (token_vencido()){
        return 2;
    }else{
        return 3;
    }
}

export const postCountry = async (coutryData) => {
    try {
        console.log("coutryData", coutryData);
        const response = await fetch(`http://10.2.1.174:35789/general/countries/create`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_temis}`
            }),
            body: JSON.stringify({
                "name": coutryData.name,
                "ISOCode": coutryData.ISOCODE,
                "currency": coutryData.currency
            }),
        });
        
        const data = await response.json();
        if (response.ok) {

            
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la empresa');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};