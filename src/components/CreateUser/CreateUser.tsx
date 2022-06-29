import { useState } from 'react';
import { onAddUser } from '../../state/state';
import styles from './CreateUser.module.css';

export function CreateUser() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input data-testid="name-input" onChange={(e) => setName(e.target.value)} type="text" />
        </div>
        <div className={styles.inputContainer}>
          <label>Age:</label>
          <input min={1} data-testid="age-input" onChange={(e) => setAge(+e.target.value)} type="number" />
        </div>
        <button
          disabled={!name || !age}
          data-testid="add-user-button"
          onClick={() => onAddUser({ name, age, avatar: "assets/images/no-user.svg" })}
          className="primary"
        >
          Create
        </button>
      </div>
    </>
  );
}
