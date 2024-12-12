import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function CreateBank() {
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankYear: 0,
    bankEmp: 0,
    bankAddress: "",
    bankBranches: 0,
    bankAtms: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankInfo),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setSuccessMessage("Bank created successfully");
      setBankInfo({
        bankName: "",
        bankYear: 0,
        bankEmp: 0,
        bankAddress: "",
        bankBranches: 0,
        bankAtms: 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "500px",
          padding: "20px",
          boxShadow: 3,
          marginTop: "50px",
          justifySelf: "center",
          backgroundColor: "#FFFFF0",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Bank
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Bank Name"
                name="bankName"
                value={bankInfo.bankName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bank Address"
                name="bankAddress"
                value={bankInfo.bankAddress}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Year Established"
                name="bankYear"
                value={bankInfo.bankYear}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of Employees"
                name="bankEmp"
                value={bankInfo.bankEmp}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of Branches"
                name="bankBranches"
                value={bankInfo.bankBranches}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of ATMs"
                name="bankAtms"
                value={bankInfo.bankAtms}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" href="/" fullWidth>
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
        {successMessage && (
          <Typography
            variant="body1"
            sx={{ marginTop: "20px", color: "green", fontWeight: "bold" }}
          >
            {successMessage}
          </Typography>
        )}
      </Box>
    </>
  );
}
