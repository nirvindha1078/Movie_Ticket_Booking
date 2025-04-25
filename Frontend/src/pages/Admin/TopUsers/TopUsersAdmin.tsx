import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { OuterDiv, TotalUsers, UserCard, UserInfo, UserTitle } from './TopUsersStyles';

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  moviesBooked: number;
}

const TopUsersByBookings = () => {
  const [users, setUsers] = useState<User[]>([]);  
  const [totalUsers, setTotalUsers] = useState<User[]>([]);
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
        
        const allUsers = response.data;
        setTotalUsers(allUsers);

        const ordersResponse = await axios.get('https://localhost:7128/api/admin/admindashboard/orders',{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,  
          },
        });
        const allOrders = ordersResponse.data;

        const userBookingCount: { [userId: string]: number } = {};

        allOrders.forEach((order: any) => {
          const userId = order.userId;
          if (userBookingCount[userId]) {
            userBookingCount[userId]++;
          } else {
            userBookingCount[userId] = 1;
          }
        });

        const userMovieCount = allUsers.map((user: User) => ({
          ...user,
          moviesBooked: userBookingCount[user.id] || 0, 
        }));

        const sortedUsers = userMovieCount.sort((a, b) => b.moviesBooked - a.moviesBooked);

        const topUsers = sortedUsers.slice(0, 10);

        const usersWithBookingDetails = await Promise.all(
          topUsers.map(async (user) => {
            if (user.moviesBooked > 0) {
              try {
                const orderDetailsResponse = await axios.get(`https://localhost:7128/api/order/${user.id}`);
                return { ...user, orderDetails: orderDetailsResponse.data }; 
              } catch (error) {
                //console.error(`Error fetching order details for user ${user.id}:`, error);
                return user; 
              }
            } else {
              return user; 
            }
          })
        );

        setUsers(usersWithBookingDetails);

      } catch (error) {
        //console.error('Error fetching users or orders:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
        <TotalUsers>Top Users by Movie Bookings</TotalUsers>
        <OuterDiv>
          <UserTitle>Top Users List</UserTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {users.map((user) => (
              <UserCard key={user.id}>
                <h3>{user.username}</h3>
                <UserInfo><b>Email:</b> {user.email}</UserInfo>
                <UserInfo><b>Phone:</b> {user.phoneNumber}</UserInfo>
                <UserInfo><b>Total Movies Booked:</b> {user.moviesBooked}</UserInfo>
              </UserCard>
            ))}
          </div>
        </OuterDiv>
    </div>
  );
};

export default TopUsersByBookings;
