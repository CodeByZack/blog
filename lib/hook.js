import { useState } from 'react';

const getQueryString = () => {
  const url = window.location.search; //获取url中"?"符后的字串
  const queryStrObj = {};
  if (url.indexOf('?') != -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      queryStrObj[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return queryStrObj;
};

export const useQueryString = () => {
  const [queryStrObj] = useState(() => getQueryString());
  return queryStrObj;
};
