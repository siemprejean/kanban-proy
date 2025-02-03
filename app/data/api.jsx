let token;
let token_temis = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzM4MzQ2NjA4fQ.NBK2iJy6GM3Um8buOLxB8UIvqcEbANMjx00BcIm97qQ"
if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
}
export const postLogin = async (loginData) => {
    try {
        console.log("loginData", loginData);
        const response = await fetch("http://10.2.1.84:6500/admin/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        console.log(response)
        if (response.ok) {
            const data = await response.json();            
            //setToken(data.token);
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear el Role');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }

};

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzM4NjMxMjY2fQ.gZuNy7fxG1ZCKCuHS7hfdQmLchqP39Tn8L451FHF3cE'
//EndPoints de Empresas
export const getCompanies = async () => {
    try {
        
        const res = await fetch('http://10.2.1.84:6500/general/companies', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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

export const getCompany = async (id) => {
    try {
        const res = await fetch(`http://10.2.1.84:6500/general/companies/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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
        const response = await fetch(`http://10.2.1.84:6500/general/companies/create`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({
                "name": companyData.name,
                "id_country": companyData.id_country
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
        const response = await fetch(`http://10.2.1.84:6500/general/companies/update/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({
                "name": companyData.name,
                "id_country": companyData.id_country
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

//Endpoints de Marcas
export const getBrands = async () => {
    try {
        const result = await fetch('http://10.2.1.84:6500/general/brands', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw new Error('Failed to fetch brands');
    }
};
export const postBrand = async (brandData) => {
    try {
        console.log("brandData", brandData);
        const response = await fetch('http://10.2.1.84:6500/general/brands/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: brandData.name,
                slug: brandData.name,
                id_company: brandData.id_company
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
        const response = await fetch(`http://10.2.1.84:6500/general/brands/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: brandData.name,
                slug: brandData.name,
                id_company: brandData.id_company
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
        const result = await fetch(`http://10.2.1.84:6500/general/brands/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching brand:', error);
        throw new Error('Failed to fetch brand');
    }
};

//ENDPOINTS DE ROLES
export const getRoles = async () => {
    try {
        const result = await fetch('http://10.2.1.84:6500/admin/roles', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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

export const getRole = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/admin/roles/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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
        const response = await fetch('http://10.2.1.84:6500/admin/roles/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
export const putRole = async (roleData, id) => {
    try {
        console.log("RoleData", roleData);
        const response = await fetch(`http://10.2.1.84:6500/admin/roles/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
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
            throw new Error('Error al actualizar el role');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};

//ENDPOINTS DE PERMISOS
export const getPermissions = async () => {
    try {
        const result = await fetch('http://10.2.1.84:6500/admin/permissions', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene Permission:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Permissions:', error);
        throw new Error('Failed to fetch Permissions');
    }
}

export const getPermission = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/admin/permissions/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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
        const response = await fetch('http://10.2.1.84:6500/admin/permissions/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        const response = await fetch(`http://10.2.1.84:6500/admin/permissions/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
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

//Endpoints de Store
export const getStores = async () => {
    try {
        console.log(`Esto tiene token: ${token} `)
        const result = await fetch('http://10.2.1.84:6500/general/stores/active', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw new Error('Failed to fetch stores');
    }
};

export const getStore = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/general/stores/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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
        const response = await fetch('http://10.2.1.84:6500/general/stores/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: storeData.name,
                slug: storeData.slug,
                id_brand: storeData.id_brand,
                retention: storeData.retention,
                surplus: storeData.surplus,
                incentive_sunday: storeData.incentive_sunday,
                icg_brand: storeData.icg_brand,
                icg_serie: storeData.icg_serie
            }, console.log("storeData", {
                name: storeData.name,
                slug: storeData.slug,
                id_brand: storeData.id_brand,
                retention: storeData.retention,
                surplus: storeData.surplus,
                incentive_sunday: storeData.incentive_sunday,
                icg_brand: storeData.icg_brand,
                icg_serie: storeData.icg_serie
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
        const response = await fetch(`http://10.2.1.84:6500/general/stores/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: storeData.name,
                slug: storeData.slug,
                id_brand: storeData.id_brand,
                retention: storeData.retention,
                surplus: storeData.surplus,
                incentive_sunday: storeData.incentive_sunday,
                icg_brand: storeData.icg_brand,
                icg_serie: storeData.icg_serie
            }, console.log("brandData", storeData.name)),

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
        const result = await fetch(`http://10.2.1.84:6500/general/countries`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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

// Endpoints de Sales
export const getSales = async () => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/payments/sales`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching ventas:', error);
        throw new Error('Failed to fetch ventas');
    }
};


// Endpoints Ventas por Tienda
export const getStore_Sales = async () => {
    try {
        const result = await fetch('http://10.2.1.84:6500/payments/store_summaries?payroll_id=1', {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${token_temis}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching ventas:', error);
        throw new Error('Failed to fetch ventas');
    }
};


//VENTAS Y ASISTENCIA //DETALLE DE EMPLEADO
export const getEmployee = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/general/employees/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
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
        const result = await fetch(`http://10.2.1.84:6500/general/employees`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to fetch employees');
    }
};

export const getPositions = async () => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/general/positions`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching positions:', error);
        throw new Error('Failed to fetch positions');
    }
};

export const getPayrolls = async () => {
    try {
        const result = await fetch(`http://10.2.1.84:6500/general/payrolls`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching positions:', error);
        throw new Error('Failed to fetch positions');
    }
};

export const getSellerSummaries = async (payroll_id) => {
    try {
        // const result = await fetch(`http://10.2.1.84:6500/general/payments/seller_summaries?payroll_id=${payroll_id}`, {
        const result = await fetch(`http://10.2.1.84:6500/payments/seller_summaries?payroll_id=${payroll_id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching positions:', error);
        throw new Error('Failed to fetch positions');
    }
};
