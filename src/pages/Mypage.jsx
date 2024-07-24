import { useState } from "react";
import Input from "../components/form/Input";
import Checkbox from "../components/form/Checkbox";
import AddAvatar from "../components/AddAvatar";
import { db, storage } from "../firebase";
import _ from "lodash";
import { doc, setDoc } from "firebase/firestore";
import Block from "../components/Block";
import Heading from "../components/Heading";
import Text from "../components/Text";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Loading from "../components/Loading";
import { useUserStore } from "../store/userStore";

const Mypage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useUserStore();
  const [userInfo, setUserInfo] = useState(userData);
  const userDocRef = doc(db, "users", userData.uid);

  // const onChange = _.debounce((e) => {
  //   const { name, value, checked } = e.target;

  //   let newValue;
  //   let newUrlValue = "";

  //   // name, phone, job, address와 같은 고정된 필드 처리
  //   if (name === "name" || name === "phone" || name === "job" || name === "address") {
  //     newValue = value;
  //   }
  //   // SNS 관련 필드 처리
  //   else if (name === "instagram" || name === "facebook" || name === "blog" || name === "youtube" || name === "tiktok" || name === "twitter" || name === "website") {
  //     newValue = checked;
  //     newUrlValue = checked ? value : "";
  //   }

  //   setUserInfo((prev) => ({
  //     ...prev,
  //     [name]: newValue,
  //     [`${name}_url`]: newUrlValue,
  //   }));
  // }, 300);

  const onChange = _.debounce((e) => {
    const { name, value, checked } = e.target;
    if (name === "name") {
      setUserInfo((prev) => ({ ...prev, name: value }));
    } else if (name === "phone") {
      setUserInfo((prev) => ({ ...prev, phone: value }));
    } else if (name === "job") {
      setUserInfo((prev) => ({ ...prev, job: value }));
    } else if (name === "address") {
      setUserInfo((prev) => ({ ...prev, address: value }));
    } else if (name === "instagram") {
      setUserInfo((prev) => ({ ...prev, instagram: checked }));
    } else if (name === "instagram_url") {
      setUserInfo((prev) => ({ ...prev, instagram_url: value }));
    } else if (name === "facebook") {
      setUserInfo((prev) => ({ ...prev, facebook: checked }));
    } else if (name === "facebook_url") {
      setUserInfo((prev) => ({ ...prev, facebook_url: value }));
    } else if (name === "blog") {
      setUserInfo((prev) => ({ ...prev, blog: checked }));
    } else if (name === "blog_url") {
      setUserInfo((prev) => ({ ...prev, blog_url: value }));
    } else if (name === "youtube") {
      setUserInfo((prev) => ({ ...prev, youtube: checked }));
    } else if (name === "youtube_url") {
      setUserInfo((prev) => ({ ...prev, youtube_url: value }));
    } else if (name === "tiktok") {
      setUserInfo((prev) => ({ ...prev, tiktok: checked }));
    } else if (name === "tiktok_url") {
      setUserInfo((prev) => ({ ...prev, tiktok_url: value }));
    } else if (name === "twitter") {
      setUserInfo((prev) => ({ ...prev, twitter: checked }));
    } else if (name === "twitter_url") {
      setUserInfo((prev) => ({ ...prev, twitter_url: value }));
    } else if (name === "website") {
      setUserInfo((prev) => ({ ...prev, website: checked }));
    } else if (name === "website_url") {
      setUserInfo((prev) => ({ ...prev, website_url: value }));
    }
  }, 100);

  const handleAddFile = (e) => {
    const file = e.target.files[0];
    setUserInfo((prev) => ({ ...prev, avatar: file }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const filename = userInfo.avatar.name;
    const userStorage = ref(storage, `userAvatar/${filename}`);
    setIsLoading(true);
    try {
      const result = await uploadBytes(userStorage, userInfo.avatar);
      const downloadURL = await getDownloadURL(result.ref);

      await setDoc(
        userDocRef,
        {
          ...userInfo,
          avatar: downloadURL,
        },
        { merge: true }
      );
      setUserInfo((prev) => ({ ...prev, avatar: downloadURL }));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10">
      <div className="w-[200px]">
        <AddAvatar onChange={handleAddFile} src={userInfo?.avatar} />
      </div>
      <div className="flex-1">
        <Heading tag="h2" text="개인정보 수정" />
        <Block>
          <form onSubmit={onSubmit}>
            <fieldset>
              <legend className="sr-only">개인정보 수정</legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Input title="이름" name="name" value={userInfo.name} onChange={onChange} />
                </div>
                <div className="grid gap-2">
                  <Input title="이메일" name="email" value={userInfo?.email} readOnly={true} />
                </div>
                <div className="grid gap-2">
                  <Input title="핸드폰번호(-제외하고 입력)" type="number" name="phone" onChange={onChange} value={userInfo?.phone} />
                </div>
                <div className="grid gap-2">
                  <Input title="직업" type="text" name="job" onChange={onChange} value={userInfo?.job} />
                </div>
                <div className="col-span-2">
                  <Input title="주소" type="text" name="address" onChange={onChange} value={userInfo?.address} />
                </div>
                <div className="col-span-2 grid gap-2">
                  <Text>SNS</Text>
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
              <div className="mt-10 text-center border-t-[1px] border-slate-200 pt-10">
                <button type="submit" className="btn-blue ">
                  회원정보수정
                </button>
              </div>
            </fieldset>
          </form>
          {isLoading && <Loading />}
        </Block>
      </div>
    </div>
  );
};

export default Mypage;
