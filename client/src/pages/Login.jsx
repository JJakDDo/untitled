import React from "react";
import axios from "axios";

const login = () => {
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/user/login", {
      userId: "test",
      password: "test",
    });
    console.log(response);
  };
  return (
    <div>
      <input type='text' placeholder='유저 ID'></input>
      <input type='password' placeholder='비밀번호'></input>
      <button onClick={loginHandler}>로그인</button>
      <button>회원가입</button>
    </div>
  );
};

export default login;
