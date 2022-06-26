import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserProps } from '../components/SelectedUser/SelectedUser';

export interface ApiResponse {
  data: UserResponse[];
}
export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export function getUsers(): Observable<UserProps[]> {
  const url = "https://reqres.in/api/users/";
  return ajax.getJSON<ApiResponse>(url).pipe(
    map(({ data: users }) => {
      return users.map(({ id, first_name, last_name, avatar }) => {
        const userProps: UserProps = {
          userID: id,
          name: `${first_name} ${last_name}`,
          age: Math.floor(Math.random() * 100),
          avatar,
        };

        return userProps;
      });
    })
  );
}
