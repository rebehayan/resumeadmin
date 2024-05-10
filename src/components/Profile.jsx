import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  if (!user) {
    navigate("/login");
  }
  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {user.displayName}님. 반갑습니다.
      <button>
        <img src={user.photoURL} alt="개인정보수정" />
      </button>
      <button onClick={handleLogOut}>로그아웃</button>
    </div>
  );
};

export default Profile;
