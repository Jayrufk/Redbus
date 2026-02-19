import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  addcustomermongo(user: any): Observable<Customer> {

    const customer: Customer = {
      name: user.name,
      email: user.email,
      googleId: user.id,
      profilepicture: user.picture
    };

    console.log("Logged in User:", customer);

    // Save user in localStorage
    localStorage.setItem('user', JSON.stringify(customer));

    // Return fake observable (no backend call)
    return new Observable(observer => {
      observer.next(customer);
      observer.complete();
    });
  }
}
