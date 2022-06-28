import { userUserIds } from '../../state/state';
import { User } from '../User/User';
import styles from './Users.module.css';

export function Users() {
  const userIds = userUserIds();

  return (
    <>
      <div className={styles.users}>
        {userIds.map((userID) => (
          <User key={userID} userID={userID} />
        ))}
      </div>
    </>
  );
}
