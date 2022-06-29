import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { User } from '../components/SelectedUser/SelectedUser';
import { UserResponse } from './getUsers';

export type CreateUser = Omit<User, "userID">;

export function createUser(user: CreateUser): Observable<User> {
  const url = "http://localhost:3200/users";
  return ajax.post<UserResponse>(url, user).pipe(
    map((response) => response.response),
    map((userResponse) => ({ ...userResponse, userID: userResponse.id }))
  );
}
