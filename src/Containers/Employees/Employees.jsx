import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDeleteLoading,
  selectEmployees,
} from '../../features/user/userSlice';
import { selectListLoading } from '../../features/list/listSlice';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { deleteUser, getEmployees } from '../../features/user/userThunk.js';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const dispatch = useAppDispatch();

  const employees = useAppSelector(selectEmployees);
  const listLoading = useAppSelector(selectListLoading);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const [searchEmployees, setSearchEmployees] = useState('');

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    if (!searchEmployees) {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((item) =>
          item.full_name.toLowerCase().includes(searchEmployees.toLowerCase())
        )
      );
    }
  }, [searchEmployees, employees]);

  const handleChangeSearchEmployees = (e) => {
    setSearchEmployees(e.target.value);
  };

  const [open, setOpen] = useState(null);
  const handleOpen = (user) => setOpen(user);
  const handleClose = () => setOpen(null);

  const onDelete = async () => {
    await dispatch(deleteUser(open));
    await dispatch(getEmployees());
    handleClose();
    setSearchEmployees('');
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
              value={searchEmployees}
              sx={{
                flexGrow: '1',
              }}
            />
            <Button
              variant={'contained'}
              color={'error'}
              onClick={() => setSearchEmployees('')}
            >
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
                    <>
                      <IconButton
                        aria-label="comment"
                        onClick={() => {
                          navigate(`/edit-employees/${employee.id}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="comment"
                        onClick={() => handleOpen(employee)}
                        loading={deleteLoading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={employee.full_name} />
                </ListItem>
              ))
            )}
          </List>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                fontFamily: 'Roboto, sans-serif',
                borderRadius: '20px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  textAlign: 'center',
                }}
              >
                Вы действительно хотите удалить пользователя - {open?.full_name}{' '}
                ({open?.sip})
              </Typography>
              <Button
                variant={'outlined'}
                color={'error'}
                loading={deleteLoading}
                onClick={onDelete}
                sx={{
                  width: '100%',
                  mt: 2,
                  fontSize: '22px',
                }}
              >
                Удалить
              </Button>
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={handleClose}
                sx={{
                  width: '100%',
                  mt: 2,
                  fontSize: '22px',
                }}
              >
                Отмена
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Container>
    </>
  );
};

export default Employees;
