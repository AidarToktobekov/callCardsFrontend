import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  selectCardsInactives,
  selectCardsInactivesLoading,
} from '../../features/reports/reportsSlice.js';
import { useEffect, useState } from 'react';
import { getCardsInactives } from '../../features/reports/reportsThunk.js';
import Grid from '@mui/material/Grid2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Calendar from '../../Components/Calendar/Calendar.jsx';
import dayjs from 'dayjs';
import Filtration from '../../Components/Filtration/Filtration.jsx';

const StatsByInactivesUsers = () => {
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);

  const inactivesCards = useAppSelector(selectCardsInactives);
  const loading = useAppSelector(selectCardsInactivesLoading);
  const [filteredList, setFilteredList] = useState(inactivesCards);

  const [searchDate, setSearchDate] = useState({
    createdAt: dayjs().startOf('month').format('YYYY-MM-DD'),
    finishedAt: dayjs().endOf('month').format('YYYY-MM-DD'),
  });

  const searchCards = () => {
    dispatch(
      getCardsInactives({
        date: {
          ...searchDate,
          end: dayjs(searchDate.end).add(1, 'day').format('YYYY-MM-DD'),
        },
      })
    );
  };

  useEffect(() => {
    setFilteredList(inactivesCards);
  }, [inactivesCards]);

  useEffect(() => {
    changeTableHeight();
    document.body.addEventListener('resize', changeTableHeight);
  }, []);

  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight - 154);
  };

  const [filters, setFilters] = useState({
    id: '',
    name: '',
    date: '',
    sip: '',
  });

  const handleFiltrationByOrder = (type) => {
    let newList = filteredList;
    if (type === 'id') {
      if (filters.id === 'up') {
        newList = [...newList].sort((a, b) => b.id - a.id);
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort((a, b) => a.id - b.id);
        setFilters((prev) => ({
          ...prev,
          [type]: 'up',
        }));
      }
    }
    if (type === 'name') {
      if (filters.name === 'up') {
        newList = [...newList].sort((a, b) =>
          b.full_name.localeCompare(a.full_name)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort((a, b) =>
          a.full_name.localeCompare(b.full_name)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'up',
        }));
      }
    }

    if (type === 'date') {
      if (filters.date === 'up') {
        newList = [...newList].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setFilters((prev) => ({
          ...prev,
          [type]: 'down',
        }));
      } else {
        newList = [...newList].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
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
    setFilteredList(newList);
  };

  const filtrationRequest = async ({
    filteredDate,
    reasonsIds,
    employeesSip,
    solutionsIds,
    ls_abon,
  }) => {
    await dispatch(
      getCardsInactives({
        date: filteredDate,
        reasons: reasonsIds,
        employees: employeesSip,
        solutions: solutionsIds,
        ls_abon,
      })
    );
  };

  return (
    <>
      <Grid container spacing={2} p={'20px'}>
        <Typography
          sx={{
            fontSize: '25px',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Неактивные абоненты
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
            onClick={searchCards}
            loading={loading}
            sx={{
              height: '56px',
            }}
          >
            Поиск
          </Button>
        </Grid>
        <Filtration
          list={inactivesCards}
          type={'Неактивка'}
          setFilteredList={setFilteredList}
          filtrationRequest={filtrationRequest}
          inactiveDate={searchDate}
        />
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          height: `${tableHeight}px`,
          width: '100%',
        }}
      >
        <Table
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
              <TableCell>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>ID</Typography>
                  <Button
                    variant={'text'}
                    onClick={() => handleFiltrationByOrder('id')}
                    sx={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0,
                      width: '25px',
                      height: '25px',
                      minWidth: 'unset',
                    }}
                  >
                    {filters.id === 'down' ? (
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
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>ФИО</Typography>
                  <Button
                    variant={'text'}
                    onClick={() => handleFiltrationByOrder('name')}
                    sx={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0,
                      width: '25px',
                      height: '25px',
                      minWidth: 'unset',
                    }}
                  >
                    {filters.name === 'down' ? (
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
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>Звонок от</Typography>
                </Grid>
              </TableCell>
              <TableCell sx={{ minWidth: '100px' }}>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>ЛС абонента</Typography>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid>
                  <Typography>Номер телефона</Typography>
                </Grid>
              </TableCell>
              <TableCell sx={{ minWidth: '150px' }}>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>Дата создания</Typography>
                  <Button
                    variant={'text'}
                    onClick={() => handleFiltrationByOrder('date')}
                    sx={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0,
                      width: '25px',
                      height: '25px',
                      minWidth: 'unset',
                    }}
                  >
                    {filters.date === 'down' ? (
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
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>Причина</Typography>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>Решение</Typography>
                </Grid>
              </TableCell>
              <TableCell sx={{ minWidth: '70px' }}>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>СИП</Typography>
                  <Button
                    variant={'text'}
                    onClick={() => handleFiltrationByOrder('sip')}
                    sx={{
                      display: 'none',
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
              <TableCell sx={{ minWidth: '70px' }}>
                <Grid>
                  <Typography>Старший смены</Typography>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover > button': {
                      display: 'flex',
                    },
                  }}
                >
                  <Typography>Комментарий</Typography>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  align="center"
                  sx={{
                    textAlign: 'center!important',
                  }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.full_name}</TableCell>
                  <TableCell align="center">{item.call_from}</TableCell>
                  <TableCell align="center">{item.ls_abon}</TableCell>
                  <TableCell align="center">
                    {item.phone_number.join(', ')}
                  </TableCell>
                  <TableCell align="center">{item.created_at}</TableCell>
                  <TableCell align="center">{item.reason?.title}</TableCell>
                  <TableCell align="center">{item.solution?.title}</TableCell>
                  <TableCell align="center">
                    {`${item.spec_full_name} (${item.sip})`}
                  </TableCell>
                  <TableCell align="center">
                    {item?.senior_specs?.join(', ')}
                  </TableCell>
                  <TableCell align="center">{item.comment}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StatsByInactivesUsers;
