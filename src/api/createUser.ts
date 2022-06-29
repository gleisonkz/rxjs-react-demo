import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserProps } from '../components/SelectedUser/SelectedUser';

export type CreateUser = Pick<UserProps, "name" | "age">;

export function createUser(user: CreateUser): Observable<UserProps> {
  const url = "http://localhost:3200/users";
  return ajax.post<UserProps>(url, user).pipe(map((response) => response.response));
}
