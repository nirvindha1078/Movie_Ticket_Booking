import styled from "styled-components";
export { OuterDiv, UserCard, UserInfo, UserTitle, TotalUsers };
const OuterDiv = styled.div`
  margin-left: 16%;
  padding: 10px;
  margin-top: 10px;
`;

const UserCard = styled.div`
  width: 250px;
  background-color: #f9f9f9;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const UserInfo = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const UserTitle = styled.h2`
  margin-left: 32%;
  margin-top: 10px;
`;

const TotalUsers = styled.div`
  font-size: 18px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  margin-left: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 30%;
  margin-left: 34%;
  text-align: center;
  margin-top: 40px;
`;