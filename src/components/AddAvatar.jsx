const AddAvatar = ({ value, onChange, src }) => {
  console.log(src);
  return (
    <>
      <label htmlFor="avatar" className="block border-slate-300 border-[1px] w-full aspect-square bg-white cursor-pointer">
        <img src={src} alt="" />
      </label>
      <input type="file" onChange={onChange} value={value} name="" id="avatar" className="sr-only" />
    </>
  );
};

export default AddAvatar;
