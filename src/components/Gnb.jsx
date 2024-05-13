import { Link, useLocation } from "react-router-dom";

const Gnb = () => {
  const location = useLocation();
  return (
    <>
      <h2 className="sr-only">대메뉴</h2>
      <nav className=" justify-self-center">
        <ul className="gnb inline-flex  gap-1 py-5 px-3 rounded-full border-slate-200 border-[1px]">
          <li>
            <Link to="/" className={location.pathname === "/" ? "--active" : ""}>
              홈
            </Link>
          </li>
          <li>
            <Link to="/project" className={location.pathname === "/project" ? "--active" : ""}>
              프로젝트
            </Link>
          </li>
          <li>
            <Link to="/education">교육이력</Link>
          </li>
          <li>
            <Link to="/skills">스킬</Link>
          </li>
          <li>
            <Link to="/awards">수상내역</Link>
          </li>
          <li>
            <Link to="/hobby">취미</Link>
          </li>
          <li>
            <Link to="/introduce">자기소개</Link>
          </li>
          <li>
            <Link to="/reason">입사지원이유</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Gnb;
