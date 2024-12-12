import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function UpdateBank() {
  const [id, setId] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankYear, setBankYear] = useState("");
  const [bankEmp, setBankEmp] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankBranches, setBankBranches] = useState("");
  const [bankAtms, setBankAtms] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      let response;

      const payload = {
        bankName,
        bankYear,
        bankEmp,
        bankAddress,
        bankBranches,
        bankAtms,
      };

      if (id) {
        response = await fetch(`/api/bank/id/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else if (bankName) {
        response = await fetch(`/api/bank/${bankName}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        setError("Please enter either a Bank ID or Bank Name to update.");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to update bank. Status: ${response.status}`);
      }

      setSuccessMessage("Bank updated successfully!");
      setId("");
      setBankName("");
      setBankYear("");
      setBankEmp("");
      setBankAddress("");
      setBankBranches("");
      setBankAtms("");
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
        Update Bank Details
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
              disabled={!!bankName} // Disable field if bank name is entered
              placeholder="Enter numeric ID"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bank Name"
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
              }}
              fullWidth
              placeholder="Enter bank name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bank Year"
              value={bankYear}
              onChange={(e) => setBankYear(e.target.value)}
              fullWidth
              placeholder="Enter year of establishment"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Employees"
              value={bankEmp}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setBankEmp(value);
                }
              }}
              fullWidth
              placeholder="Enter number of employees"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bank Address"
              value={bankAddress}
              onChange={(e) => setBankAddress(e.target.value)}
              fullWidth
              placeholder="Enter new address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Branches"
              value={bankBranches}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setBankBranches(value);
                }
              }}
              fullWidth
              placeholder="Enter number of branches"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of ATMs"
              value={bankAtms}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setBankAtms(value);
                }
              }}
              fullWidth
              placeholder="Enter number of ATMs"
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
              Update Bank
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
