const Text = ({ size = "base", children }) => {
  return <span className={`font-medium text-${size} text-slate-600 dark:text-slate-200`}>{children}</span>;
};
export default Text;
