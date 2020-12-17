import axios from "axios";

const AddOrDeleteOrUpdateRequest = async (url:string, data:Object, method:'delete'|'post'|'put', message:string) => {
    try {
        const res = await axios({
            url: url,
            method: method,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.status===200){
            alert(message)
        } else {alert('Wrong Input')};
    } 
    catch {alert('wrong Input')}
}
    

export default AddOrDeleteOrUpdateRequest;
