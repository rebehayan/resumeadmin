import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Main = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <div>
      <button onClick={handleLogOut}>로그아웃</button>
    </div>
  );
};

export default Main;
