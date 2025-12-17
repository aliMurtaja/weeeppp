import { memo } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Typography } from '@mui/material';

const PRODUCTS = ['EMR', 'PMS', 'RCM'];

function ProductHeaderInner({ value, onChange }) {
  const currentIndex = PRODUCTS.indexOf(value);

  const handleChange = (_event, newIndex) => {
    const newValue = PRODUCTS[newIndex];
    if (newValue && onChange) {
      onChange(newValue);
    }
  };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={1}
      sx={{
        top: 0,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 40,
          px: { xs: 1.5, md: 3 },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, mr: 4 }}
        >
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={currentIndex === -1 ? 0 : currentIndex}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              minHeight: 32,
              '& .MuiTab-root': {
                minHeight: 32,
                textTransform: 'none',
                fontSize: 14,
                fontWeight: 600,
              },
            }}
          >
            {PRODUCTS.map((p) => (
              <Tab key={p} label={p} />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const ProductHeader = memo(ProductHeaderInner);

export default ProductHeader;


