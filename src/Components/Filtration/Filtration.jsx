import {
  Button,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  selectReasonsList,
  selectReasonsListLoading,
  selectSolutionsList,
  selectSolutionsListLoading,
} from '../../features/reasonsAndSolution/reasonsAndSolutionSlice.js';
import {
  selectEmployees,
  selectEmployeesLoading,
  selectUser,
} from '../../features/user/userSlice.js';
import { getEmployees } from '../../features/user/userThunk.js';
import {
  getReasonsList,
  getSolutionsList,
} from '../../features/reasonsAndSolution/reasonsAndSolutionThunk.js';
import { getList } from '../../features/list/listThunk.js';
import dayjs from 'dayjs';
import { useExportExcel } from '../../hooks.js';

const Filtration = ({
  setFilteredList,
  list,
  filtrationRequest,
  listPage,
  type,
  inactiveDate,
}) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredReasons, setFilteredReasons] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [filteredDate, setFilteredDate] = useState({
    createdAt: '',
    finishedAt: new Date(),
  });
  const { loadingExport, fetchCardsForUpload } = useExportExcel();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const reasons = useAppSelector(selectReasonsList);
  const reasonsLoading = useAppSelector(selectReasonsListLoading);

  const solutions = useAppSelector(selectSolutionsList);
  const solutionLoading = useAppSelector(selectSolutionsListLoading);

  const employees = useAppSelector(selectEmployees);
  const employeesLoading = useAppSelector(selectEmployeesLoading);

  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState({
    state: false,
    top: '',
    type: '',
  });

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
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
  }, [dispatch, user]);

  useEffect(() => {
    setSearchFields({
      employees: employees,
      reasons: reasons,
      solutions: solutions,
    });
  }, [dispatch, employees, reasons, solutions, hovered.type]);

  useEffect(() => {
    if (type === 'Карточки') {
      const reasonsIds = filteredReasons.map((item) => item.id);
      const solutionsIds = filteredSolutions.map((item) => item.id);
      const employeesSip = filteredEmployees.map((item) => item.sip);
      dispatch(
        getList({
          listPage: listPage,
          date: {
            ...filteredDate,
            finishedAt: dayjs(filteredDate.finishedAt)
              .add(1, 'day')
              .format('YYYY-MM-DD'),
          },
          reasons: reasonsIds,
          employees: employeesSip,
          solutions: solutionsIds,
        })
      );
    } else if (type === 'Неактивка') {
      setFilteredDate({
        createdAt: inactiveDate.createdAt,
        finishedAt: inactiveDate.finishedAt,
      });
    }
  }, [dispatch, listPage, type, inactiveDate]);

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

  const resetFiltration = () => {
    setFilteredReasons([]);
    setFilteredSolutions([]);
    setFilteredDate({
      createdAt: '',
      finishedAt: '',
    });
    setFilteredList(list);
  };

  const [searchFields, setSearchFields] = useState({
    employees: [],
    reasons: [],
    solutions: [],
  });
  const handleChangeSearchFields = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setSearchFields({
        employees: employees,
        reasons: reasons,
        solutions: solutions,
      });
    } else {
      if (name === 'employees') {
        setSearchFields((prev) => ({
          ...prev,
          [name]: employees.filter((item) =>
            item.full_name.toLowerCase().includes(value.toLowerCase())
          ),
        }));
      } else if (name === 'reasons') {
        setSearchFields((prev) => ({
          ...prev,
          [name]: reasons.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          ),
        }));
      } else if (name === 'solutions') {
        setSearchFields((prev) => ({
          ...prev,
          [name]: solutions.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          ),
        }));
      }
    }
  };

  const handleFiltration = async () => {
    const reasonsIds = [];
    const solutionsIds = [];
    const employeesSip = [];

    filteredReasons.map((item) => {
      reasonsIds.push(item.id);
    });
    filteredSolutions.map((item) => {
      solutionsIds.push(item.id);
    });
    filteredEmployees.map((item) => {
      employeesSip.push(item.sip);
    });
    filtrationRequest({
      filteredDate: {
        ...filteredDate,
        finishedAt: dayjs(filteredDate.finishedAt)
          .add(1, 'day')
          .format('YYYY-MM-DD'),
      },
      reasonsIds,
      employeesSip,
      solutionsIds,
    });
    handleClose();
  };

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        sx={{
          ml: 'auto',
        }}
      >
        Фильтры
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
        PaperProps={{
          sx: {
            overflow: 'visible',
          },
        }}
      >
        <List
          sx={{
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <ListItem>
            <ListItemButton
              sx={{
                display: 'flex',
                width: '100%',
                p: '8px 5px',
                gap: '15px',
                alignItems: 'center',
                borderRadius: '5px',
              }}
              onMouseEnter={() =>
                setHovered({
                  state: true,
                  top: '10',
                  type: 'reason',
                })
              }
            >
              <Grid
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <QuestionMarkIcon />
              </Grid>
              <Typography>Причины</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{
                display: 'flex',
                width: '100%',
                p: '8px 5px',
                gap: '15px',
                alignItems: 'center',
                borderRadius: '5px',
              }}
              onMouseEnter={() =>
                setHovered({
                  state: true,
                  top: '60',
                  type: 'solution',
                })
              }
            >
              <Grid
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EmojiObjectsIcon />
              </Grid>
              <Typography>Решения</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{
                display: 'flex',
                width: '100%',
                p: '8px 5px',
                gap: '15px',
                alignItems: 'center',
                borderRadius: '5px',
              }}
              onMouseEnter={() =>
                setHovered({
                  state: true,
                  top: '110',
                  type: 'date',
                })
              }
            >
              <Grid
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CalendarMonthIcon />
              </Grid>
              <Typography>Дата</Typography>
            </ListItemButton>
          </ListItem>
          {user.role === 'admin' ? (
            <ListItem>
              <ListItemButton
                sx={{
                  display: 'flex',
                  width: '100%',
                  p: '8px 5px',
                  gap: '15px',
                  alignItems: 'center',
                  borderRadius: '5px',
                }}
                onMouseEnter={() =>
                  setHovered({
                    state: true,
                    top: '160',
                    type: 'employees',
                  })
                }
              >
                <Grid
                  sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PersonIcon />
                </Grid>
                <Typography>Сотрудники</Typography>
              </ListItemButton>
            </ListItem>
          ) : null}
        </List>
        <Grid
          container
          flexDirection={'column'}
          spacing={1}
          sx={{
            padding: '0 5px 8px',
          }}
        >
          <Button
            variant={'outlined'}
            color={'primary'}
            onClick={handleFiltration}
          >
            Фильтровать
          </Button>
          <Button
            variant={'outlined'}
            color={'error'}
            onClick={resetFiltration}
          >
            Сбросить
          </Button>
        </Grid>
        <Grid
          sx={{
            display: hovered.state ? 'block' : 'none',
            position: 'absolute',
            top: `${hovered.top}px`,
            right: '100%',
            paddingRight: '10px',
          }}
        >
          <Grid
            sx={{
              minWidth: '300px',
              background: 'rgb(41,41,41)',
            }}
          >
            {hovered.type === 'employees' ? (
              employeesLoading ? (
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
                    sx={{ width: '100%', overflow: 'auto', maxHeight: '230px' }}
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
                              checked={filteredEmployees.includes(value)}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': value.id }}
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
              )
            ) : null}
            {hovered.type === 'reason' ? (
              reasonsLoading ? (
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
                      label={'Название причины'}
                      name={'reasons'}
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
                      onClick={() => setFilteredReasons([])}
                    >
                      Очистить
                    </Button>
                  </Grid>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      overflow: 'auto',
                      maxHeight: '230px',
                    }}
                  >
                    {searchFields.reasons.map((value) => (
                      <ListItem key={value.id} disablePadding>
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(
                            value,
                            filteredReasons,
                            setFilteredReasons
                          )}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={filteredReasons.includes(value)}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': value.id }}
                            />
                          </ListItemIcon>
                          <ListItemText id={value.id} primary={value.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )
            ) : null}

            {hovered.type === 'solution' ? (
              solutionLoading ? (
                <CircularProgress />
              ) : (
                <Grid
                  sx={{
                    bgcolor: 'background.paper',
                  }}
                >
                  <Grid
                    container
                    flexDirection={'column'}
                    spacing={1}
                    sx={{
                      px: 1,
                    }}
                  >
                    <TextField
                      autoComplete={'off'}
                      type={'text'}
                      label={'Название решения'}
                      name={'solutions'}
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
                      onClick={() => setFilteredSolutions([])}
                    >
                      Очистить
                    </Button>
                  </Grid>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      overflow: 'auto',
                      maxHeight: '230px',
                    }}
                  >
                    {searchFields.solutions.map((value) => (
                      <ListItem key={value.id} disablePadding>
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(
                            value,
                            filteredSolutions,
                            setFilteredSolutions
                          )}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={filteredSolutions.includes(value)}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': value.id }}
                            />
                          </ListItemIcon>
                          <ListItemText id={value.id} primary={value.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )
            ) : null}

            {hovered.type === 'date' ? (
              <Grid
                container
                flexDirection={'column'}
                spacing={1}
                sx={{
                  p: '15px',
                }}
              >
                <Grid
                  container
                  flexWrap={'nowrap'}
                  spacing={'10px'}
                  sx={{
                    maxWidth: '350px',
                  }}
                >
                  <Grid>
                    <Typography
                      sx={{
                        fontSize: '14px',
                      }}
                    >
                      От
                    </Typography>
                    <TextField
                      type={'date'}
                      value={filteredDate.createdAt}
                      onChange={(e) => {
                        setFilteredDate((prev) => ({
                          ...prev,
                          createdAt: e.target.value,
                        }));
                      }}
                      sx={{
                        width: '100%',
                      }}
                    />
                  </Grid>
                  <Grid>
                    <Typography
                      sx={{
                        fontSize: '14px',
                      }}
                    >
                      До
                    </Typography>
                    <TextField
                      type={'date'}
                      value={filteredDate.finishedAt}
                      onChange={(e) => {
                        setFilteredDate((prev) => ({
                          ...prev,
                          finishedAt: e.target.value,
                        }));
                      }}
                      sx={{
                        width: '100%',
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant={'contained'}
                  color={'error'}
                  sx={{
                    width: '100%',
                  }}
                  onClick={() =>
                    setFilteredDate({
                      createdAt: '',
                      finishedAt: '',
                    })
                  }
                >
                  Очистить
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Popover>
      <Button
        variant={'outlined'}
        onClick={() => {
          const reasonsIds = filteredReasons.map((item) => item.id);
          const solutionsIds = filteredSolutions.map((item) => item.id);
          const employeesSip = filteredEmployees.map((item) => item.sip);
          fetchCardsForUpload({
            type: type,
            employees: employeesSip,
            reasons: reasonsIds,
            solutions: solutionsIds,
            list,
            date: {
              ...filteredDate,
              finishedAt: dayjs(filteredDate.finishedAt)
                .add(1, 'day')
                .format('YYYY-MM-DD'),
            },
          });
        }}
        loading={loadingExport}
      >
        Экспорт
      </Button>
    </>
  );
};

export default Filtration;
