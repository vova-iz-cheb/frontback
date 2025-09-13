import { useState } from 'react';

export const User = () => {
  const [allUsers, setAllUsers] = useState('');
  const [singleUser, setSingleUser] = useState('');
  const [createdUser, setCreatedUser] = useState('');
  const [deleteUser, setDeleteUser] = useState('');
  const [changeUser, setChangeUser] = useState('');

  return (
    <div>
      <hr />
      user requests
      <p>
        1 получить всех юзеров{' '}
        <button
          onClick={() => {
            fetch('http://localhost:3000/users')
              .then((x) => {
                return x.json();
              })
              .then((x) => {
                if (x) setAllUsers(JSON.stringify(x));
                else setAllUsers('');
              });
          }}
        >
          request
        </button>{' '}
        <span>result {allUsers}</span>
      </p>
      <p>
        2 получить одного юзера по id <input type='number' id='inputId' />
        <button
          onClick={() => {
            fetch(
              'http://localhost:3000/users/' +
                (document.querySelector('#inputId') as HTMLInputElement).value
            )
              .then((x) => {
                return x.json();
              })
              .then((x) => {
                if (x) setSingleUser(JSON.stringify(x));
                else setSingleUser('');
              });
          }}
        >
          request
        </button>{' '}
        <span>result {singleUser}</span>
      </p>
      <p>
        3 создать юзера
        <input type='number' id='userId' placeholder='id' />
        <input type='string' id='userName' placeholder='name' />
        <input type='checkbox' id='userIsAdmin' />
        <button
          onClick={() => {
            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: (document.querySelector('#userId') as HTMLInputElement)
                  .value,
                name: (document.querySelector('#userName') as HTMLInputElement)
                  .value,
                isAdmin: (
                  document.querySelector('#userIsAdmin') as HTMLInputElement
                ).checked,
              }),
            })
              .then((x) => {
                return x.json();
              })
              .then((x) => {
                setCreatedUser(JSON.stringify(x));
              });
          }}
        >
          request
        </button>{' '}
        <span>result {createdUser}</span>
      </p>
      <p>
        4 удалить юзера по ид <input type='number' id='deleteId' />
        <button
          onClick={() => {
            fetch(
              'http://localhost:3000/users/' +
                (document.querySelector('#deleteId') as HTMLInputElement).value,
              {
                method: 'DELETE',
              }
            )
              .then((x) => {
                return x.json();
              })
              .then((x) => {
                if (x) setDeleteUser(JSON.stringify(x));
                else setDeleteUser('');
              });
          }}
        >
          request
        </button>{' '}
        <span>result {deleteUser}</span>
      </p>
      <p>
        5 изменить юзера по ид{' '}
        <input type='number' id='changeId' placeholder='id' />{' '}
        <input type='string' id='changeName' placeholder='name' />
        <input type='checkbox' id='changeIsAdmin' />
        <button
          onClick={() => {
            fetch(
              'http://localhost:3000/users/' +
                (document.querySelector('#changeId') as HTMLInputElement).value,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: (
                    document.querySelector('#changeName') as HTMLInputElement
                  ).value,
                  isAdmin: (
                    document.querySelector('#changeIsAdmin') as HTMLInputElement
                  ).checked,
                }),
              }
            )
              .then((x) => {
                return x.json();
              })
              .then((x) => {
                if (x) setChangeUser(JSON.stringify(x));
                else setChangeUser('');
              });
          }}
        >
          request
        </button>{' '}
        <span>result {changeUser}</span>
      </p>
      <hr />
    </div>
  );
};
