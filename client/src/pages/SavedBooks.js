import React, { useState, useEffect } from 'react';
import { Jumbotron, 
  Container, 
  CardColumns, 
  Card, 
  Button 
} from 'react-bootstrap';
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const userData = data?.me || {};
  const [removeBook] = useMutation(REMOVE_BOOK);
  const userDataLength = Object.keys(userData).length;
  const { loading, data } = useQuery(QUERY_ME);

  const SavedBooks = () => {
      const { loading, data } = useQuery(QUERY_ME);
      const [removeBook, { error }] = useMutation(REMOVE_BOOK);
      const userData = data?.me || {};
      const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
    
        try {
          const { data } = await removeBook({
            variables: { bookId },
          });
    
          removeBookId(bookId);
        } catch (err) {
          console.error(err);
        }
      };
    
      if (loading) {
        return <h2>LOADING...</h2>;
      }

    const response = await getMe(token);

      if (!response.ok) {
        throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
   [userDataLength];
    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const updatedUser = await response.json();
      setUserData(updatedUser);
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing your saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks
