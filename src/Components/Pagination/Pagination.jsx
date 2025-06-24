import Grid from '@mui/material/Grid2';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';

const Pagination = ({
  list,
  setCurrentPage,
  currentPage,
  setItemsPerPage,
  itemsPerPage,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (itemsPerPage > 200) {
      setSnackbarOpen(true);
    }
  }, [itemsPerPage]);

  const handleCloseSnackBar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      alignItems={'center'}
      spacing={2}
      sx={{
        border: '1px solid #90caf9',
        borderRadius: '5px',
        color: '#90caf9',
        fontFamily: 'Roboto, sans-serif',
        px: 2,
      }}
    >
      <Grid container alignItems={'center'} spacing={'5px'}>
        Кол-во строк:
        <TextField
          type="number"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          variant={'filled'}
          sx={{
            borderRadius: '5px',
          }}
          inputProps={{
            min: 1,
            sx: {
              color: '#90caf9',
              padding: '5px 5px',
              maxWidth: '50px',
              textAlign: 'center',
            },
          }}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            При большом колличестве строк приложение будет виснуть!
          </Alert>
        </Snackbar>
      </Grid>
      <Grid>
        {(currentPage - 1) * itemsPerPage + 1} -{' '}
        {currentPage * itemsPerPage > list.length
          ? list.length
          : currentPage * itemsPerPage}
      </Grid>
      <Grid>
        <Button
          disabled={currentPage <= 1}
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
          sx={{
            minWidth: 'unset',
            p: '5px',
            borderRadius: '50%',
          }}
        >
          <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
        <Button
          disabled={
            (currentPage - 1) * itemsPerPage + itemsPerPage > list.length
          }
          onClick={() => {
            if ((currentPage - 1) * itemsPerPage + itemsPerPage < list.length) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
          sx={{
            minWidth: 'unset',
            p: '5px',
            borderRadius: '50%',
          }}
        >
          <ArrowRightIcon></ArrowRightIcon>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Pagination;
