import { useEffect, useState } from "react";
import Input from "../components/form/Input";
import Checkbox from "../components/form/Checkbox";
import Avatar from "../components/Avatar";
import { auth, db } from "../firebase";
import _ from "lodash";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Block from "../components/Block";
import Heading from "../components/Heading";

const Mypage = () => {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid);

  const [userInfo, setUserInfo] = useState({});

  const fetchData = async () => {
    try {
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      setUserInfo({
        ...userData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = _.debounce((e) => {
    const { name, value, checked } = e.target;
    if (name === "name") {
      setUserInfo({ ...userInfo, name: value });
    } else if (name === "phone") {
      setUserInfo({ ...userInfo, phone: value });
    } else if (name === "job") {
      setUserInfo({ ...userInfo, job: value });
    } else if (name === "address") {
      setUserInfo({ ...userInfo, address: value });
    } else if (name === "instagram") {
      setUserInfo({ ...userInfo, instagram: checked });
    } else if (name === "instagram_url") {
      setUserInfo({ ...userInfo, instagram_url: value });
    } else if (name === "facebook") {
      setUserInfo({ ...userInfo, facebook: checked });
    } else if (name === "facebook_url") {
      setUserInfo({ ...userInfo, facebook_url: value });
    } else if (name === "blog") {
      setUserInfo({ ...userInfo, blog: checked });
    } else if (name === "blog_url") {
      setUserInfo({ ...userInfo, blog_url: value });
    } else if (name === "youtube") {
      setUserInfo({ ...userInfo, youtube: checked });
    } else if (name === "youtube_url") {
      setUserInfo({ ...userInfo, youtube_url: value });
    } else if (name === "tiktok") {
      setUserInfo({ ...userInfo, tiktok: checked });
    } else if (name === "tiktok_url") {
      setUserInfo({ ...userInfo, tiktok_url: value });
    } else if (name === "twitter") {
      setUserInfo({ ...userInfo, twitter: checked });
    } else if (name === "twitter_url") {
      setUserInfo({ ...userInfo, twitter_url: value });
    } else if (name === "website") {
      setUserInfo({ ...userInfo, website: checked });
    } else if (name === "website_url") {
      setUserInfo({ ...userInfo, website_url: value });
    }
  }, 300);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(userDocRef, {
        ...userInfo,
        uid: user?.uid,
      });
      console.log("성공");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10">
      <div className="w-[200px]">
        <Avatar />
      </div>
      <div className="flex-1">
        <Heading tag="h2" text="개인정보 수정" />
        <Block>
          <form onSubmit={onSubmit}>
            <fieldset>
              <legend className="sr-only">개인정보 수정</legend>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input title="이름" name="name" value={user?.displayName || userInfo.name} onChange={onChange} />
                </div>
                <div>
                  <Input title="이메일" name="email" value={user?.email} readOnly={true} />
                </div>
                <div>
                  <Input title="핸드폰번호(-제외하고 입력)" type="number" name="phone" onChange={onChange} value={userInfo?.phone} />
                </div>
                <div>
                  <Input title="직업" type="text" name="job" onChange={onChange} value={userInfo?.job} />
                </div>
                <div className="col-span-2">
                  <Input title="주소" type="text" name="address" onChange={onChange} value={userInfo?.address} />
                </div>
                <div className="col-span-2">
                  SNS
                  <ul className="grid grid-cols-2 gap-4">
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="인스타그램" name="instagram" onChange={onChange} checked={userInfo.instagram} />
                      {userInfo.instagram && <Input type="url" name="instagram_url" value={userInfo.instagram_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="페이스북" name="facebook" onChange={onChange} checked={userInfo.facebook} />
                      {userInfo.facebook && <Input type="url" name="facebook_url" value={userInfo.facebook_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="블로그" name="blog" onChange={onChange} checked={userInfo.blog} />
                      {userInfo.blog && <Input type="url" name="blog_url" value={userInfo.blog_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="유튜브" name="youtube" onChange={onChange} checked={userInfo.youtube} />
                      {userInfo.youtube && <Input type="url" name="youtube_url" value={userInfo.youtube_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="틱톡" name="tiktok" onChange={onChange} checked={userInfo.tiktok} />
                      {userInfo.tiktok && <Input type="url" name="tiktok_url" value={userInfo.tiktok_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="트위터" name="twitter" onChange={onChange} checked={userInfo.twitter} />
                      {userInfo.twitter && <Input type="url" name="twitter_url" value={userInfo.twitter_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                    <li className="grid grid-cols-[10rem_1fr] items-center gap-2">
                      <Checkbox label="웹사이트" name="website" onChange={onChange} checked={userInfo.website} />
                      {userInfo.website && <Input type="url" name="website_url" value={userInfo.website_url} placeholder="주소를 입력해 주세요." onChange={onChange} />}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 text-center">
                <button type="submit">회원정보수정</button>
              </div>
            </fieldset>
          </form>
        </Block>
      </div>
    </div>
  );
};

export default Mypage;
