import _ from "lodash";
import PassWord from "../components/form/Password";
import File from "../components/form/File";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import Textarea from "../components/form/Textarea";
import Select from "../components/form/Select";
import Input from "../components/form/Input";
import { option } from "../lib/option";

const Login = () => {
  const handleInput = _.debounce((e) => {
    console.log(e.target.value);
  }, 500);

  const handlePassword = _.debounce((e) => {
    console.log(e.target.value);
  }, 500);

  const handleCheck = (e) => {
    const isCheck = e.target.checked;
    const isName = e.target.name;
    isCheck && console.log(isName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("전송");
  };

  return (
    <main className="p-10">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>온라인서식 가이드</legend>
          <Input name="id" onChange={handleInput} />
          <PassWord name="password" onChange={handlePassword} />
          <File />
          <Checkbox value="선택하세요" name="hobby" onChange={handleCheck} />
          <Checkbox value="선택하세요2" name="hobby2" onChange={handleCheck} />
          <Button value="검색" />
          <Textarea />
          <Select options={option} value="선택하세요." />
        </fieldset>
      </form>
    </main>
  );
};

export default Login;
