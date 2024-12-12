import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function GetBank() {
  const [id, setId] = useState("");
  const [bankName, setBankName] = useState("");
  const [error, setError] = useState("");
  const [bankDetails, setBankDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBankDetails(null);

    try {
      let response;
      if (id) {
        response = await fetch(`/api/bank/id/${id}`);
      } else if (bankName) {
        response = await fetch(`/api/bank/${bankName}`);
      } else {
        setError(
          "Please enter either a Bank ID or Bank Name to fetch details."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch bank details. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setBankDetails(data);
    } catch (err) {
      setError(err.message);
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
        Get Bank Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Bank ID"
              value={id}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setId(value);
                  if (value) setBankName(""); // Clear bankName if id is filled
                }
              }}
              fullWidth
              disabled={!!bankName} // Disable if bankName is filled
              placeholder="Enter numeric ID"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bank Name"
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
                if (e.target.value) setId(""); // Clear id if bankName is filled
              }}
              fullWidth
              disabled={!!id} // Disable if id is filled
              placeholder="Enter bank name"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!id && !bankName} // Disable button if both fields are empty
            >
              Get Bank
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
      {bankDetails && (
        <Alert severity="success" sx={{ marginTop: "20px" }}>
          <Typography variant="h6">Bank Details:</Typography>
          <pre>{JSON.stringify(bankDetails, null, 2)}</pre>
        </Alert>
      )}
    </Box>
  );
}
