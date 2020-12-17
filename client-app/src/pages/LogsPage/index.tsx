import React, { useState } from 'react';
import SearchSection from '../../components/SearchSection';
import SearchRequest from '../../api/SearchRequest';
import endpoints from '../../endpoints';
import { Container } from 'react-bootstrap';


const LogsPage: React.FC = () => {
    //the date of logs being searched
    const [createdAt, setCreatedAt] = useState({id:'', createdAt:'', messages:''});

    const [logs, setLogs] = useState([{id:'', createdAt:'', messages:''}])

    const HandleCreatedAt = (event:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLFormElement>) => {
        setCreatedAt(event.target.value);
      };

    const getLogs = () => {
        SearchRequest(`${endpoints.ApiUrl}/logs/search`, {createdAt: createdAt}, setLogs)
    }

    const mappedLogs = logs.map(({id, createdAt, messages}) =>     
      <tr key={id}><th scope="row">{id}</th><td>{createdAt}</td><td>{messages}</td></tr>);

  return (
    <main>
      <Container>
        <h4>Audit Logs</h4>
        <SearchSection 
        InputName1='date' InputType1='date' InputPh1='Date'
        InputName2='' InputType2='hidden' InputPh2=''
        SearchInput={HandleCreatedAt} SearchRequest={getLogs} mappedTable={mappedLogs}
        theadID='LogID' thead1='Date and Time' thead2='Messages' thead3=''
        /></Container>
    </main>
  );
}


export default LogsPage;
