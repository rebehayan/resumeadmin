import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/form/Input";
import PassWord from "../components/form/Password";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Join = () => {
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPw, setIsPw] = useState({
    pass1: "",
    pass2: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = _.debounce((e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setIsName(value);
    } else if (name === "email") {
      setIsEmail(value);
    }
  }, 500);

  const handlePassWord = _.debounce((e) => {
    const { name, value } = e.target;
    if (name === "password1") {
      setIsPw({ ...isPw, pass1: value });
    } else if (name === "password2") {
      setIsPw({ ...isPw, pass2: value });
    }
    if (isPw.pass1 !== isPw.pass2) {
      setIsError(!isError);
      console.log("비밀번호가 다릅니다.");
    }
  }, 500);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isName === "" || isEmail === "" || isPw.pass2 === "") {
      setIsError(!isError);
      console.log("입력창을 채워주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const createUser = await createUserWithEmailAndPassword(auth, isEmail, isPw.pass2);
      await updateProfile(createUser.user, {
        displayName: isName,
      });
    } catch (error) {
      console.log(error);
      if (error.match("6 characters")) {
        console.log("6자 이상 입력해야합니다.");
      }
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>회원가입</legend>
          <Input name="name" onChange={onChange} placeholder="이름을 입력하세요." />
          <Input name="email" onChange={onChange} placeholder="이메일을 입력하세요." />
          <PassWord name="password1" onChange={handlePassWord} className={isError ? "is-valid" : ""} placeholder="비밀번호를 입력하세요." />
          <PassWord name="password2" onChange={handlePassWord} className={isError ? "is-valid" : ""} placeholder="비밀번호를 한번 더 입력하세요." />
          <button type="submit" disabled={isError ? true : false}>
            회원가입
          </button>
        </fieldset>
      </form>
      {isLoading && "loading..."}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Join;
