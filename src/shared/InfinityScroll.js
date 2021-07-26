import React, { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, callNext, is_Next, loading } = props;

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

    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    //자료를 받아오는 loading 중에는 이벤트 발생하지 않도록
    //꼭 잘 막아주기!
    if (loading) {
      return;
    }

    if (is_Next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_Next, loading]);

  return (
    <>
      {children}
      {/* {is_Next && <Spinner />} */}
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_Next: false,
  loading: false,
};

export default InfinityScroll;
