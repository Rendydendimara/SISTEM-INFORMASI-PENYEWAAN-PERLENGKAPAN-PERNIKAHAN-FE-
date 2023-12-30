import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { toFormatPrice } from 'src/pages/admin/data-paket/tambah';
import Link from 'next/link';

export default function CardPaket(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image="https://placehold.co/600x400"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.nama}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Harga: Rp.{toFormatPrice(props.data.harga)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.deskripsi.slice(0, 100)}...
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={`/customer/paket/${props.data.id}`}>
                        <Button size="small">Detail</Button>
                    </Link>
                </CardActions>
            </CardActionArea>

        </Card>
    );
}