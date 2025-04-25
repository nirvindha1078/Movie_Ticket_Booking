import styled from "styled-components";
export const MovieCard = styled.div`
    width: 250px;
    background-color: #f9f9f9;
    padding: 15px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const MoviePoster = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
`;

export const SelectStatus = styled.select`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

export const UpdateButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

export const Alert = styled.div`
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border-radius: 4px;
    margin-top: 20px;
    width: 30%;
    margin-left: 25%;
`;

export const OuterDiv = styled.div`
    margin-left: 16%;
    padding: 20px;
`;

export const UpdateTitle = styled.h2`
    margin-left: 29%;
    font-size: 32px;
`;
