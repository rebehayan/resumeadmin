import Block from "../components/Block";
import Heading from "../components/Heading";
import ProjectList from "../components/project/ProjectList";
import ProjectCreate from "../components/project/ProjectCreate";

const Project = () => {
  return (
    <>
      <div className="text-center"></div>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <div>
          <Heading tag="h2" text="프로젝트 리스트" />
          <Block>
            <ProjectList />
          </Block>
        </div>
        <div>
          <Heading tag="h2" text="프로젝트 등록" />
          <Block>
            <ProjectCreate />
          </Block>
        </div>
      </div>
    </>
  );
};

export default Project;
