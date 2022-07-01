import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { User } from '../components/SelectedUser/SelectedUser';

export type DeleteUser = Pick<User, "userID">;

export function deleteUser({ userID }: DeleteUser): Observable<DeleteUser> {
  const url = `http://localhost:3200/users/${userID}`;
  return ajax.delete(url).pipe(map(() => ({ userID })));
}
