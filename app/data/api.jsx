export const getCompanies = async () => {
    try {
        const res = await fetch('http://10.2.1.174:35789/general/companies', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA1OTk2NDA1fQ.S4eTlMACfm_3wGbZEhww8EYQR8FNCpkqF91PP1l1vuw'
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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA1OTk2NDA1fQ.S4eTlMACfm_3wGbZEhww8EYQR8FNCpkqF91PP1l1vuw'
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


export const getApi = async (props) => {
    console.log(props)
    try {
        const res = await fetch(`http://10.2.1.174:35789/${dir}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA1OTk2NDA1fQ.S4eTlMACfm_3wGbZEhww8EYQR8FNCpkqF91PP1l1vuw'
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




