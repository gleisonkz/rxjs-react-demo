import { useSelectUser } from '../../state/state';
import styles from './SelectedUser.module.css';

export interface UserProps {
  userID: number;
  name: string;
  age: number;
  avatar: string;
}

export const SelectedUser: React.FC = () => {
  const { userID, name, age } = useSelectUser() ?? {};

  return (
    <>
      <h2 className={styles.selected}>
        Selected User:{" "}
        {userID == null ? (
          "None"
        ) : (
          <span>
            <mark>{name}</mark> is <mark>{age}</mark> years old
          </span>
        )}
      </h2>
    </>
  );
};
