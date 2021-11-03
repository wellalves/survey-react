import styled from 'styled-components';

export const ContainerMain = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 270px 1fr;

  > .Content {
    padding: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
`;