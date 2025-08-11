import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete"
import { Logout } from "@mui/icons-material";
import ModalCriarIngresso from "../components/ModalCriarIngresso";

function listEventos() {
  const [eventos, setEventos] = useState([]);
  const [alert, setAlert] = useState({
    // Visibilidade
    open: false,

    // Nível do alerta
    severity: "",

    // Mensagem
    message: "",
  });

  // Função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({open: true, severity, message})
  }

  // Fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false})
  }

  const navigate = useNavigate();
  async function getEventos() {
    // Chamada da Api
    await api.getEventos().then(
      (response) => {
        console.log(response.data.events);
        setEventos(response.data.events);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  async function deleteEvento(id){
    try{
      await api.deleteEvento(id);
      await getEventos();
      // Mensagem informativa
      showAlert("success", "Evento excluído com sucesso!");
    }catch(error){
      console.log("Erro ao deletar evento...", error);
      // Mensagem informativa de erro
      showAlert("error", error.response.data.error)
      
    }
  }

  const listEventos = eventos.map((evento) => {
    return (
      <TableRow key={evento.id_evento}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
        <TableCell align="center"> <img src={`http://localhost:5000/api/v1/evento/imagem/${evento.id_evento}`} alt="Imagem Evento" style={{width:"80px", height:"80px", objectFit:"cover"}} /></TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteEvento(evento.id_evento)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(evento)}>
            adicionar
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    // if (!localStorage.getItem("authenticated")) {
    //   navigate("/");
    // }
    getEventos();
  }, []);

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
    setEventoSelecionado(evento);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado("");
  };

  return (
    <div>
      <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert 
        onClose={handleCloseAlert}
        severity={alert.severity}
        sx={{width:"100%"}}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalCriarIngresso
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />

      {eventos.length === 0 ? (
        <h1>Carregando eventos</h1>
      ) : (
        <div>
          <h5>Lista de eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "brown", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center"> IMAGEM</TableCell>
                  <TableCell align="center">Ações</TableCell>
                  <TableCell align="center">Criar Ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEventos}</TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            to="/users"
          >
            Ir para usuários
          </Button>

          <Button
            fullWidth
            variant="contained"
            component={Link}
            to="/"
            onClick={logout}
          >
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}
export default listEventos;
