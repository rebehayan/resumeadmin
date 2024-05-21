import { useState } from "react";
import Calendar from "../form/Calendar";
import Input from "../form/Input";
import Textarea from "../form/Textarea";
import _ from "lodash";
import Radio from "../form/Radio";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import TextError from "../TextError";

const ProjectCreate = () => {
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    date_start: "",
    date_end: "",
    role: "",
    content: "",
    participation: "",
    url: "",
    url_group: "",
  });
  const [isURL, setIsURL] = useState(false);
  const [isError, setIsError] = useState({
    title: false,
    date_start: false,
    date_end: false,
    role: false,
    participation: false,
  });

  const user = auth.currentUser;

  const onChange = _.debounce((e) => {
    const { name, value } = e.target;

    setProjectInfo((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      setIsError((prev) => ({ ...prev, [name]: true }));
    } else {
      setIsError((prev) => ({ ...prev, [name]: false }));
    }

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
    // 필수 입력값 확인
    const { title, role, date_start, date_end, participation } = projectInfo;
    if (!title.trim() || !role.trim() || !date_start.trim() || !date_end.trim() || !participation.trim()) {
      setIsError({
        title: !title.trim(),
        role: !role.trim(),
        date_start: !date_start.trim(),
        date_end: !date_end.trim(),
        participation: !participation.trim(),
      });
      return;
    }
    try {
      await addDoc(collection(db, "project"), {
        ...projectInfo,
        uid: user.uid,
      });
      setProjectInfo({
        title: "",
        date_start: "",
        date_end: "",
        role: "",
        content: "",
        participation: "",
        url: "",
        url_group: "",
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
              <Input title="프로젝트명" name="title" value={projectInfo.title} onChange={onChange} />
              {isError.title && <TextError>프로젝트명을 입력해주세요.</TextError>}
            </div>
            <div>
              <Input title="역할" name="role" value={projectInfo.role} onChange={onChange} />
              {isError.role && <TextError>역할를 입력해주세요.</TextError>}
            </div>
            <div>
              <div className="flex gap-4">
                <div className="grid flex-1">
                  <Calendar title="시작일" placeholder="시작일" max={projectInfo.date_end} type="date" name="date_start" onChange={onChange} />
                  {isError.date_start && <TextError>시작일을 입력해주세요.</TextError>}
                </div>
                <div className="grid flex-1">
                  <Calendar title="종료일" type="date" min={projectInfo.date_start} name="date_end" onChange={onChange} />
                  {isError.date_end && <TextError>종료일을 입력해주세요.</TextError>}
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="flex-1">
                  <Input title="참여도" type="number" value={projectInfo.participation} name="participation" onChange={onChange} />
                </div>
                <div className="basis-10 text-center">%</div>
              </div>
              {isError.participation && <TextError>참여도를 입력해주세요.</TextError>}
            </div>
            <div className="col-span-2">
              <Textarea title="업무설명" height="10rem" name="content" onChange={onChange} />
            </div>
            <div className="col-span-2">
              <div>
                <ul className="flex gap-4">
                  <li>
                    <Radio label="URL없음" name="url_group" value="URL없음" onChange={onChange} />
                  </li>
                  <li>
                    <Radio label="URL입력" name="url_group" value="URL입력" onChange={onChange} />
                  </li>
                  <li>
                    <Radio label="비공개사이트" name="url_group" value="비공개사이트" onChange={onChange} />
                  </li>
                  <li>
                    <Radio label="서비스종료" name="url_group" value="서비스종료" onChange={onChange} />
                  </li>
                </ul>
                {isURL && (
                  <div className="mt-4">
                    <Input title="URL" type="url" name="url" onChange={onChange} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10 text-center border-t-[1px] border-slate-200 pt-10">
            <button type="submit" className="btn-blue">
              등록
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ProjectCreate;
