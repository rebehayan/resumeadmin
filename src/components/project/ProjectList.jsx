import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const user = auth.currentUser;
  const projectCollectionRef = collection(db, "project");
  const fetchData = async () => {
    const userDoc = await getDocs(projectCollectionRef);
    const myProject = userDoc.docs.filter((doc) => doc.data().uid === user.uid);
    setProjects(myProject);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(projects);
  return (
    <ul className="h-[31.5rem] overflow-auto">
      {projects.map((project) => (
        <li key={project.id} className="grid grid-cols-[1fr_min-content] border-b border-slate-300 py-3">
          <div className="text-lg font-medium">{project.data().title}</div>
          <div className="text-sm font-light">
            {project.data().date_start} ~ {project.data().date_end}
          </div>
          <div className="whitespace-nowrap row-start-1 row-end-3 col-start-2 col-end-3 self-center flex gap-2">
            <button className="whitespace-nowrap">수정</button>
            <button className="whitespace-nowrap">삭제</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
