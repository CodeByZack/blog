---
title: useEffect 实际使用中的问题
created_at: '2023-03-02 10:21'
updated_at: '2022-03-02 15:54'
---


## 组件需要三个状态 `A`,`B`,`C` 来计算判断是否刷新，但触发这个判断的只能由 `A` 引起。


```javascript
const calcFlag = (A,B,C)=>{};

const comp = (props)=>{
    const { A, B, C } = props;

    useEffect(()=>{
        const res = calcFlag(A,B,C);
        if(res){
            // do things 1
        }else{
            // do things 2
        }
    },[A,B,C])

    return "";
};
```

问题在于 `Effect` 的依赖，不能把三个全写上，因为这样任何一个变化，都会触发这个操作。但也不能只写 `A` ，因为这样由于闭包的原因，拿不到 `B`、`C` 最新的值。

使用 `useRef` 解决：


```javascript
const calcFlag = (A,B,C)=>{};

const comp = (props)=>{
    const { A, B, C } = props;
    const dataRef = useRef({ A, B, C });
    dataRef.current.A = A;
    dataRef.current.B = B;
    dataRef.current.C = C;

    useEffect(()=>{
        const res = calcFlag(dataRef.current.A,dataRef.current.B,dataRef.current.C);
        if(res){
            // do things 1
        }else{
            // do things 2
        }
    },[A])

    return "";
};
```

总结一下：使用 `useEffect` 的依赖数组确定操作的触发时机，用 `useRef` 收集这个操作所需要的数据，并实时更新。