import { Box, Container, Stack } from '@mui/material';
import PracticeOverviewCard from './components/PracticeOverviewCard';
import ReadyForDoctorPanel from './components/ReadyForDoctorPanel';
import AppointmentsPanel from './components/AppointmentsPanel';
import DrFirstPanel from './components/DrFirstPanel';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <PracticeOverviewCard />
          <AppointmentsPanel />
          <DrFirstPanel />
          <ReadyForDoctorPanel />
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
