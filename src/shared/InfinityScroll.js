import React, { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const _handleScroll = _.throttle(() => {
    //로딩중이면 callNext()를 안부르도록
    if (loading) {
      return;
    }

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    // 브라우저 마다 scrollTop 가져오는게 달라서 호완성을 위해!
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 300) {
      callNext();
    }
  }, 500);

  const handleScroll = useCallback(_handleScroll, [loading, _handleScroll]);

  useEffect(() => {
    //자료를 받아오는 loading 중에는 이벤트 발생하지 않도록
    //꼭 잘 막아주기!
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading, handleScroll]);

  return <>{children}</>;
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_Next: false,
  loading: false,
};

export default InfinityScroll;
