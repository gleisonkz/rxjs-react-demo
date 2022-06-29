import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { User } from '../components/SelectedUser/SelectedUser';

export type CreateUser = Pick<User, "name" | "age">;

export function createUser(user: CreateUser): Observable<User> {
  const url = "http://localhost:3200/users";
  return ajax.post<User>(url, user).pipe(map((response) => response.response));
}
