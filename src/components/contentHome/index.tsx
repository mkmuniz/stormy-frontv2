import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Card, CardActionArea, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Modal, NativeSelect, Paper, Radio, RadioGroup, styled } from '@mui/material';
import { Typography, TextField } from '@mui/material';
import { buscarJogos } from '../../api/games';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function HomeContent() {
    useEffect(() => {
        const getGames = async () => {
            const games = await buscarJogos().then(res => {
                setData(res.data)
                setFoundGames(dataGames);
            })
        };
        getGames();
    }, [])

    const [dataGames, setData] = React.useState([]);
    const [isLoaded, setLoaded] = React.useState(false);
    const [foundGames, setFoundGames] = useState(dataGames);
    const [open, setOpen] = React.useState(false);
    const [categoria, setCategoria]: any = React.useState("");
    const [recommends, setRecommends]: any = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const imagemStyle: any = {
        width: "100%",
        height: "75vh"
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const Item = styled(Paper)(({ theme }: any) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [titulo, setTitulo] = useState('');

    const filter = (e: any) => {
        const keyword = e.target.value;

        if (!categoria) {
            const results = dataGames.filter((game: any) => {
                return game.titulo.toLowerCase().startsWith(keyword.toLowerCase());
            });

            setFoundGames(results);
            setLoaded(true);
        } else {

            //Filtering the games by category selected before
            const listFiltered = dataGames.filter((game: any) => {
                return game.categoria === categoria;
            })

            setFoundGames(listFiltered);

            //Now I'm filtering by words that I typed in my input
            const results = listFiltered.filter((game: any) => {
                return game.titulo.toLowerCase().startsWith(keyword.toLowerCase());
            });

            //And passing the values filtered to my map render them
            setFoundGames(results);
            setLoaded(true);
        }


        setTitulo(keyword);
    };

    const gamesRecommend: any = dataGames.filter((game: any) => {
        let gameLength = game.comentarios;
        if (gameLength.length > 2) {
            return game;
        }
    })

    return <>
        <Box sx={{ m: 0, p: 0, width: "100%", height: "50%", bgcolor: '#000000' }}>
            <img style={imagemStyle} src="https://wallpaperaccess.com/full/4334829.jpg" />
        </Box>
        <Box sx={{ m: 0, p: 0, width: "100%", height: "100%", bgcolor: "#ffffff", textAlign: "center" }}>
            <Card sx={{ bgcolor: "#ffffff" }}>
                <h3>JOGOS DISPONÍVEIS</h3>
                <Typography textAlign="center">
                    <Button onClick={handleOpen} sx={{ color: 'black', paddingTop: '2.5%' }}>
                        <FilterListIcon>Filtrar</FilterListIcon>
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
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">Categorias</FormLabel>
                                                <RadioGroup
                                                    onChange={e => setCategoria(e.target.value)}
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControlLabel value="" control={<Radio />} label="Todos" />
                                                    <FormControlLabel value="Run and Gun" control={<Radio />} label="Run and Gun" />
                                                    <FormControlLabel value="MMO" control={<Radio />} label="MMO" />
                                                    <FormControlLabel value="Multiplayer" control={<Radio />} label="Multiplayer" />
                                                </RadioGroup>
                                                <h3>Após selecionar a categoria, digite no campo!</h3>
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Modal>
                    <TextField fullWidth label="Pesquisar"
                        type="search"
                        value={titulo}
                        onChange={filter}
                        placeholder="Digite um nome de jogo"
                        sx={{ width: "50%", mt: 2, mb: 6 }}
                    />
                    <div className="user-list">
                        <Grid container justifyContent="center" spacing={{ mt: 5, xs: 5, md: 3, mx: 'auto' }} columns={{ ml: 2, xs: 4, m: 4, sm: 8, md: 12 }}>
                            {isLoaded === true ? (
                                foundGames.map((game: any) => (
                                    <a style={{ textDecoration: "none" }} href={'/game/' + game._id}>
                                        <Item>
                                            <Card sx={{ maxWidth: 345, maxHeight: 300, mt: 3 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={game.imagem}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {game.titulo}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {game.descricao}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Item>
                                    </a>
                                ))
                            ) : (
                                dataGames.map((game: any) => (
                                    <a style={{ textDecoration: "none" }} href={'/game/' + game._id}>
                                        <Item>
                                            <Card sx={{ maxWidth: 345, maxHeight: 300, mt: 3 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={game.imagem}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {game.titulo}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {game.descricao}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Item>
                                    </a>
                                ))
                            )}
                        </Grid>
                    </div>
                </Typography>
            </Card>
            <Typography textAlign="center" sx={{ paddingBottom: 8 }}>
            <h3>RECOMENDAÇÕES</h3>
            <h4>JOGOS MAIS COMENTADOS!</h4>
            </Typography>
            <Grid container justifyContent="center" spacing={{ xs: 5, md: 3, mx: 'auto' }} columns={{ ml: 2, xs: 4, m: 4, sm: 8, md: 12 }}>
                {gamesRecommend.map((game: any) => (
                    <a style={{ textDecoration: "none" }} href={'/game/' + game._id}>
                        <Item>
                            <Card sx={{ maxWidth: 345, maxHeight: 300, mt: 3 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={game.imagem}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {game.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {game.descricao}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Item>
                    </a>
                ))}
            </Grid>
        </Box>
    </>
}