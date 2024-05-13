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
  }, [projectCollectionRef]);

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          {project.data().title}
          <button> 수정</button>
          <button> 삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
