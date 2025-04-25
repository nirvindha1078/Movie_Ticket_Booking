import styled from 'styled-components';
export {
    AdminDashboardWrapper,
    CardsContainer,
    Column,
    Card,
    AdminTitle,
    LogoutButton,Para
};
const AdminDashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  height: 100%;
  background-color: #f4f7fc;
  align-items: center;
  margin-left:150px;
  width:1000px;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  flex-wrap: wrap;
  gap: 30px;  // Adding gap for better spacing between cards
`;

const Column = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;  // Space between the cards in a column
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size:20px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    background-color: #f0f0f0;
  }

  h3 {
    margin: 0;
    font-size: 24px;
    color: #333;
    font-weight: 600;
  }

  p {
    font-size: 16px;
    color: #888;
    margin-top: 10px;
  }
`;

const AdminTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  margin-left:120px;
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 40px;
  top: 20px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 1200px;
  margin-top: 5px;

  &:hover {
    background-color: #ff3333;
  }
`;

const Para=styled.p`
  font-size:200px;
`;