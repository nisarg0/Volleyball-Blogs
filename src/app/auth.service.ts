import { Injectable, resolveForwardRef } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          let randomNumber = Math.floor(Math.random() * 1000);

          response.user
            .updateProfile({
              displayName: first_name + ' ' + last_name,
              photoURL: `https://avatars.abstractapi.com/v1/?api_key=d314b70bce10413c885c0b145f317817&name=${first_name} ${last_name}&image_size=512`,
            })
            .then(() => {
              resolve(response.user);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject();
        });
    });
  }
}
