import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../../.config";
import { store } from "../../store";

const Column = styled.div`
  width: 10%;
`;

const Button = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  &:before {
    font-family: "Font Awesome 5 Free";
    content: "\f2ed";
    position: absolute;
    right: 3%;
    color: #f5f8fa;
  }
  &:hover {
    &:before {
      color: #48aff0;
    }
  }
`
const DeleteBtn = ({ id }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const deleteTodo = async () => {
    try {
      const result = await axios.delete(`${API_URL}/tasks/${id}`);
      const { tasks } = result.data;
      dispatch({
        type: "UPDATE_TODO",
        tasks,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Column>
      <Button onClick={deleteTodo} />
    </Column>
  )
}

export default React.memo(DeleteBtn);