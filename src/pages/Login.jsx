import _ from "lodash";
import PassWord from "../components/form/Password";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = _.debounce((e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setIsId(value);
    } else if (name === "password") {
      setIsPw(value);
    }
  }, 500);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isId === "" || isPw === "") {
      setIsError("아이디 / 비밀번호를 입력하세요.");
    }
    try {
      await signInWithEmailAndPassword(auth, isId, isPw);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.message.match("auth/invalid-credential")) {
          setIsError("아이디 또는 비번이 맞지 않습니다.");
        } else {
          console.log(error.message);
        }
      }
    } finally {
      console.log("끝");
    }
  };

  return (
    <main className="flex h-[100vh] justify-center items-center flex-col">
      <form onSubmit={onSubmit}>
        <fieldset className="grid gap-3 w-[25rem]">
          <legend className="text-center text-3xl pb-10">로그인</legend>
          <Input name="id" placeholder="아이디" onChange={handleLogin} />
          <PassWord name="password" placeholder="비밀번호" onChange={handleLogin} />
          <Button value="로그인" className="w-full" />
        </fieldset>
      </form>
      <Link to="/join" className="mt-10">
        회원가입
      </Link>
      {isError && isError}
      {isLoading && "Loading..."}
    </main>
  );
};

export default Login;
