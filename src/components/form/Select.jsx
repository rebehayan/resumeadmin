import { useId, useState } from "react";
const styleButton = "flex w-full relative rounded-md text-start bg-white dark:bg-slate-950 border px-3 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-slate-200 focus:shadow-none py-2 text-sm/[1.125rem]";
const styleButtonArrow = "pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3";
const styleButtonArrowSvg = "h-4 w-4 text-gray-400 dark:text-gray-300 transition-all ui-open:rotate-180";
const styleSelectList = "absolute bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full rounded-md z-10 max-h-80 overflow-y-auto p-0";
const styleOption = "w-full text-left box-border text-sm font-medium px-3 py-1.5 cursor-pointer transition-all hover:bg-blue-200 hover:dark:bg-blue-950 hover:text-blue-500 ui-disabled:bg-slate-100 ui-disabled:text-slate-300 text-slate-600 dark:text-slate-200";

const Select = ({ value, options }) => {
  const [isSelect, setIsSelect] = useState(value);
  const [isToggle, setIsToggle] = useState(false);
  const id = useId();

  const handleOption = (e) => {
    e.preventDefault();
    const text = e.target.innerText;
    setIsSelect(text);
    setIsToggle(!isToggle);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsToggle(!isToggle);
  };

  return (
    <div className="relative">
      <button aria-expanded={isToggle ? true : false} id={`select_${id}`} onClick={handleToggle} className={styleButton}>
        {isSelect}
        <span className={styleButtonArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className={styleButtonArrowSvg}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
          </svg>
        </span>
      </button>
      {isToggle && (
        <ul role="listbox" aria-labelledby={`select_${id}`} className={styleSelectList} tabIndex="0">
          {options.map((option) => (
            <li key={option.id} value={option.id} role="option" aria-selected="true">
              <button onClick={handleOption} className={styleOption}>
                {option.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

// Native Version
// const Select = ({ options }) => {
//   return (
//     <select>
//       {options.map((option) => (
//         <option key={option.id} value={option.value}>
//           {option.value}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Select;
