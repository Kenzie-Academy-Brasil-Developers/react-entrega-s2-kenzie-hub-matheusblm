import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../Components/Button";
import { Link, useHistory, Redirect } from "react-router-dom";
import Input from "../../Components/Input";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Services/api";
import { toast } from "react-toastify";
import { DiCode, DiGithubAlt } from "react-icons/di";

function Signup({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatorio"),
    email: yup.string().email("Email invalido").required("Campo obrigatorio"),
    password: yup
      .string()
      .min(8, "Minimo 8 digitos")
      .required("Campo obrigatorio"),
    bio: yup.string().max(20, "Maximo 20 digitos"),
    contact: yup.string().max(20, "Maximo 20 digitos"),
    course_module: yup.string().max(15, "Maximo 15 digitos"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo Obrigatorio"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubimitFunction = ({
    email,
    password,
    name,
    bio,
    contact,
    course_module,
  }) => {
    const user = { email, password, name, bio, contact, course_module };

    api
      .post("users", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubimitFunction)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              name="name"
              icon={FiUser}
              label="Nome"
              palceholder="Seu nome"
              error={errors.name?.message}
            />
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
              name="bio"
              icon={FiMail}
              label="Bio"
              palceholder="Fale sobre Voce"
              error={errors.bio?.message}
            />
            <Input
              register={register}
              name="contact"
              icon={DiGithubAlt}
              label="Contact"
              palceholder="Seu Contato"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="course_module"
              icon={DiCode}
              label="Seu modulo"
              palceholder="Seu Modulo"
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
            <Input
              register={register}
              name="passwordConfirm"
              icon={FiLock}
              label="Confirmacao de Senha"
              palceholder="Confirmacao de senha"
              error={errors.passwordConfirm?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              ja tem uma conta? Faca seu <Link to="/login">Login</Link>{" "}
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
