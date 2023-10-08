import React, { useEffect, useState } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

//hook props interface
interface IuseIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: IuseIntersectionObserverProps) => {

  //관찰할 요소입니다. 스크롤 최하단 div요소에 setTarget을 ref로 넣어 사용할 것입니다.
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
    	if (entry.isIntersecting) {
        console.log("Target is in view!"); // target element가 화면에 보일 때
        console.log("hasNextPage:", hasNextPage); // hasNextPage 상태 출력
        if (hasNextPage) {
          console.log("fetchNextPage is called!"); // fetchNextPage 호출 여부 출력
          fetchNextPage();
        }
      }
    });
  };

  useEffect(() => {
    if (!target) return;
    
    //ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });
    
    // 타겟 관찰 시작
    observer.observe(target);
    
    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
};