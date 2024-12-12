import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function AllBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("/api/bank");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setBanks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Banks
      </Typography>
      <Grid container spacing={3}>
        {banks.map((bank) => (
          <Grid item xs={12} sm={6} md={4} key={bank.bankId}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {bank.bankName} (ID: {bank.bankId})
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="body2">
                  Address: {bank.bankAddress}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="body2">
                  Established: {bank.bankYear}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="body2">
                  Employees: {bank.bankEmp}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="body2">
                  Branches: {bank.bankBranches}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="body2">
                  ATMs: {bank.bankAtms}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button href="/" sx={{ marginTop: "30px" }} variant="contained">
        Back
      </Button>
    </Box>
  );
}
