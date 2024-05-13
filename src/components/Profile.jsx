import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const user = auth.currentUser;
  if (!user) {
    navigate("/login");
  }
  const fetchData = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    setUserInfo({
      name: userDoc.data()?.name,
    });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

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
      <Link to="/mypage">{user?.displayName || userInfo.name}님. 반갑습니다.</Link>
      <button>
        <img src={user?.photoURL} alt="개인정보수정" />
      </button>
      <button onClick={handleLogOut}>로그아웃</button>
    </div>
  );
};

export default Profile;
