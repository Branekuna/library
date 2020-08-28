import React, { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form';
import Axios from 'axios';

const AuthorEdit = (props) => {
  //setting up form handling
  //const { register, handleSubmit, errors } = useForm();
  const { id } = props.match.params;
  const [authorsBooksList, setBooksForAuthor] = useState([]);
  const [editedAuthor, setEditedAuthor] = useState({});

  /*useEffect(() => {
    const getAuthorBooks = async () => {
      const booksByAuthor = await Axios.get('http://localhost:5000/Authors')
        .then((res) => {
          return res.data;
        })
        .catch((err) => err);
        setBooksForAuthor(authors);
    };
    getAuthorBooks();
  }, [props.match.params]);*/

  useEffect(() => {
    if (id !== 'new') {
      const getAuthorDetails = async () => {
        const authorDetails = await Axios.get(
          'http://localhost:5000/Authors/' + id
        )
          .then((res) => {
            return res.data[0];
          })
          .catch((err) => err);
        setEditedAuthor(authorDetails);
      };
      getAuthorDetails();
    }
  }, [props.match.params, id]);

  console.log('editedAuthor ', editedAuthor);

  return (
    <div>
      <form>
        <fieldset>
          <legend>Author Data</legend>
          <div>
            <label htmlFor='fname'>First name:</label>
            <input
              type='text'
              name='fname'
              id='fname'
              placeholder='First Name'
              defaultValue={editedAuthor.fname ? editedAuthor.fname : ''}
            ></input>
          </div>
          <div>
            <label htmlFor='lname'>Last name:</label>
            <input
              type='text'
              name='lname'
              id='lname'
              placeholder='Surname'
              defaultValue={editedAuthor.lname ? editedAuthor.lname : ''}
            ></input>
          </div>
          <div>
            <label htmlFor='imgUrl'>ImageUrl:</label>
            <input
              type='url'
              name='imgUrl'
              id='imgUrl'
              placeholder='Paste an image url'
              defaultValue={editedAuthor.imgUrl ? editedAuthor.imgUrl : ''}
            ></input>
          </div>
          {id !== 'new' ? (
            <input type='hidden' name='id' id='id' value={id}></input>
          ) : null}
          <div>
            <label htmlFor='biography'>Biography:</label>
            <textarea
              name='biography'
              id='biography'
              placeholder='A short blurb about the author'
              defaultValue={
                editedAuthor.biography ? editedAuthor.biography : ''
              }
            ></textarea>
          </div>
          <input type='submit'></input>
        </fieldset>
      </form>
    </div>
  );
};
export default AuthorEdit;
