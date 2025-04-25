import styled from "styled-components";
export { OuterDiv, UserCard, UserInfo, UserTitle, TotalUsers };
const OuterDiv = styled.div`
  margin-left: 16%;
  padding: 10px;
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
padding: 0px;
 margin:0px;
  margin-left: 35%;
  margin-bottom: 20px;
`;

const TotalUsers = styled.div`
  margin-top:40px;
  font-size: 18px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  margin-left: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 30%;
  margin-left: 35%;
  text-align: center;
`;