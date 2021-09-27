import { HiAdjustments, HiCube } from "react-icons/hi";
import Button from "../Button";
import { Container } from "./styles";

function Card({ title, date, onClick }) {
  return (
    <Container>
      <span>
        <HiCube />
        {title}
      </span>
      <hr />
      <span>
        <HiAdjustments />
        {date}
      </span>
      <Button onClick={onClick}>Exlcuir</Button>
    </Container>
  );
}

export default Card;
