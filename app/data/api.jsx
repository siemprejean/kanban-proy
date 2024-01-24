const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA2MTIwOTA4fQ.G0aVzk1ez0pgn6wTiI1dfjLghJi31aGKigE6i4h5-Ps'
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
        console.error('Error fetching brands:', error);
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
        console.error('Error fetching stores:', error);
        throw new Error('Failed to fetch stores');
    }
};

export const getRoles = async () => {
    try {
        const result = await fetch('http://10.2.1.174:35789/admin/roles', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA2MDM3NDE2fQ.oLMuxhVJLJQOv6LKLnjEolFXwvl0EcNNSh7eesJ_1pU'
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