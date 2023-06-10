import React, { ReactNode, RefObject, useEffect, useState } from 'react'

interface Props {
  scrollRef: RefObject<HTMLDivElement>,
  component: ReactNode,
  className: string
}

const TableScrolling = ({ scrollRef, component, className }:Props) => {
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [isTableHover, setIsTableHover] = useState<boolean>(false)
  const [scrollFromTop, setScrollFromTop] = useState<boolean>(true)
  const [isMouseWheeling, setIsMouseWheeling] = useState<boolean>(false)

  function scrollTable() {
    scrollRef.current?.scroll({
      top: scrollTop,
      behavior: "smooth",
    });

    if (scrollFromTop) {
      setScrollTop(prev => prev + 5)
    }
    else {
      setScrollTop(prev => prev - 5)
    }
  }

  useEffect(() => {
    if (!isTableHover) {
      const scrollInterval = setInterval(scrollTable, 100);
      return () => {
        clearInterval(scrollInterval)
      }
    }
    // eslint-disable-next-line
  }, [scrollRef, scrollTop, isTableHover])



  const handleScroll = ((e: React.UIEvent<HTMLDivElement>) => {
    const { clientHeight, scrollTop, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrollFromTop(false)
    }
    if ((!scrollFromTop && scrollTop + clientHeight >= scrollHeight) || (scrollTop === 0)) {
      setScrollFromTop(true)
    }

    if (isMouseWheeling && isTableHover) {
      setScrollTop(e.currentTarget.scrollTop)
    }
  })
  return (
    <div
      className={className}
      onWheel={(e: React.MouseEvent<HTMLDivElement>) => setIsMouseWheeling(true)}
      ref={scrollRef}
      onScroll={handleScroll}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => setIsTableHover(false)}
      onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => setIsTableHover(true)}
      >
        {component}
    </div>
  )
}




export default TableScrolling;

