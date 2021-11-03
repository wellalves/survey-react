import styled from 'styled-components';

export const ContainerMain = styled.div`
  height: 100%;
  
  > .Container {
    width: 450px;
    height: 350px;
    background-color: #fff;
    box-shadow: 0px 0px 15px 1px #1111112d;
    border-radius: 5px;
    padding: 20px;
    
    > .Header {
      margin-bottom: 20px;
    }

    > .SpaceChart {
      width: 400px;
      height: 240px;
    }
  }
 > .RowCard{
      width: 450px;
      height: 100px;
      background-color: #fff;
      margin-bottom: 20px;
      text-align:left;

  > .Card {
      width: 32%;
      height: 100px;
      background-color: #fff;
      box-shadow: 0px 0px 15px 1px #1111112d;
      border-radius: 5px;
      padding: 20px;
      margin-right: 5px;
      margin-bottom: 20px;
      text-align:center; 
      float: left;
      

      > .Header {
        margin-bottom: 20px;
        font-size:14px
      }

      > .Value {
        margin-bottom: 20px;
      }
    }
  }
`;