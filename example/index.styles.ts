import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AppTitle = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 13px;
  color: #000;
`;

export const FormContainer = styled.form`
  width: 600px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #4e4e4e;
  background: white;
  border: 2px solid #eff2f6;
  box-sizing: border-box;
  border-radius: 5px;
  text-indent: 20px;
  margin-top: 20px;

  ::placeholder {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 13px;
    color: #000;
    text-indent: 15px;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 150px;
  height: 42px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #fe0000;
  cursor: pointer;
`;
