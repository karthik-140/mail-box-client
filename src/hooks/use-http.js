import { useCallback } from "react";

const useHttp = () =>{
  const sendRequest = useCallback(async (requestConfig, applyData = null) => {
    try{
        const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        });
        if(!response.ok){
            throw new Error("Request Failed!");
        }
        const data = await response.json();
        if(applyData){
            applyData(data)
        }
    }catch(err) {
        alert(err.message || "Something went wrong!!");
    }
  }, [])

  return {
    sendRequest
  }
}

export default useHttp;