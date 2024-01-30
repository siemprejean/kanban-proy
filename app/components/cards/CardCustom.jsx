import { styled } from '@mui/material/styles';
import 'styles/theme/components/_card.scss';
import React, { useEffect, useState, useRef } from "react";


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

const CardCustom = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [typeCard, setTypeCard] = useState(true)

    useEffect(() => {
        console.log(props.data.type)
        if (props.data.type === 'simple' ? setTypeCard(true) : setTypeCard(false));
    })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {typeCard ?
                (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader className='dashboard-card'
                            avatar={
                                <span class="nav-icon material-symbols-outlined">
                                    {props.data.icon}
                                </span>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <ArrowRightAltIcon />
                                </IconButton>
                            }
                            title={props.data.titulo}
                            subheader={props.data.valor}
                        />
                    </Card>
                )
                : (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader className='dashboard-card'
                            avatar={
                                <span class="nav-icon material-symbols-outlined">
                                    {props.data.icon}
                                </span>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <ArrowRightAltIcon />
                                </IconButton>
                            }
                            title={props.data.titulo}
                            subheader="NO SOY SIMPLE"
                        />
                    </Card>
                )}
        </>
    );
}
export default CardCustom;