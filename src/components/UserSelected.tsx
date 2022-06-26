import { useSelectedUser } from '../state';

export interface UserProps {
  userID: number;
  name: string;
  age: number;
  avatar: string;
}

export function UserSelected() {
  const { userID, name, age } = useSelectedUser() ?? {};

  return (
    <>
      <h2 className="selected-user">
        Selected User:{" "}
        {userID == null ? (
          "None"
        ) : (
          <span>
            {name} is {age} years old
          </span>
        )}
      </h2>
    </>
  );
}
