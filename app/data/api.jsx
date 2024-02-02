const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA3MDA2MTE4fQ.IhZJVuJnRzC-ife1y25MTOA6XpF4LTVSn4OQAlSPlMg'
//EndPoints de Empresas
export const getCompanies = async () => {
    try {
        const res = await fetch('http://10.2.1.174:35789/general/companies', {
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
        const res = await fetch(`http://10.2.1.174:35789/general/companies/${id}`, {
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
        const response = await fetch('http://10.2.1.174:35789/general/companies/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: companyData.name,
                id_country: companyData.id_country
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Esto tiene data:", data)
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
        const result = await fetch('http://10.2.1.174:35789/general/brands', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene marca:', data);
        return data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw new Error('Failed to fetch brands');
    }
};
export const postBrand = async (brandData) => {
    try {
        console.log("brandData", brandData);
        const response = await fetch('http://10.2.1.174:35789/general/brands/create', {
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
            console.log("Esto tiene data:", data)
            return data; // Puedes devolver datos adicionales si es necesario
        } else {
            throw new Error('Error al crear la marcas');
        }
    } catch (error) {
        throw new Error('Error en la solicitud:', error);
    }
};
export const getRoles = async () => {
    try {
        const result = await fetch('http://10.2.1.174:35789/admin/roles', {
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
export const getBrand = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/brands/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene marca:', data);
        return data;
    } catch (error) {
        console.error('Error fetching brand:', error);
        throw new Error('Failed to fetch brand');
    }
};
export const getStores = async () => {
    try {
        const result = await fetch('http://10.2.1.174:35789/general/stores', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene store:', data);
        return data;
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw new Error('Failed to fetch stores');
    }
};
export const getStore = async (id) => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/stores/${id}`, {
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
export const getEmployees = async () => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/employees`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        const data = await result.json();
        console.log('Esto tiene employees:', data);
        return data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to fetch employees');
    }
};
export const getCountries = async () => {
    try {
        const result = await fetch(`http://10.2.1.174:35789/general/countries`, {
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