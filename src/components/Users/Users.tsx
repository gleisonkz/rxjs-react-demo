import { setSelectedUserID, setUsers, useUsers } from '../../state/state';
import styles from './Users.module.css';

export function Users() {
  const users = useUsers();

  const incrementAge = (userID: number) => {
    const newUsers = users.map((user) => {
      if (user.userID === userID) return { ...user, age: user.age + 1 };
      return user;
    });

    setUsers(newUsers);
  };

  return (
    <>
      <div className={styles.users}>
        {users.map(({ userID, name, age, avatar }) => (
          <div data-testid="user" className={styles.user} key={userID}>
            <img className={styles.avatar} src={avatar} alt="User Avatar" />
            <span>
              {name} is <span data-testid="age">{age}</span> years old
            </span>
            <button data-testid="increment-age-button" onClick={() => incrementAge(userID)}>
              Increment
            </button>
            <button data-testid="select-user-button" onClick={() => setSelectedUserID(userID)}>
              Select
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
