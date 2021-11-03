import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    font-family: Arial;
    text-decoration: none;
    list-style: none;
    border: none;
    font-weight: bold;
    outline: none;
    box-sizing: border-box;

    > body {
      img {
        max-width: 100%;
      }
    }
  }
`;

export { GlobalStyle };