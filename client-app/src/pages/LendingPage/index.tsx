import React, {useState} from 'react';
import SearchSection from '../../components/SearchSection';
import ModalButton from '../../components/ModalButton';
import SearchRequest from '../../api/SearchRequest';
import AddOrDeleteOrUpdateRequest from '../../api/AddOrDeleteOrUpdateRequest';
import endpoints from '../../endpoints';
import { Container } from 'react-bootstrap';


const LendingPage: React.FC = () => {
  //add/delete/search books from server
  const [fetchedData, setFetchedData] = useState([{id:"", dueDate:"", isbn:"", BookId:""}]);

  //add/delete/search books to server
  const [dataToServer, setDataToServer] = useState({id:"", dueDate:"", BookId:"", UserId:""});

  //when close button has been clicked on the modal, init state
  const HandleInitState = () => setDataToServer({id:"", dueDate:"", BookId:"", UserId:""});
  
  // data of the user borrowing a book from server
  const [userBorrowing, setUserBorrowing] = useState([{id:'', name:'', username:'', memberType:''}])


  const HandleDataToServer = (event:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLFormElement>) => {
    const { value, name } = event.target;
    setDataToServer({...dataToServer, [name]: value });
  };


  //Api Requests
  const SearchUser = () => {
    SearchRequest(`${endpoints.ApiUrl}/lendings/search`, dataToServer, setFetchedData)
  }

  const GetUserBorrowingAbook = () => {
    SearchRequest(`${endpoints.ApiUrl}/lendings/user`, dataToServer, setUserBorrowing)
  }

  const addLending = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteOrUpdateRequest(`${endpoints.ApiUrl}/lendings/book/${dataToServer.BookId}/user/${dataToServer.UserId}`, dataToServer, 'post', 'Successfully Added')
  }

  const UpdateLending = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteOrUpdateRequest(`${endpoints.ApiUrl}/lendings/${dataToServer.id}`, dataToServer, 'put', 'Successfully updated')
  }

  const DeleteLending = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteOrUpdateRequest(`${endpoints.ApiUrl}/lendings/delete`, dataToServer, 'delete', "Successfully Deleted")
  }

  // A user's lendings to table
  const mappedLendings = fetchedData.map(({id, BookId, isbn, dueDate}) =>     
    <tr key={id}><th scope="row">{id}</th><td>{BookId}</td><td>{isbn}</td><td>{dueDate}</td></tr>);

  // users borrowing a book to table
  const mappedUsers = userBorrowing.map(({id, name, username, memberType}) =>     
    <tr key={id}><th scope="row">{id}</th><td>{name}</td><td>{username}</td><td>{ memberType}</td></tr>);


  return (
    <main>
      <Container>
      <section className={'cudButtons'}>
        <ModalButton property = "Add Lending"  initialiseState={HandleInitState}
          InputPh1='UserID' InputPh2='BookID' InputPh3='Due Date' input1="UserId" input2="BookId" 
          inputType1="text" inputType2="text" inputType3="DATE" selectDisplay = "none" input3="dueDate"
          handleChange={HandleDataToServer} handleSubmit={addLending} inputType0="hidden" Variant="success"
        />

        <ModalButton property = "Update Lending"  initialiseState={HandleInitState}
          inputType0="text" InputPh0='LendingID' input0="id" InputPh1='Due Date' input1="dueDate"
          inputType1="date" inputType2="hidden" inputType3="hidden" selectDisplay = "none" Variant="primary"
          handleChange={HandleDataToServer} handleSubmit={UpdateLending}
        />

        <ModalButton property = "Remove Lending" 
          InputPh1='LendingID' input1="id" InputPh2='UserID' input2="UserId" initialiseState={HandleInitState}
          inputType1="text" inputType2="hidden" inputType3="hidden" inputType0="hidden" Variant="danger"
          selectDisplay = "none" handleChange={HandleDataToServer} handleSubmit={DeleteLending}
        />
      </section>
      <br></br> 
      <SearchSection 
        InputName1='bookID' InputType1='text' InputPh1='BookID'
        InputName2='username' InputType2='hidden' InputPh2='username'
        SearchInput={HandleDataToServer} SearchRequest={GetUserBorrowingAbook} mappedTable={mappedUsers}
        theadID='UserID' thead1="Name" thead2='username' thead3='MemberType'
      />
 
      <SearchSection 
        InputName1='userID' InputType1='text' InputPh1='UserID' InputType2='hidden' 
        SearchInput={HandleDataToServer} SearchRequest={SearchUser} mappedTable={mappedLendings} Trigger={true}
        theadID='LendingID' thead1='BookID' thead2='ISBN' thead3='Due Date'
      /></Container>
    </main>
  );
}


export default LendingPage;
