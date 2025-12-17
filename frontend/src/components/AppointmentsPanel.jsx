import { memo, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useFilteredAppointments } from '../hooks/useDashboardData';

function AppointmentsPanelInner() {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const { data, refetch, isFetching } = useFilteredAppointments({
    size: 45,
    searchText,
  });

  const handleTabChange = (_e, newIndex) => setTabIndex(newIndex);

  const tabs = data?.tabs ?? [];
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
            Appointments
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <IconButton size="small" onClick={() => refetch()} disabled={isFetching}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            minHeight: 32,
            '& .MuiTab-root': {
              minHeight: 32,
              paddingX: 1.5,
            },
          }}
        >
          {tabs.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>

        <Box sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Appointment Type</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.patient}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.provider}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}

const AppointmentsPanel = memo(AppointmentsPanelInner);

export default AppointmentsPanel;


