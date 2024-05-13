import { useState } from "react";
import Calendar from "../form/Calendar";
import Input from "../form/Input";
import Textarea from "../form/Textarea";
import _ from "lodash";
import Radio from "../form/Radio";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const ProjectCreate = () => {
  const [projectInfo, setProjectInfo] = useState({});
  const [isURL, setIsURL] = useState(false);

  const user = auth.currentUser;

  const onChange = _.debounce((e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setProjectInfo((prev) => ({ ...prev, title: value }));
    } else if (name === "date_start") {
      setProjectInfo((prev) => ({ ...prev, date_start: value }));
    } else if (name === "date_end") {
      setProjectInfo((prev) => ({ ...prev, date_end: value }));
    } else if (name === "role") {
      setProjectInfo((prev) => ({ ...prev, role: value }));
    } else if (name === "content") {
      setProjectInfo((prev) => ({ ...prev, content: value }));
    } else if (name === "participation") {
      setProjectInfo((prev) => ({ ...prev, participation: value }));
    } else if (name === "url") {
      setProjectInfo((prev) => ({ ...prev, url: value }));
    } else if (name === "url_group") {
      setProjectInfo((prev) => ({ ...prev, url_group: value }));
      if (value === "URL없음") {
        setProjectInfo((prev) => ({ ...prev, url_group: "-" }));
      }
      if (value === "URL입력") {
        setIsURL(true);
      } else {
        setIsURL(false);
      }
    }
  }, 300);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (projectInfo.title === "" || projectInfo.role === "" || projectInfo.date_start === "" || projectInfo.date_end === "" || projectInfo.participation === "") {
      return;
    }
    try {
      await addDoc(collection(db, "project"), {
        ...projectInfo,
        uid: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend className="sr-only">프로젝트 등록</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input title="프로젝트명" name="title" onChange={onChange} />
            </div>
            <div>
              <Input title="역할" name="role" onChange={onChange} />
            </div>
            <div>
              <Calendar title="시작일" placeholder="시작일" type="date" name="date_start" onChange={onChange} />
              <Calendar title="종료일" type="date" min={projectInfo.date_start} name="date_end" onChange={onChange} />
            </div>
            <div>
              <Input title="참여도" type="number" name="participation" onChange={onChange} />%
            </div>
            <div className="col-span-2">
              <Textarea title="업무설명" name="content" onChange={onChange} />
            </div>
            <div className="col-span-2">
              <div>
                <div>
                  <Radio label="URL없음" name="url_group" value="URL없음" onChange={onChange} />
                  <Radio label="URL입력" name="url_group" value="URL입력" onChange={onChange} />
                  <Radio label="비공개사이트" name="url_group" value="비공개사이트" onChange={onChange} />
                  <Radio label="서비스종료" name="url_group" value="서비스종료" onChange={onChange} />
                </div>
                {isURL && <Input title="URL" type="url" name="url" onChange={onChange} />}
              </div>
            </div>
          </div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </>
  );
};

export default ProjectCreate;
