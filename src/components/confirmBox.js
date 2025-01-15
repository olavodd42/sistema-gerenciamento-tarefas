import {
  Button,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";

const Transition = forwardRef((props, ref) => {
  return <Fade ref={ref} {...props} />;
});

const ConfirmBox = ({ open, closeDialog, taskName, deleteFunction }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="md"
      scroll="body"
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ px: 8, py: 6, position: "relative" }}>
        <IconButton
          size="large"
          onClick={closeDialog}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          X
        </IconButton>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5">Deletar {taskName}</Typography>
              <Typography variant="body1">
                Você tem certeza que deseja deletar {taskName}?
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Button size="small" variant="outlined" color="primary" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button size="small" variant="outlined" color="primary" onClick={deleteFunction}>
                Deletar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBox;