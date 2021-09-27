import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
 *{
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     outline: 0;
  }

  :root{
      --white:  #FFF8F0;
      --vanilla: #FFCF99;
      --black: #1E1E24;
      --orange: #FFCF99;
      --gray: #666360;
      --red: #111D4A;
  }
  body{
      background-color: var(--vanilla);
      color: var(---black);
  }
  body, input, button{
      font-family: 'PT Serif', serif;
      font-size: 1rem;
  }

  h1,h2,h3,h4,h5,h6{
      font-family: 'Roboto Mono', monospace;
    
  }
  button{
      cursor: pointer;
  }
  a{
      text-decoration: none;
  }
`;
