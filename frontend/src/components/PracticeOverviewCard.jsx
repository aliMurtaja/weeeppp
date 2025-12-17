import { memo } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { usePracticeOverview } from '../hooks/useDashboardData';

function PracticeOverviewCardInner() {
  const { data } = usePracticeOverview();

  return (
    <Card elevation={1}>
      <CardContent sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          Practice at a Glance
        </Typography>
        <Grid container spacing={0.5}>
          {(data?.metrics ?? []).map((metric) => (
            <Grid key={metric.id} item xs={12} sm={2.4}>
              <Box
                sx={{
                  bgcolor: '#f5f9ff',
                  border: '1px solid #d6e4ff',
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ textTransform: 'capitalize', color: 'text.secondary' }}
                >
                  {metric.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {metric.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

const PracticeOverviewCard = memo(PracticeOverviewCardInner);

export default PracticeOverviewCard;


