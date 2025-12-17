import { memo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useReadyForDoctor } from '../hooks/useDashboardData';

function ReadyForDoctorPanelInner() {
  const { data } = useReadyForDoctor();
  const rows = data?.rows ?? [];

  return (
    <Card elevation={1}>
      <CardContent sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Ready for Doctor
          </Typography>
          <TextField
            size="small"
            placeholder="Search a patient"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Provider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.patient}</TableCell>
                  <TableCell>{row.room}</TableCell>
                  <TableCell>{row.provider}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const ReadyForDoctorPanel = memo(ReadyForDoctorPanelInner);

export default ReadyForDoctorPanel;


