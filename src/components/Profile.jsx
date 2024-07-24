import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { IoMdPower } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();
  const user = auth.currentUser;
  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    setUserData(user);
  }, []);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-2 justify-self-end">
      <Link to="/mypage">{userData.name}</Link>
      <Link to="/mypage">
        <img src={userData?.avatar} alt="개인정보수정" className="w-10 aspect-square rounded-full border-solid border-[1px] border-slate-300" />
      </Link>
      <button onClick={handleLogOut} aria-label="로그아웃" className="w-10 aspect-square rounded-full border-solid border-[1px] border-slate-300 flex items-center justify-center">
        <IoMdPower />
      </button>
    </div>
  );
};

export default Profile;
