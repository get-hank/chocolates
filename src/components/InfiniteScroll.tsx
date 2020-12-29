import React, { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Container } from "./grid";

type InfiniteScrollProps = {
  isLoading: boolean;
  hasMore: boolean;
  loadMore: (count: number) => any;
  pageSize?: number;
  reverse?: boolean;
};

const Infinite: React.FC<InfiniteScrollProps> = ({
  children,
  loadMore,
  hasMore,
  isLoading,
  pageSize = 10,
  reverse = false,
}) => {
  const fetchMore = (_: number) => loadMore(pageSize);
  const scrollEl = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!reverse || !scrollEl || !scrollEl.current) return;

    scrollEl.current.scrollIntoView();
  }, [scrollEl, reverse]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loadMore={fetchMore}
      initialLoad={false}
      isReverse={reverse}
    >
      <Container key="list" direction={reverse ? "column-reverse" : "column"}>
        {reverse ? <div key="scroll-el" ref={scrollEl} /> : null}
        {children}
      </Container>
    </InfiniteScroll>
  );
};

export default Infinite;
