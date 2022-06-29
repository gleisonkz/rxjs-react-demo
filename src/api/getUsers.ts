import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserProps } from '../components/SelectedUser/SelectedUser';

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  avatar: string;
  age: number;
}

export function getUsers(): Observable<UserProps[]> {
  const url = "http://localhost:3200/users";
  return ajax.getJSON<UserResponse[]>(url).pipe(
    map((users) => {
      return users.map((user) => {
        const { id } = user;

        const userProps: UserProps = {
          ...user,
          userID: id,
        };

        return userProps;
      });
    })
  );
}
