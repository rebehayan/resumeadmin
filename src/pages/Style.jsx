import _ from "lodash";
import PassWord from "../components/form/Password";
import File from "../components/form/File";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import Textarea from "../components/form/Textarea";
import Select from "../components/form/Select";
import Input from "../components/form/Input";
import { option } from "../lib/option";
import Radio from "../components/form/Radio";

const Login = () => {
  const handleInput = _.debounce((e) => {
    console.log(e.target.value);
  }, 500);

  const handlePassword = _.debounce((e) => {
    console.log(e.target.value);
  }, 500);

  const handleCheck = (e) => {
    const isCheck = e.target.checked;
    const isName = e.target.value;
    isCheck && console.log(isName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("전송");
  };

  const handleRadio = (e) => {
    const checked = e.target.checked;
    checked && console.log(e.target.value);
  };

  return (
    <main className="p-10">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>온라인서식 가이드</legend>
          <Input name="id" onChange={handleInput} />
          <PassWord name="password" onChange={handlePassword} />
          <File />
          <Checkbox label="선택하세요" value="선택하세요1" name="hobby" onChange={handleCheck} />
          <Checkbox label="선택하세요2" value="선택하세요2" name="hobby2" onChange={handleCheck} />
          <Button value="검색" />
          <Textarea />
          <Select options={option} value="선택하세요." />
          <Radio name="radiogroup" label="선택1" value="선택1" onChange={handleRadio} />
          <Radio name="radiogroup" label="선택2" value="선택2" onChange={handleRadio} />
        </fieldset>
      </form>
    </main>
  );
};

export default Login;
