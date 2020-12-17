import React, {useState} from 'react';
import SearchSection from '../../components/SearchSection';
import ModalButton from '../../components/ModalButton';
import SearchRequest from '../../api/SearchRequest';
import AddOrDeleteRequest from '../../api/AddOrDeleteOrUpdateRequest';
import endpoints from '../../endpoints';
import { Container } from 'react-bootstrap';


const Bookspage: React.FC = () => {
  //add/delete/search books from server
  const [fetchedbooks, setFetchedBooks] = useState([{id: '', title: '', isbn: '', Authors: ''}]);

  //add/delete/search books to server
  const [BooktoServer, setBooktoServer] = useState({id:'', title: '', isbn:'', Authors: ''});
  
  //Handle onChange
  const HandleInitState = () => setBooktoServer({id:'', title: '', isbn:'', Authors: ''});
  
  const HandleBooktoServer = (event:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLFormElement>) => {
    const { value, name } = event.target;
    setBooktoServer({...BooktoServer, [name]: value });
  };

  //Api Requests
  const SearchBook = () => {
      SearchRequest(`${endpoints.ApiUrl}/books/search`, BooktoServer, setFetchedBooks)
  }

  const addBook = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteRequest(`${endpoints.ApiUrl}/books/add`, BooktoServer, 'post', 'Successfully Added')
  }
  
  const deleteBook = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddOrDeleteRequest(`${endpoints.ApiUrl}/books/delete`, BooktoServer, 'delete', 'Successfully Deleted')
  }

  //Table of books' data from server
  const mappedBooks = fetchedbooks.map(({id, title, isbn, Authors}) =>     
    <tr key={id}><th scope="row">{id}</th><td>{title}</td><td>{isbn}</td><td>{Authors}</td></tr>);


  return (
    <main>
      <Container>
      <section className='cudButtons'>
        <ModalButton property = "Add Book"  
          InputPh1='Title' InputPh2='ISBN' InputPh3='Authors eg. Conan Doyle' Variant="success"
          input1="title" input2="isbn" input3="authors" inputType0="hidden"
          inputType1="text" inputType2="text" inputType3="text"
          selectDisplay = "none" initialiseState={HandleInitState}
          handleChange={HandleBooktoServer} handleSubmit={addBook} 
        />

        <ModalButton property = "Delete Book" 
          InputPh1='BookID' InputPh2='ISBN' input1="id" input2="isbn" initialiseState={HandleInitState} Variant="danger"
          inputType1="text" inputType2="text" inputType3="hidden" inputType0="hidden"
          selectDisplay="none" handleChange={HandleBooktoServer} handleSubmit={deleteBook}
        />
      </section>

      <SearchSection Trigger={true}
        InputName1='title' InputType1='text' InputPh1='Title'
        InputName2='authors' InputType2='text' InputPh2='Authors'
        SearchInput={HandleBooktoServer} SearchRequest={SearchBook} mappedTable={mappedBooks}
        theadID="BookID" thead1='Title' thead2='ISBN' thead3='Authors'
      />
      </Container>
    </main>
  );
}


export default Bookspage;
