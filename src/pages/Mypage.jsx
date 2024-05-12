import { useEffect, useState } from "react";
import File from "../components/form/File";
import Input from "../components/form/Input";
import { auth, db } from "../firebase";
import _ from "lodash";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Mypage = () => {
  const user = auth.currentUser;
  const uid = user?.uid;
  const userDocRef = doc(db, "users", user.uid);

  const [userInfo, setUserInfo] = useState({});
  const { address, job, phone, userId, name } = userInfo;

  const fetchData = async () => {
    const userDoc = await getDoc(userDocRef);
    setUserInfo({
      address: userDoc.data()?.address,
      job: userDoc.data()?.job,
      phone: userDoc.data()?.phone,
      photo: "",
      sns: [
        {
          title: "",
          url: "",
        },
      ],
      userId: uid,
      name: user?.displayName || userDoc.data()?.name,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = _.debounce((e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setUserInfo({ ...userInfo, name: value });
    } else if (name === "phone") {
      setUserInfo({ ...userInfo, phone: value });
    } else if (name === "job") {
      setUserInfo({ ...userInfo, job: value });
    } else if (name === "address") {
      setUserInfo({ ...userInfo, address: value });
    }
  }, 300);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(userDocRef, {
        address: address,
        job: job,
        name: name,
        uid: userId,
        phone: phone,
      });
      console.log("성공");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>개인정보 수정</legend>
          <Input title="이름" name="name" value={user?.displayName || userInfo.name} onChange={onChange} />
          <Input title="이메일" name="email" value={user?.email} readOnly={true} />
          <Input title="핸드폰번호(-제외하고 입력)" type="number" name="phone" onChange={onChange} value={userInfo?.phone} />
          <Input title="직업" type="text" name="job" onChange={onChange} value={userInfo?.job} />
          <Input title="주소" type="text" name="address" onChange={onChange} value={userInfo?.address} />
          <File title="프로필사진" name="photo" />
          <button type="submit">회원정보수정</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Mypage;
