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
    const returnGambar = () => {
        return props.data.gambar.split(",")[0] ?? "https://placehold.co/600x400"

    }

    const returnDeskripsi = () => {
        const msg = `${props.data.tenda_terima_tamu}, ${props.data.meja_terima_tamu}, ${props.data.meja_kursi_akad}, ${props.data.dekor_panggung}, ${props.data.dekor_kamar_pengantin}, ${props.data.kemeja_pria}, ${props.data.gaun_wanita}, ${props.data.make_up}`

        return `${msg.slice(0, 100)}...`
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={returnGambar()}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.nama}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Harga: Rp.{toFormatPrice(props.data.harga)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {returnDeskripsi()}
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