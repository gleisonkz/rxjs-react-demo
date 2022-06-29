import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserProps } from '../components/SelectedUser/SelectedUser';

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  age?: number;
}

export function getUsers(): Observable<UserProps[]> {
  const url = "http://localhost:3200/users";
  return ajax.getJSON<UserResponse[]>(url).pipe(
    map((users) => {
      return users.map((user) => {
        const { id, first_name, last_name, avatar } = user;

        const userProps: UserProps = {
          userID: id,
          name: `${first_name} ${last_name}`,
          age: user?.age ?? Math.floor(Math.random() * 100),
          avatar,
        };

        return userProps;
      });
    })
  );
}
