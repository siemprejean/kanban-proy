export async function POST(req) {
    try {
      const body = await req.json();
  
      if (!body || !body.username || !body.password) {
        return Response.json({ error: "Faltan credenciales" }, { status: 400 });
      }
  
      const response = await fetch(`http://10.2.1.174:35789/admin/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return Response.json({ error: "Error al autenticar", detail: errorData }, { status: response.status });
      }
  
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      console.error("Error en API interna:", error);
      return Response.json({ error: "Fallo interno del servidor" }, { status: 500 });
    }
  }
  