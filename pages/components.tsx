import { toast } from '@/components/imperative';
import React, { useRef } from 'react';

interface IProps {}
const CompPlay = (props: IProps) => {
  const count = useRef(0);
  return (
    <div className=" bg-slate-800 text-white">
      <div
        className="cursor-pointer"
        onClick={() => {
          count.current +=1;
          toast.info({ msg: `测试成功${count.current}` });
        }}
      >
        点我
      </div>
    </div>
  );
};
export default CompPlay;
