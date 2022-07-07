import { bind } from '@react-rxjs/core';
import { createSignal, mergeWithKey, partitionByKey } from '@react-rxjs/utils';

import {
    filter, map, merge, mergeAll, of, scan, switchMap, takeWhile, tap, withLatestFrom
} from 'rxjs';
import { createUser, CreateUser } from '../api/createUser';
import { DeleteUser, deleteUser } from '../api/deleteUser';
import { getUsers } from '../api/getUsers';
import { User } from '../components/SelectedUser/SelectedUser';

export const [incrementAgeAction$, onIncrementAge] = createSignal<User>();
export const [selectedUserAction$, selectedUser] = createSignal<User | null>();
export const [addUserAction$, onAddUser] = createSignal<CreateUser>();
export const [deleteUserAction$, onDeleteUser] = createSignal<DeleteUser>();

const createUserResponse$ = addUserAction$.pipe(switchMap(createUser));
const getUsersResponse$ = getUsers().pipe(mergeAll());
const addAction$ = merge(getUsersResponse$, createUserResponse$);

const userActions$ = mergeWithKey({
  increment: incrementAgeAction$,
  add: addAction$,
  delete: deleteUserAction$.pipe(switchMap(deleteUser)),
});

const [userByID, keys$] = partitionByKey(
  userActions$,
  ({ payload }) => payload.userID,
  (event$) =>
    event$.pipe(
      takeWhile((event) => event.type !== "delete"),
      scan((state, action) => {
        const { type, payload } = action;

        switch (type) {
          case "add":
            return payload;
          case "increment":
            const { age } = payload;
            return { ...state, age };
          default:
            return state;
        }
      }, {} as User)
    )
);

export const [useUserByID] = bind((userID: number) => userByID(userID));
export const [userUserIds] = bind(keys$);
export const [useSelectedUser] = bind(
  merge(selectedUserAction$).pipe(
    map((user) => user?.userID),
    switchMap((targetID) => (targetID ? userByID(targetID) : of(null)))
  ),
  null
);

deleteUserAction$
  .pipe(
    map(({ userID }) => userID),
    withLatestFrom(selectedUserAction$),
    filter(([deletedUserID, user]) => user?.userID === deletedUserID),
    map(() => null),
    tap(selectedUser)
  )
  .subscribe();
