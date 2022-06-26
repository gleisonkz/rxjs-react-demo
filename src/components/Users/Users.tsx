import { setSelectedUserID, setUsers, useUsers } from '../../state/state';

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
      <div className="users">
        {users.map((user) => (
          <div className="user" key={user.userID}>
            <span>
              {user.name} is {user.age} years old
            </span>
            <button onClick={() => incrementAge(user.userID)}>Increment</button>
            <button onClick={() => setSelectedUserID(user.userID)}>Select</button>
          </div>
        ))}
      </div>
    </>
  );
}
