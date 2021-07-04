import React, {useState, useEffect} from 'react';
import axios from 'axios';

function useAsync(callback, deps = [], skip = false) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async () =>{
    try {
      setState({
        loading: true,
        data: null,
        error: null,
      });
      const data = await callback();
      setState({
        loading: false,
        data: data,
        error: null
      });
    }catch(e){
      setState({
        loading: false,
        data: null,
        error: e
      });
    }
  };

  useEffect(() => {
    if(skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}


export default useAsync;