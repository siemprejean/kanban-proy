// app/api/payrolls/route.js
export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!authHeader) {
      return Response.json({ error: "Token no enviado" }, { status: 401 });
    }

    if (!id) {
      return Response.json({ error: "ID no enviado" }, { status: 400 });
    }

    const res = await fetch(`http://10.2.1.174:35789/payments/seller_summaries?payroll_id=${payroll_id}`, {
      headers: {
        Authorization: authHeader, // Pasamos el token recibido desde el cliente
      },
    });

    if (!res.ok) {
      return Response.json({ error: "Error al obtener employees" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error en API interna:", error);
    return Response.json({ error: "Fallo interno" }, { status: 500 });
  }
}