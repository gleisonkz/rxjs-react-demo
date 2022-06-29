import { useState } from 'react';
import { onAddUser } from '../../state/state';
import styles from './CreateUser.module.css';

export function CreateUser() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);

  return (
    <>
      <div className={styles.container} data-testid="user">
        <div className={styles.inputContainer}>
          <label htmlFor="">Name:</label>
          <input onChange={(e) => setName(e.target.value)} type="text" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Age:</label>
          <input onChange={(e) => setAge(+e.target.value)} type="text" />
        </div>
        <button onClick={() => onAddUser({ name, age, avatar: "assets/images/no-user.svg" })} className="primary">
          Create
        </button>
      </div>
    </>
  );
}
