import React from 'react';
import { Box } from '@mui/system';
import { Button, Card, Grid, Modal } from '@mui/material';
import { Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function ModalFilter() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <>
        <Button sx={{ color: 'black', paddingTop: '2.5%'}}>
            <FilterListIcon onClick={handleOpen}>Filtrar</FilterListIcon>
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: "60%" }}>
                <Box sx={{ m: 0, p: 0, width: "100%", height: "100%", bgcolor: "#ffffff" }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={7} md={7}>
                            <Card sx={{ width: "100%", height: "90%" }}>
                                <Typography align='center'>
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    </>
}