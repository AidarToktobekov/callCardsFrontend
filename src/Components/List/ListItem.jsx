import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

const ListItem = ({item}) => {
    return(
        <Grid sx={{
                borderBottom: "1px solid black",
                display: 'flex',
                "&>div":{
                        borderRight: "1px solid black",
                        width: "100%",
                }}}
        >
            <Grid>
                {item.ls_abon}
            </Grid>
            <Grid>
                {dayjs().format(item.created_at)}
            </Grid>
            <Grid>
                {item.spec_full_name}
            </Grid>
            <Grid>
                {item.full_name}
            </Grid>
            <Grid>
                {item.phone_number}
            </Grid>
            <Grid>
                {item.address}
            </Grid>
            <Grid>
                {item.comment ? (
                    <>
                        {item.comment}
                    </>
                ): (
                    <>
                        Нет коментария
                    </>
                )}
            </Grid>
            <Grid>
                {item.reason}
            </Grid>
            <Grid>
                {item.reason ? (
                    <>
                        {item.reason}
                    </>
                ) : (
                    <>
                        Нет решения
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default ListItem;