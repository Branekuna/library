import React, { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form';
import Axios from 'axios';

const BookEdit = (props) => {
  const { id } = props.match.params;
  //setting up form handling
  //const { register, handleSubmit, errors } = useForm();
  const [existingAuthorsList, setExistingAuthors] = useState([]);

  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    const getAuthors = async () => {
      const authors = await Axios.get('http://localhost:5000/Authors')
        .then((res) => {
          return res.data;
        })
        .catch((err) => err);
      setExistingAuthors(authors);
    };
    getAuthors();
  }, [props.match.params]);

  useEffect(() => {
    if (id !== 'new') {
      const getBookDetails = async () => {
        const bookDetails = await Axios.get('http://localhost:5000/Books/' + id)
          .then((res) => {
            return res.data[0];
          })
          .catch((err) => err);
        setEditedBook(bookDetails);
      };
      getBookDetails();
    }
  }, [props.match.params, id]);

  return (
    <div>
      <form>
        <fieldset>
          <legend>Book Data</legend>
          <div>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Book title'
              defaultValue={editedBook.title ? editedBook.title : ''}
            ></input>
          </div>
          <div>
            <label htmlFor='description'>Description:</label>
            <textarea
              name='description'
              id='description'
              placeholder='A short book blurb'
              defaultValue={
                editedBook.description ? editedBook.description : ''
              }
            ></textarea>
          </div>
          <div>
            <label htmlFor='price'>Price:</label>
            <input
              type='text'
              name='price'
              id='price'
              placeholder='Book Price'
              defaultValue={editedBook.price ? editedBook.price : ''}
            ></input>
          </div>
          <div>
            <label htmlFor='imgUrl'>ImageUrl:</label>
            <input
              type='url'
              name='imgUrl'
              id='imgUrl'
              placeholder='Paste an image url'
              defaultValue={editedBook.imgUrl ? editedBook.imgUrl : ''}
            ></input>
          </div>
          {id !== 'new' ? (
            <input type='hidden' name='id' id='id' value={id}></input>
          ) : null}
          <div>
            <label htmlFor='authors'>Choose Existing Author</label>
            <select id='authors'>
              <option value={editedBook.title ? editedBook.title : ''}></option>
              {existingAuthorsList.map((author) => {
                return (
                  <option key={author.id} value={author.fullname}>
                    {author.fullname}
                  </option>
                );
              })}
            </select>
          </div>

          <input type='submit'></input>
        </fieldset>
      </form>
    </div>
  );
};
export default BookEdit;
