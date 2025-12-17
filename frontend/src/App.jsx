import { useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import ProductHeader from './components/ProductHeader';
import PracticeOverviewCard from './components/PracticeOverviewCard';
import ReadyForDoctorPanel from './components/ReadyForDoctorPanel';
import AppointmentsPanel from './components/AppointmentsPanel';
import DrFirstPanel from './components/DrFirstPanel';

function App() {
  const [selectedProduct, setSelectedProduct] = useState('EMR');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <ProductHeader value={selectedProduct} onChange={setSelectedProduct} />
      <Container maxWidth="lg" sx={{ pt: 2, pb: 3 }}>
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
