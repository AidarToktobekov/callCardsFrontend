import Grid from "@mui/material/Grid2";
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectList} from "../../features/list/listSlice.js";
import ListItem from "../../Components/List/ListItem.jsx";
import {useEffect} from "react";
import {getList} from "../../features/list/listThunk.js";

const CardsList = ()=>{

    const dispatch = useAppDispatch();
    const list = useAppSelector(selectList);

    useEffect(() => {
        dispatch(getList());
    }, []);

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"} sx={{
                    width: "100%",
                }}>
                    <Grid sx={{
                        border: "1px solid black",
                    }}>
                        <Grid sx={{
                            borderBottom: "1px solid black",
                            display: 'flex',
                            "&>div":{
                                borderRight: "1px solid black",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                padding: "10px 0",
                            }
                        }}
                        >
                            <Grid>
                                Лицевой счет
                            </Grid>
                            <Grid>
                                Дата
                            </Grid>
                            <Grid>
                                Сотрудник
                            </Grid>
                            <Grid>
                                ФИО Клиента
                            </Grid>
                            <Grid>
                                Номер телефона
                            </Grid>
                            <Grid>
                                Адрес
                            </Grid>
                            <Grid>
                                Коментарий
                            </Grid>
                            <Grid>
                                Причина
                            </Grid>
                            <Grid>
                                Решение
                            </Grid>
                        </Grid>
                        {list.map((item, index)=>{
                            return(
                                <ListItem key={index} item={item}></ListItem>
                            )
                        })}
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default CardsList;