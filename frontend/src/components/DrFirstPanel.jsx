import { memo } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useDrFirst } from '../hooks/useDashboardData';

function DrFirstPanelInner() {
  const { data } = useDrFirst();

  const sections = data?.sections ?? [];

  return (
    <Card elevation={1}>
      <CardContent sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          DrFirst Medication Refill/Action
        </Typography>
        <Grid container spacing={1}>
          {sections.map((section) => (
            <Grid key={section.id} item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: '#f5f9ff',
                  border: '1px solid #d6e4ff',
                  px: 2,
                  py: 1.5,
                  height: '100%',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 0.5 }}
                >
                  {section.title}
                </Typography>
                {section.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                    }}
                  >
                    <Typography variant="caption">{item.label}</Typography>
                    <Typography variant="caption">{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

const DrFirstPanel = memo(DrFirstPanelInner);

export default DrFirstPanel;


