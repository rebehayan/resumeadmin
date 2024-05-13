const Heading = ({ tag, text }) => {
  const TagName = tag;
  if (tag == "h2") {
    return <TagName className="text-xl font-semibold mb-4">{text}</TagName>;
  }
};

export default Heading;
