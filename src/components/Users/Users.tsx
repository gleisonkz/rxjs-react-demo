import { useUsers } from '../../state/state';
import { User } from '../User/User';
import styles from './Users.module.css';

export function Users() {
  const userIDs = useUsers();

  return (
    <>
      <div className={styles.users}>
        {userIDs.map((userID) => {
          return <User key={userID} userID={userID} />;
        })}
      </div>
    </>
  );
}
