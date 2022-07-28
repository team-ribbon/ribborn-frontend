import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 페이지 이동 시 스크롤의 위치를 초기화하는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
