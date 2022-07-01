import React from 'react';
import { onDeleteUser, onIncrementAge, selectedUser, useUserByID } from '../../state/state';
import styles from './User.module.css';

export const User: React.FC<{ userID: number }> = React.memo(({ userID: targetID }) => {
  const user = useUserByID(targetID);
  const { userID, name, age, avatar } = user;

  return (
    <>
      <div data-testid="user" className={styles.user} key={userID}>
        <img className={styles.avatar} src={avatar} alt="User Avatar" />
        <span>
          {name} is <span data-testid="age">{age}</span> years old
        </span>
        <button
          className="primary"
          data-testid="increment-age-button"
          onClick={() => onIncrementAge({ ...user, age: age + 1 })}
        >
          Increment
        </button>
        <button className="primary" data-testid="select-user-button" onClick={() => selectedUser(user)}>
          Select
        </button>
        <button className="primary" data-testid="select-user-button" onClick={() => onDeleteUser({ userID })}>
          Delete
        </button>
      </div>
    </>
  );
});
