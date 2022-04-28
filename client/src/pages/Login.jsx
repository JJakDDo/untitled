import React, { useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FlexBox } from "../styles/FlexBox.styled";
import { Input } from "../styles/Input.styled";
import { Button } from "../styles/Button.styled";

const login = () => {
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/user/login", {
      userId: "test",
      password: "test",
    });
    if (response.status === 200) {
      console.log(response);
      const {
        data: { token },
      } = response;
      localStorage.setItem("token", token);
      navigate("/character");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/character");
    }
  }, []);
  return (
    <FlexBox>
      <Input type='text' placeholder='유저 ID'></Input>
      <Input type='password' placeholder='비밀번호'></Input>
      <Button onClick={loginHandler}>로그인</Button>
      <Button>회원가입</Button>
    </FlexBox>
  );
};

export default login;
