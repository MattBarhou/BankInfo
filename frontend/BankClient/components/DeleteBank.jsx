import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function DeleteBank() {
  const [id, setId] = useState("");
  const [bankName, setbankName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteById = async () => {
    try {
      const response = await fetch(`/api/bank/id/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete bank by ID. Status: ${response.status}`
        );
      }

      setSuccessMessage(`Bank with ID ${id} has been deleted successfully!`);
      setError("");
      setId("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  const handleDeleteByName = async () => {
    try {
      const sanitizedBankName = bankName.trim();
      if (!sanitizedBankName) {
        throw new Error("Bank Name cannot be empty.");
      }
      const response = await fetch(`/api/bank/${sanitizedBankName}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete bank by Name. Status: ${response.status}`
        );
      }

      setSuccessMessage(
        `Bank with name "${sanitizedBankName}" has been deleted successfully!`
      );
      setError("");
      setbankName("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      handleDeleteById();
    } else if (bankName) {
      handleDeleteByName();
    } else {
      setError("Please enter either a Bank ID or Bank Name to delete.");
      setSuccessMessage("");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "500px",
        marginTop: "50px",
        justifySelf: "center",
        padding: "20px",
        boxShadow: 3,
        backgroundColor: "#FFFFF0",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Delete Bank
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Bank ID"
              value={id}
              disabled={!!bankName} // Disable field if bank name is entered
              onChange={(e) => {
                // Allow only numeric input
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setId(value);
                }
              }}
              fullWidth
              placeholder="Enter numeric ID"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bank Name"
              value={bankName}
              onChange={(e) => setbankName(e.target.value)}
              fullWidth
              disabled={!!id} // Disable field if ID is entered
              placeholder="Enter bank name"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              disabled={!id && !bankName} // Disable button if both fields are empty
            >
              Delete Bank
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" href="/" fullWidth>
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <Alert severity="error" sx={{ marginTop: "20px" }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ marginTop: "20px" }}>
          {successMessage}
        </Alert>
      )}
    </Box>
  );
}
