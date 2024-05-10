import Calendar from "../components/form/Calendar";
import Input from "../components/form/Input";
const Resume = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>이력서 등록</legend>
        <Input title="프로젝트명" />
        <div>
          <Calendar title="시작일" placeholder="시작일" type="date" />
          <Calendar title="종료일" type="date" />
        </div>
        <Input title="역할" />
        <Input title="프로젝트 설명" />
        <Input title="참여도" type="number" />
        <Input title="URL" type="url" />
        <button type="submit">등록</button>
        <button type="reset">취소</button>
      </fieldset>
    </form>
  );
};

export default Resume;
