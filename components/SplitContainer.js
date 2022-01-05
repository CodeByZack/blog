import React, { useRef } from 'react';

const getWidth = (w, min, max) => {
  if (w < min) return min;
  if (w > max) return max;
  return w;
};

const SplitContainer = (props) => {
  const { min = 1, max = 3, leftChildren, rightChildren } = props;

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseDown = (event) => {
    if (!leftRef.current || !rightRef.current) return;
    const firstX = event.clientX;
    const leftWidth = leftRef.current.offsetWidth;
    const rightWidth = rightRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;

    const maxDragWidth = (containerWidth / (min + max)) * max;
    const minDragWidth = (containerWidth / (min + max)) * min;

    rightRef.current.style.pointerEvents = 'none';
    rightRef.current.style.userSelect = 'none';
    leftRef.current.style.userSelect = 'none';
    const onMousemove = (e) => {
      const nowX = e.clientX;
      // 右移动为 正数， 左移动为负数
      const dx = nowX - firstX;

      const nowLeftWidth = getWidth(leftWidth + dx, minDragWidth, maxDragWidth);
      const nowRightWidth = getWidth(
        rightWidth - dx,
        minDragWidth,
        maxDragWidth
      );

      leftRef.current.style.width = `${nowLeftWidth}px`;
      rightRef.current.style.width = `${nowRightWidth}px`;
    };
    const onMouseup = () => {
      if (!rightRef.current || !leftRef.current) return;
      rightRef.current.style.pointerEvents = '';
      leftRef.current.style.userSelect = '';
      rightRef.current.style.userSelect = '';
      containerRef.current?.removeEventListener('mousemove', onMousemove);
      containerRef.current?.removeEventListener('mouseup', onMousemove);
    };

    containerRef.current?.addEventListener('mousemove', onMousemove);
    containerRef.current?.addEventListener('mouseup', onMouseup);
  };

  return (
    <div ref={containerRef} className="flex h-full w-full">
      <div ref={leftRef} className="relative w-2/4 h-full">
        {leftChildren}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="flex-shrink-0 h-full w-4 cursor-col-resize"
      />
      <div ref={rightRef} className="relative w-2/4 h-full">
        {rightChildren}
      </div>
    </div>
  );
};
export default SplitContainer;
