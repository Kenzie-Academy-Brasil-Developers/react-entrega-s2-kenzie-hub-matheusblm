import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { Redirect } from "react-router";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import { Container, InputContainer, TaskContainer } from "./styles";
import api from "../../Services/api";
import { toast } from "react-toastify";
function Dashboard({ authenticated }) {
  const [tecs, setTecs] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  function loadTec() {
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTecs(response.data.techs);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadTec();
  });
  const onSubmit = ({ tec, level }) => {
    if (!tec || !level) {
      return toast.error("Complete o campo");
    }
    api
      .post(
        "/users/techs ",
        {
          title: tec,
          status: level,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => loadTec())
      .catch((err) =>
        toast.error("Voce nao pode criar duas tec com o mesmo nome")
      );
  };

  const handleDelete = (id) => {
    const newList = tecs.filter((tecs) => tecs.id !== id);
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => setTecs(newList));
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nome da Tecnologia"
            register={register}
            name="tec"
          />
          <Input
            icon={FiEdit3}
            placeholder="Qual seu Nivel na Linguagem?
            Iniciante, intermediario ou Avancado?"
            register={register}
            name="level"
          />
          <Button type="submit"> Adicionar</Button>
        </section>
      </InputContainer>
      <TaskContainer>
        {tecs.map((tech) => (
          <Card
            key={tech.id}
            title={tech.title}
            date={tech.status}
            onClick={() => {
              handleDelete(tech.id);
            }}
          />
        ))}
      </TaskContainer>
    </Container>
  );
}

export default Dashboard;
