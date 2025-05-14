// app/api/companies/companie.js
export async function GET(req){
    try {
        const authHeader = req.headers.get('authorization');
    
        if (!authHeader) {
          return Response.json({ error: "Token no enviado" }, { status: 401 });
        }
        
        const res = await fetch('http://10.2.1.174:35789/general/companies', {
            headers: {
                Authorization: authHeader, // Pasamos el token recibido desde el cliente
            }
        });
        if (!res.ok) {
            return Response.json({ error: "Error al obtener compañias" }, { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    }catch (error) {
        console.error("Error en API interna:", error);
        return Response.json({ error: "Fallo interno" }, { status: 500 });
    }
};