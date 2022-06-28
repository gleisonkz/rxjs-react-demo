import { useEffect } from 'react';
import { lastValueFrom } from 'rxjs';
import { getUsers } from '../../api/getUsers';
import { onAddUser, userUserIds } from '../../state/state';
import { User } from '../User/User';
import styles from './Users.module.css';

export function Users() {
  const userIds = userUserIds();

  useEffect(() => {
    (async () => {
      const users = await lastValueFrom(getUsers());
      users.forEach(onAddUser);
    })();
  }, []);

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
