import { useSelectedUser } from '../../state/state';
import styles from './SelectedUser.module.css';

export interface User {
  userID: number;
  name: string;
  age: number;
  avatar: string;
}

export function SelectedUser() {
  const { userID, name, age } = useSelectedUser() ?? {};

  return (
    <>
      <h2 data-testid="selected-user" className={styles.selected}>
        Selected User:{" "}
        {userID == null ? (
          "None"
        ) : (
          <span>
            ID: {userID} - {name} is {age} years old
          </span>
        )}
      </h2>
    </>
  );
}
