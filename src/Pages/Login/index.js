import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Services/api";
import { toast } from "react-toastify";
import { useHistory, Redirect } from "react-router-dom";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email invalido").required("Campo obrigatorio"),
    password: yup
      .string()
      .min(8, "Minimo 8 digitos")
      .required("Campo obrigatorio"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubimitFunction = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha invalidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubimitFunction)}>
            <h1>Login</h1>
            <Input
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              palceholder="Seu melhor email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              palceholder="Uma senha segura"
              error={errors.password?.message}
            />

            <Button type="submit">Entrar</Button>
            <p>
              Nao tem uma conta? Faca seu <Link to="/signup">cadastro</Link>{" "}
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
