import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectEmployees} from '../../features/user/userSlice';
import {selectListLoading} from '../../features/list/listSlice';
import {useEffect, useState} from 'react';
import {Button, CircularProgress, Container, IconButton, List, ListItem, ListItemText, TextField,} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {getEmployees} from '../../features/user/userThunk.js';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {useNavigate} from 'react-router-dom';

const Employees = () => {
  const dispatch = useAppDispatch();

  const employees = useAppSelector(selectEmployees);
  const listLoading = useAppSelector(selectListLoading);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleChangeSearchEmployees = (e) => {
    const { value } = e.target;
    if (!value) {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((item) =>
          item.full_name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <Container
        maxWidth={'lg'}
        sx={{
          pt: 2,
        }}
      >
        <Grid>
          <Grid container spacing={1}>
            <TextField
              autoComplete={'off'}
              type={'text'}
              label={'ФИО сотрудника'}
              name={'employees'}
              onChange={handleChangeSearchEmployees}
              sx={{
                flexGrow: '1',
              }}
            />
            <Button variant={'contained'} color={'error'}>
              <ClearIcon
                sx={{
                  fontSize: '30px',
                }}
              />
            </Button>
          </Grid>
          <List
            sx={{
              overflowX: 'auto',
              mt: 2,
              maxHeight: 'calc(100vh - 168px)',
            }}
          >
            {listLoading ? (
              <Grid container justifyContent={'center'}>
                <CircularProgress />
              </Grid>
            ) : (
              filteredEmployees.map((employee) => (
                <ListItem
                  key={employee.id}
                  disableGutters
                  secondaryAction={
                    <IconButton
                      aria-label="comment"
                      onClick={() => {
                        navigate(`/edit-employees/${employee.id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={employee.full_name} />
                </ListItem>
              ))
            )}
          </List>
        </Grid>
      </Container>
    </>
  );
};

export default Employees;
