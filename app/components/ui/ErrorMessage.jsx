import { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function ErrorMessagex({mensaje}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)} sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000, // Asegura que esté encima de otros elementos
        }} >
        ¡Error!
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            ¡Error!
          </Typography>
          <Typography>
          {mensaje}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
            sx={{ mt: 2 }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
