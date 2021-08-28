import React, { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading, scrollTo, setPrevHeight } =
    props;

  const _handleScroll = _.throttle(() => {
    //로딩중이면 callNext()를 안부르도록
    if (loading) {
      return;
    }

    if (scrollTo.current.scrollTop === 0) {
      setPrevHeight(scrollTo.current.scrollHeight);
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
      scrollTo.current.addEventListener("scroll", handleScroll);
    } else {
      scrollTo.current?.removeEventListener("scroll", handleScroll);
    }

    return () => scrollTo.current?.removeEventListener("scroll", handleScroll);
  }, [is_next, loading, handleScroll, scrollTo]);

  return (
    <>
      {/* {is_next && <Spinner />} */}
      {children}
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
