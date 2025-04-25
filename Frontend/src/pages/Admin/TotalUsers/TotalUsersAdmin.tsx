import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TotalUsers, OuterDiv, UserTitle, UserCard, UserInfo } from './TotalUsersStyles';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  phoneNumber: string;
  email: string;
}

const TotalUsersAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7128/api/admin/admindashboard/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`, 
          },
        });
        
        setUsers(response.data); 
        setTotalUsers(response.data.length);
      } catch (error) {
        //console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
        <TotalUsers>Total Registered Users: {totalUsers}</TotalUsers>
        <OuterDiv>
      <UserTitle>Users List</UserTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <UserCard key={user.id}>
            <h3>{user.username}</h3>
            <UserInfo><b>Email:</b> {user.email}</UserInfo>
            <UserInfo><b>Phone:</b> {user.phoneNumber}</UserInfo>
          </UserCard>
        ))}
      </div>
    </OuterDiv>
    </div>
    
  );
};

export default TotalUsersAdmin;
