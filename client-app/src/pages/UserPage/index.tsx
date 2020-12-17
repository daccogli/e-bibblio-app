import React, {useState} from 'react';
import SearchSection from '../../components/SearchSection';
import ModalButton from '../../components/ModalButton';
import SearchRequest from '../../api/SearchRequest';
import AddOrDeleteOrUpdateRequest from '../../api/AddOrDeleteOrUpdateRequest';
import endpoints from '../../endpoints';
import { Container } from 'react-bootstrap';


const UserPage: React.FC = () => {
  //add/delete/search books from server
  const [fetchedUsers, setFetchedUsers] = useState([{id:'', name:'', username:'', memberType:''}]);

  //add/delete/search books to server
  const [userToServer, setuserToServer] = useState({id:'', name:'', username:'', memberType:''});

  const HandleInitState = () => setuserToServer({id:'', name:'', username:'', memberType:''});


  //onChange Hnadlers
  const HandleUserToServer = (event:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLFormElement>) => {
    const { value, name } = event.target;
    setuserToServer({...userToServer, [name]: value });
  };

  const HandleMemberTypeChange = (event:React.ChangeEvent<HTMLFormElement>) => {
    setuserToServer({...userToServer, memberType: event.target.value });
  }


  //Api Requests
  const SearchUser = () => {
      SearchRequest(`${endpoints.ApiUrl}/users/search`, userToServer, setFetchedUsers)
  }

  const addUser = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteOrUpdateRequest(`${endpoints.ApiUrl}/users/add`, userToServer, 'post', 'Successfully Added')

  }

  const UpdateUser = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteOrUpdateRequest(`${endpoints.ApiUrl}/users/${userToServer.id}`, userToServer, 'put', 'Successfully updated')

  }

  const DeleteUser = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteOrUpdateRequest(`${endpoints.ApiUrl}/users/delete`, userToServer, 'delete', 'Successfully Deleted')

  }

  //map data to a table 
  const mappedUsers = fetchedUsers.map(({id, name, username, memberType}) =>     
  <tr key={id}><th scope="row">{id}</th><td>{name}</td><td>{username}</td><td>{memberType}</td></tr>);


  return (
    <main><Container>
      <section className={'cudButtons'}>
        <ModalButton property = "Add User" initialiseState={HandleInitState}
          InputPh1='name' InputPh2='username' input1="name" input2="username" inputType0="hidden" Variant='success'
          inputType1="text" inputType2="text" inputType3="hidden" TypeofSelect="Member Type:"
          selectValue1="Staff" handleSelectChange={HandleMemberTypeChange} SelectRequireBool={true}
          selectValue2="Student" handleChange={HandleUserToServer} handleSubmit={addUser}
        />

        <ModalButton property = "Update User"  
          inputType0="text" InputPh0='UserID' input0="id" initialiseState={HandleInitState} Variant="primary"
          InputPh1='name' InputPh2='username' input1="name" input2="username" 
          inputType1="text" inputType2="text" inputType3="hidden" TypeofSelect="Member Type:"
          selectValue1="Staff" handleSelectChange={HandleMemberTypeChange} SelectRequireBool={true}
          selectValue2="Student" handleChange={HandleUserToServer} handleSubmit={UpdateUser}
        />

        <ModalButton property = "Delete User"  initialiseState={HandleInitState}
          InputPh1='UserID' InputPh2='username' input1="id" input2="username"
          inputType1="text" Variant="danger" inputType2="text" inputType3="hidden" inputType0="hidden"
          selectDisplay = "none" handleChange={HandleUserToServer} handleSubmit={DeleteUser}
        />
      </section>
      

      <SearchSection 
        InputName1='name' InputType1='text' InputPh1='name'
        InputName2='username' InputType2='text' InputPh2='username'
        SearchInput={ HandleUserToServer} SearchRequest={SearchUser} mappedTable={mappedUsers}
        theadID="UserID"thead1='name' thead2='username' thead3='memberType'
      /></Container>
    </main>
  );
}


export default UserPage;
