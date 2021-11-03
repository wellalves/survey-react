import styled from 'styled-components';

export const ContainerStyled = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #9999992d;
  border-radius: 5px;
  margin: 20px 0px;

  > .Header {
    margin-bottom: 20px;

    > h1 {
      font-size: 1.2em;
    }
  }

  > .ContainerInformation {
    margin-bottom: 20px;

    > .InputContent {
      margin-top: 10px;

      > input, select {
        width: 100%;
        padding: 12px;
        border-radius: 3px;
        background-color: #999;
        color: #fff;
      }

      > .ContainerRadio {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }
  }

  > .OptionsButtons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
      padding: 10px;
      background-color: #333;
      color: #fff;
      border-radius: 5px;
    }
  }
`;