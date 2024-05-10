import _ from "lodash";
import PassWord from "../components/form/Password";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import Alert from "../components/Alert";

const Login = () => {
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
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
      setIsAlert(!isAlert);
    }
    try {
      await signInWithEmailAndPassword(auth, isId, isPw);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.message.match("auth/invalid-credential")) {
          setIsError("아이디 또는 비번이 맞지 않습니다.");
          setIsAlert(!isAlert);
        } else if (error.message.match("many")) {
          setIsError(
            "여러 번의 로그인 시도 실패로 인해 이 계정에 대한 액세스가 일시적으로 비활성화되었습니다. 비밀번호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다. (인증/요청이 너무 많음)."
          );
          setIsAlert(!isAlert);
        } else {
          console.log(error.message);
        }
      }
    } finally {
      setIsLoading(false);
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
      <Alert open={isAlert} close={() => setIsAlert(false)}>
        {isError && isError}
      </Alert>
      {isLoading && "Loading..."}
    </main>
  );
};

export default Login;
