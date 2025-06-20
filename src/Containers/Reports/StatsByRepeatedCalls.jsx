import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  selectRepeatedCalls,
  selectRepeatedCallsLoading,
} from '../../features/reports/reportsSlice.js';
import { useEffect, useState } from 'react';
import { getRepeatedCalls } from '../../features/reports/reportsThunk.js';
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
  Pagination,
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
import Grid from '@mui/material/Grid2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  selectReasonsList,
  selectReasonsListLoading,
  selectSolutionsList,
  selectSolutionsListLoading,
} from '../../features/reasonsAndSolution/reasonsAndSolutionSlice.js';
import {
  getReasonsList,
  getSolutionsList,
} from '../../features/reasonsAndSolution/reasonsAndSolutionThunk.js';
import dayjs from 'dayjs';
import Calendar from '../../Components/Calendar/Calendar.jsx';
import { useExportExcel } from '../../hooks.js';

const StatsByRepeatedCalls = () => {
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);

  const repeatedCalls = useAppSelector(selectRepeatedCalls);
  const loading = useAppSelector(selectRepeatedCallsLoading);
  const [filteredList, setFilteredList] = useState(repeatedCalls.result);
  const { loadingExport, fetchCardsForUpload } = useExportExcel();
  const [searchDate, setSearchDate] = useState({
    createdAt: dayjs().startOf('month').format('YYYY-MM-DD'),
    finishedAt: dayjs().endOf('month').format('YYYY-MM-DD'),
  });
  const reasons = useAppSelector(selectReasonsList);
  const reasonLoading = useAppSelector(selectReasonsListLoading);
  const solutions = useAppSelector(selectSolutionsList);
  const solutionLoading = useAppSelector(selectSolutionsListLoading);
  const [filteredReasons, setFilteredReasons] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);

  const searchCards = async ({ date, listPage }) => {
    const reasonsIds = filteredReasons.map((item) => item.id);
    const solutionsIds = filteredSolutions.map((item) => item.id);
    await dispatch(
      getRepeatedCalls({
        date: {
          start: searchDate.createdAt,
          end: dayjs(date.finishedAt).add(1, 'day').format('YYYY-MM-DD'),
        },
        reasons: reasonsIds,
        ls_abon: searchFields.ls_abon,
        solutions: solutionsIds,
        listPage: listPage,
      })
    );
  };

  useEffect(() => {
    setFilteredList(repeatedCalls.result);
  }, [repeatedCalls.result]);

  useEffect(() => {
    if (!tableHeight) {
      setTableHeight(changeTableHeight);
      document.body.addEventListener('resize', changeTableHeight);
    }
  }, [tableHeight]);

  useEffect(() => {
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
  }, [dispatch]);

  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;

    setTableHeight(windowHeight - headerHeight - 262);
  };

  const [anchorElLs_Abon, setAnchorElLs_Abon] = useState(null);
  const [anchorElReason, setAnchorElReason] = useState(null);
  const [anchorElSolution, setAnchorElSolution] = useState(null);

  const handleClick = (event, type) => {
    if (type === 'solution') {
      setAnchorElSolution(event.currentTarget);
    } else if (type === 'reason') {
      setAnchorElReason(event.currentTarget);
    } else if (type === 'ls_abon') {
      setAnchorElLs_Abon(event.currentTarget);
    }
  };

  const handleClose = (type) => {
    if (type === 'reason') {
      setAnchorElReason(null);
    } else if (type === 'solution') {
      setAnchorElSolution(null);
    } else if (type === 'ls_abon') {
      setAnchorElLs_Abon(null);
    }
  };

  const open = {
    reason: Boolean(anchorElReason),
    solution: Boolean(anchorElSolution),
    ls_abon: Boolean(anchorElLs_Abon),
  };
  const idLS_AbonPopover = 'ls_abon-filters-popup';
  const idReasonPopover = 'reason-filters-popup';
  const idSolutionPopover = 'solution-filters-popup';

  useEffect(() => {
    setSearchFields({
      reasons: reasons,
      solutions: solutions,
      ls_abon: '',
    });
  }, [dispatch, reasons, solutions]);

  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);

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
    reason: '',
    solution: '',
  });

  const handleFiltrationByOrder = (type) => {
    let newList = filteredList;
    if (type === 'reason') {
      if (filters.reason === 'up') {
        newList = [...newList].sort((a, b) =>
          b.reason.title.localeCompare(a.reason.title)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort((a, b) =>
          a.reason.title.localeCompare(b.reason.title)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'up',
        }));
      }
    }

    if (type === 'solution') {
      if (filters.solution === 'up') {
        newList = [...newList].sort((a, b) =>
          b.solution?.title.localeCompare(a.solution.title)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort((a, b) =>
          a.solution?.title.localeCompare(b.solution.title)
        );
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
    reasons: [],
    solutions: [],
    ls_abon: '',
  });

  const handleChangeSearchFields = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setSearchFields({
        reasons: reasons,
        solutions: solutions,
      });
    } else {
      if (name === 'reasons') {
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
      } else if (name === 'ls_abon') {
        setSearchFields((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
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
            Повторные звонки
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginLeft: 'auto' }}
          >
            <Calendar setState={setSearchDate} />
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() =>
                searchCards({
                  date: searchDate,
                  listPage: 1,
                })
              }
              loading={loading}
              sx={{
                height: '56px',
              }}
            >
              Поиск
            </Button>
          </Grid>
          <Button
            variant={'outlined'}
            onClick={() =>
              fetchCardsForUpload({
                type: 'Повторные звонки',
                date: {
                  ...searchDate,
                  end: dayjs(searchDate.end).add(1, 'day').format('YYYY-MM-DD'),
                },
                solutions: filteredSolutions.map((item) => item.id),
                reasons: filteredReasons.map((item) => item.id),
              })
            }
            loading={loadingExport}
          >
            Экспорт
          </Button>
        </Grid>
        <Typography p={'10px 20px'}>
          Всего: {repeatedCalls.total_results}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            height: `${tableHeight}px`,
            width: '100%',
          }}
        >
          <Table
            stickyHeader
            sx={{
              '& .MuiTableCell-root, .MuiTableCell-root p': {
                textAlign: 'left',
              },
            }}
          >
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
                <TableCell sx={{ minWidth: '130px' }}>
                  <Grid container>
                    <Typography>Личный счет</Typography>

                    <Button
                      aria-describedby={idLS_AbonPopover}
                      variant="text"
                      onClick={(event) => handleClick(event, 'ls_abon')}
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
                      <SettingsIcon
                        sx={{
                          color: searchFields.ls_abon ? '#009dff' : '#fff',
                        }}
                      />
                    </Button>
                  </Grid>
                  <Popover
                    id={idLS_AbonPopover}
                    open={open.ls_abon}
                    anchorEl={anchorElLs_Abon}
                    onClose={() => handleClose('ls_abon')}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Grid
                      sx={{
                        minWidth: '300px',
                        background: 'rgb(41,41,41)',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant={'h5'}
                        sx={{
                          fontSize: '18px',
                          mb: 2,
                          textAlign: 'center',
                        }}
                      >
                        Поиск по лич. счету
                      </Typography>
                      <TextField
                        autoComplete="off"
                        value={searchFields.ls_abon}
                        name={'ls_abon'}
                        onChange={handleChangeSearchFields}
                        variant={'outlined'}
                        label={'Личный счёт'}
                        fullWidth
                      />
                    </Grid>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Typography>Адрес</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Номер телефона</Typography>
                </TableCell>
                <TableCell>
                  <Grid
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Typography>Причина</Typography>
                    <Button
                      variant={'text'}
                      onClick={() => handleFiltrationByOrder('reason')}
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
                      {filters.reason === 'down' ? (
                        <KeyboardArrowDownIcon fontSize={'small'} />
                      ) : (
                        <KeyboardArrowUpIcon fontSize={'small'} />
                      )}
                    </Button>
                    <Button
                      aria-describedby={idReasonPopover}
                      variant="text"
                      onClick={(event) => handleClick(event, 'reason')}
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
                      <SettingsIcon
                        sx={{
                          color:
                            filteredReasons.length < 1 ? '#fff' : '#009dff',
                        }}
                      />
                    </Button>
                    <Popover
                      id={idReasonPopover}
                      open={open.reason}
                      anchorEl={anchorElReason}
                      onClose={() => handleClose('reason')}
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
                        {reasonLoading ? (
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
                                label={'Причина'}
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
                                        checked={filteredReasons.includes(
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
                                      primary={value.title}
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
                    }}
                  >
                    <Typography>Решение</Typography>
                    <Button
                      variant={'text'}
                      onClick={() => handleFiltrationByOrder('solution')}
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
                      {filters.solution === 'down' ? (
                        <KeyboardArrowDownIcon fontSize={'small'} />
                      ) : (
                        <KeyboardArrowUpIcon fontSize={'small'} />
                      )}
                    </Button>
                    <Button
                      aria-describedby={idSolutionPopover}
                      variant="text"
                      onClick={(event) => handleClick(event, 'solution')}
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
                      <SettingsIcon
                        sx={{
                          color:
                            filteredSolutions.length < 1 ? '#fff' : '#009dff',
                        }}
                      />
                    </Button>
                    <Popover
                      id={idSolutionPopover}
                      open={open.solution}
                      anchorEl={anchorElSolution}
                      onClose={() => handleClose('solution')}
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
                        {solutionLoading ? (
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
                                mb: 1,
                              }}
                            >
                              <TextField
                                autoComplete={'off'}
                                type={'text'}
                                label={'Решение'}
                                name={'solutions'}
                                onChange={handleChangeSearchFields}
                                sx={{
                                  width: '100%',
                                  flexGrow: '1',
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
                                        checked={filteredSolutions.includes(
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
                                      primary={value.title}
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
                    <Typography
                      sx={{
                        minWidth: '60px',
                      }}
                    >
                      Кол-во
                    </Typography>
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
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                filteredList.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{item.ls_abon}</TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    <TableCell align="center">
                      {item.phone_number.join(', ')}
                    </TableCell>
                    <TableCell align="center">{item.reason.title}</TableCell>
                    <TableCell align="center">{item.solution?.title}</TableCell>
                    <TableCell sx={{ textAlign: 'center!important' }}>
                      {item.count}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 2,
          }}
        >
          <Pagination
            count={repeatedCalls.total_pages}
            color="primary"
            onChange={(e, value) =>
              searchCards({
                date: searchDate,
                listPage: value,
              })
            }
            sx={{
              justifyContent: 'center',
            }}
          />
        </Grid>
      </Container>
    </>
  );
};

export default StatsByRepeatedCalls;
