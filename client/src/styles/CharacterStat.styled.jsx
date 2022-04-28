import styled from "styled-components";

export const Container = styled.div`
  width: 600px;
  background-color: #ff6f91;
  color: white;
  border-radius: 20px;
  margin: 30px auto;
`;

export const MainStatContainer = styled.div`
  display: flex;
  width: 250px;
  margin: 0 auto;
  padding: 20px 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const SubStatContainer = styled.div`
  display: grid;
  width: 400px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 15px;
  padding: 20px 0;
`;

export const TextContainer = styled.div``;
