import axios from "axios";

const SearchRequest = async(url:string, params:Object, stateSet:React.Dispatch<React.SetStateAction<any>>) => {
      try { 
 
        const res = await axios({
          url: url,
          method: 'get',
          params: params,
          headers: {
            'Content-Type': 'application/json',
          }
        
      });
        res.status===200 && res.data.length>=1 ?
        await stateSet(res.data) : stateSet([{id:'Not found'}]);
      } 
      catch {console.error(); stateSet([{id:'Not found'}])}
    }

    

export default SearchRequest;
