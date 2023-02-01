import React from "react";
import styled from "styled-components";
import HomeComponent from "./modules/home";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 12px;
  font-family: Montserrat;
`;

const Header = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22px;
  font-size: 25px;
  font-weight: bold;
`;
const App = () => {
  return (
    <Container>
      <Header>Expense Tracker</Header>
      <HomeComponent />
    </Container>
  );
};

export default App;
