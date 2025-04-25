import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  selectCardsReport,
  selectCardsReportLoading,
} from '../../features/reports/reportsSlice.js';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { exportToExcel } from '../../excelExporter.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  selectEmployees,
  selectEmployeesLoading,
  selectUser,
} from '../../features/user/userSlice.js';
import { getEmployees } from '../../features/user/userThunk.js';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { getCardsReport } from '../../features/reports/reportsThunk.js';
import Pagination from '../../Components/Pagination/Pagination.jsx';

const StatsByEmployees = () => {
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);

  const cardsReport = useAppSelector(selectCardsReport);
  const loading = useAppSelector(selectCardsReportLoading);
  const [filteredList, setFilteredList] = useState(cardsReport);
  const [exportExcel, setExportExcel] = useState([]);
  useEffect(() => {
    const newArr = [];
    filteredList.map((item) => {
      newArr.push({
        Сотрудник: item.spec_full_name,
        СИП: item.sip,
        Кол_во: item.count,
      });
    });
    setExportExcel(newArr);
  }, [filteredList]);

  useEffect(() => {
    setFilteredList(cardsReport);
  }, [cardsReport]);

  useEffect(() => {
    dispatch(getCardsReport());
  }, [dispatch]);

  useEffect(() => {
    if (!tableHeight) {
      setTableHeight(changeTableHeight);
      document.body.addEventListener('resize', changeTableHeight);
    }
  }, [tableHeight]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const user = useAppSelector(selectUser);

  const employees = useAppSelector(selectEmployees);
  const employeesLoading = useAppSelector(selectEmployeesLoading);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = 'filters-popup';

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getEmployees());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setSearchFields({
      employees: employees,
    });
  }, [dispatch, employees]);

  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);

  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight - 135);
  };

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    let newList = cardsReport;
    if (filteredEmployees.length > 0) {
      newList = newList.filter((item) =>
        filteredEmployees.some((employee) => item.sip === employee.sip)
      );
    }
    setFilteredList(newList);
  }, [filteredEmployees, cardsReport]);

  const handleToggle = (value, state, setState) => () => {
    const currentIndex = state.indexOf(value);
    const newChecked = [...state];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState(newChecked);
  };

  const [filters, setFilters] = useState({
    count: '',
    name: '',
    sip: '',
  });

  const handleFiltrationByOrder = (type) => {
    let newList = filteredList;
    if (type === 'name') {
      if (filters.name === 'up') {
        newList = [...newList].sort((a, b) =>
          b.spec_full_name.localeCompare(a.spec_full_name)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort((a, b) =>
          a.spec_full_name.localeCompare(b.spec_full_name)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'up',
        }));
      }
    }

    if (type === 'sip') {
      if (filters.sip === 'up') {
        newList = [...newList].sort((a, b) => Number(b.sip) - Number(a.sip));
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort((a, b) => Number(a.sip) - Number(b.sip));
        setFilters((prev) => ({
          ...prev,
          [type]: 'up',
        }));
      }
    }

    if (type === 'count') {
      if (filters.count === 'up') {
        newList = [...newList].sort(
          (a, b) => Number(b.count) - Number(a.count)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort(
          (a, b) => Number(a.count) - Number(b.count)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'up',
        }));
      }
    }
    setFilteredList(newList);
  };

  const [searchFields, setSearchFields] = useState({
    employees: [],
  });

  const handleChangeSearchFields = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setSearchFields({
        employees: employees,
      });
    } else {
      setSearchFields((prev) => ({
        ...prev,
        [name]: employees.filter((item) =>
          item.full_name.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  return (
    <>
      <Container variant={'h1'} maxWidth={'lg'}>
        <Grid container justifyContent="space-between" spacing={1} p={'20px'}>
          <Typography
            sx={{
              fontSize: '25px',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Подсчёт звонков по операторам
          </Typography>
          <Pagination
            list={filteredList}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <Button
            variant={'outlined'}
            onClick={() => exportToExcel(exportExcel, 'Стат-ка_по_сотрудникам')}
          >
            Экспорт
          </Button>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{
            height: `${tableHeight}px`,
            width: '100%',
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  '&>th': {
                    borderRight: '1px solid #515151',
                  },
                  '&>th>div>p': {
                    textAlign: 'center',
                  },
                  '&>th>div': {
                    gap: '10px',
                    alignItems: 'center',
                  },
                  '&>th>div>button': {
                    color: '#fff',
                  },
                }}
              >
                <TableCell>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>СИП</Typography>
                    <Button
                      variant={'text'}
                      onClick={() => handleFiltrationByOrder('sip')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        width: '25px',
                        height: '25px',
                        minWidth: 'unset',
                      }}
                    >
                      {filters.sip === 'down' ? (
                        <KeyboardArrowDownIcon fontSize={'small'} />
                      ) : (
                        <KeyboardArrowUpIcon fontSize={'small'} />
                      )}
                    </Button>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Typography>Сотрудник</Typography>
                    <Button
                      variant={'text'}
                      onClick={() => handleFiltrationByOrder('name')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        width: '25px',
                        height: '25px',
                        minWidth: 'unset',
                        ml: 'auto',
                      }}
                    >
                      {filters.name === 'down' ? (
                        <KeyboardArrowDownIcon fontSize={'small'} />
                      ) : (
                        <KeyboardArrowUpIcon fontSize={'small'} />
                      )}
                    </Button>
                    <Button
                      aria-describedby={id}
                      variant="text"
                      onClick={handleClick}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        width: '25px',
                        height: '25px',
                        minWidth: 'unset',
                      }}
                    >
                      <ManageAccountsIcon />
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <Grid
                        sx={{
                          minWidth: '300px',
                          background: 'rgb(41,41,41)',
                        }}
                      >
                        {employeesLoading ? (
                          <CircularProgress />
                        ) : (
                          <Grid
                            sx={{
                              bgcolor: 'background.paper',
                            }}
                          >
                            <Grid
                              container
                              spacing={1}
                              flexDirection={'column'}
                              sx={{
                                px: 1,
                              }}
                            >
                              <TextField
                                autoComplete={'off'}
                                type={'text'}
                                label={'ФИО сотрудника'}
                                name={'employees'}
                                onChange={handleChangeSearchFields}
                                sx={{
                                  width: '100%',
                                }}
                              />
                              <Button
                                variant={'contained'}
                                color={'error'}
                                sx={{
                                  width: '100%',
                                }}
                                onClick={() => setFilteredEmployees([])}
                              >
                                Очистить
                              </Button>
                            </Grid>
                            <List
                              sx={{
                                width: '100%',
                                overflow: 'auto',
                                maxHeight: '230px',
                              }}
                            >
                              {searchFields.employees.map((value) => (
                                <ListItem key={value.id} disablePadding>
                                  <ListItemButton
                                    role={undefined}
                                    onClick={handleToggle(
                                      value,
                                      filteredEmployees,
                                      setFilteredEmployees
                                    )}
                                    dense
                                  >
                                    <ListItemIcon>
                                      <Checkbox
                                        edge="start"
                                        checked={filteredEmployees.includes(
                                          value
                                        )}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                          'aria-labelledby': value.id,
                                        }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      id={value.id}
                                      primary={value.full_name}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                      </Grid>
                    </Popover>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>Кол-во</Typography>
                    <Button
                      variant={'text'}
                      onClick={() => handleFiltrationByOrder('count')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        width: '25px',
                        height: '25px',
                        minWidth: 'unset',
                      }}
                    >
                      {filters.count === 'down' ? (
                        <KeyboardArrowDownIcon fontSize={'small'} />
                      ) : (
                        <KeyboardArrowUpIcon fontSize={'small'} />
                      )}
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedList.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{item.sip}</TableCell>

                    <TableCell align="center">{item.spec_full_name}</TableCell>

                    <TableCell align="center">{item.count}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default StatsByEmployees;
