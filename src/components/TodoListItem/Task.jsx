import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Message } from "../styled";
import { API_URL } from "../../../.config";
import useForm from "../../hooks/useForm";
import Subtask from "./Subtask";

const Column = styled.div`
  width: 50%;
`;

const Title = styled.input.attrs({
  type: "text",
})`
  text-decoration: ${({ isCompleted }) => isCompleted ? "line-through" : "none"};
  margin-bottom: 2px;
  &:focus {
    border-bottom: 1px solid #137cbd;
  }
`;

const Task = ({ id, title, is_completed, subtask }) => {
  const [task, setTask] = useState(title);
  const inputRef = useRef(null);

  const updateTodo = async () => {
    try {
      const result = await axios.patch(`${API_URL}/tasks`, {
        id,
        title: value,
      });
      setTask(result.data.task.title);
    } catch (err) {
      console.log(err);
    }
  }

  const { value, error, handleChange, handleKeydown } = useForm(updateTodo);

  useEffect(() => {
    if (error) {
      inputRef.current.focus();
    }
  }, [error])

  return (
    <Column>
      <Title
        ref={inputRef}
        name="task"
        defaultValue={task}
        isCompleted={is_completed}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      { !!error ? <Message>{error}</Message> : null }
      <Subtask
        id={id}
        subtask={subtask}
      />
    </Column>
  )
}

export default React.memo(Task);