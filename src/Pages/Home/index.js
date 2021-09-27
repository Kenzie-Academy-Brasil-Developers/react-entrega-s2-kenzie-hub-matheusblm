import { Container, Content } from "./styles";

import Button from "../../Components/Button";
import { useHistory, Redirect } from "react-router";
function Home({ authenticated }) {
  const history = useHistory();
  const handleNavigation = (path) => {
    return history.push(path);
  };
  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <h1>
          Bem vindo ao <span>KenzieHub</span>!
        </h1>

        <div>
          <Button onClick={() => handleNavigation("/signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;
