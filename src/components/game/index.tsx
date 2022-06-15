import { Box, Button, Card, Grid, Modal, TextField, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/index';
import NavBar from '../../components/navbar/index';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useParams } from 'react-router';
import { buscarUm, enviarComentario } from '../../api/games';
import CommentIcon from '@mui/icons-material/Comment';
import { Carregando } from '../carregando';

export default function Game() {
  const [dataGames, setData] = useState<any>(null)
  const getToken: any = localStorage.getItem('token');
  const token: any = jwtDecode(getToken);
  const { id } = useParams()

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await buscarUm(id)
      setData(response.data)
    }

    fetchMyAPI()
  }, [])

  const ContentGame = () => {
    const [comentario, setComentario] = React.useState("");
    const [nota, setNota]: any = React.useState(0);
    const [openTwo, setOpenTwo] = React.useState(false);
    const handleOpenTwo = () => setOpenTwo(true);
    const handleCloseTwo = () => setOpenTwo(false);

    const enviarComent = async () => {
      const element: any  = document.getElementById("message");
      const notaNum = parseInt(nota);
      
      if(notaNum === null) {
        const returnMessage = element.innerHTML = "Erro! Insira pelo menos uma nota!"
        return returnMessage;
      } else if (notaNum === null && comentario == "") {
        const returnMessage = element.innerHTML = "Erro! Insira pelo menos uma nota e possivelmente, um comentário!"
        return returnMessage;
      } else if (notaNum > 10 || notaNum < 0) {
        const returnMessage = element.innerHTML = "Erro! A nota deve ser de 0 a 10!"
        return returnMessage;
      } else if (!notaNum) {
        const returnMessage = element.innerHTML = "Erro! Nota inválida, digite um número de 0 a 10!"
        return returnMessage;
      } else {
        const returnMessage = element.innerHTML = "Comentário enviado!"
        return await enviarComentario(id, { "autor": token.username, "coment": comentario, "nota": nota }) && returnMessage && location.reload();
      }
    }

    const onChangeComent = (e: any) => {
      setComentario(e.target.value);
    }

    const onChangeNota = (e: any) => {
      setNota(e.target.value);
    }


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
      <Card sx={{ width: "80%", height: "75%", mt: 3 }}>
        <Typography textAlign="center">
          <h1>{dataGames.titulo}</h1>
          <img src={dataGames.imagem} style={{ maxHeight: "20%" }} />
          <p><strong>Categoria</strong>: {dataGames.categoria}</p>
          <p>{dataGames.descricao}</p>
        <h2>COMENTÁRIOS</h2>
        </Typography>
        <Button sx={{ color: 'black' }}onClick={handleOpenTwo}>
          <CommentIcon />
        </Button>
        <Modal
          open={openTwo}
          onClose={handleCloseTwo}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: "60%" }}>
            <Box sx={{ m: 0, p: 0, width: "100%", height: "100%", bgcolor: "#ffffff" }}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={7} md={7}>
                  <Card sx={{ width: "100%", height: "90%" }}>
                    <Typography align='center'>
                      <h2>Comente</h2>
                      <TextField
                        required
                        id="outlined-required"
                        label="Comentário"
                        onChange={onChangeComent}
                        defaultValue={comentario}
                        sx={{ m: 2, width: "80%" }}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        onChange={onChangeNota}
                        label="Nota"
                        sx={{ m: 2, width: "80%" }}
                      />
                      <h3 id="message"></h3>
                      <Button variant="contained" onClick={enviarComent}>Enviar</Button>
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
        {dataGames.comentarios.map((comentario: any) => {
          return (<Grid container justifyContent="center">
            <Card sx={{ width: "70%" }}>
              <ul style={{ listStyle: "none" }}>
                <AccountCircleRoundedIcon fontSize='large' />
                <li>
                  <h5>{comentario.autor}</h5>
                </li>
                <li>
                  <h5>Comentário: {comentario.coment}</h5>
                </li>
                <li>
                  <h5>Nota: {comentario.nota}</h5>
                </li>
              </ul>
            </Card>
          </Grid>
          )
        })}
      </Card>
    </>
  }


  return <>
    <NavBar />
    <Box sx={{ m: 0, p: 0, width: "100%", height: "100%", bgcolor: "#ffffff", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        {
          dataGames === null
            ? <Carregando />
            : <ContentGame />
        }
      </Grid>
    </Box>
    <Footer />
  </>
}