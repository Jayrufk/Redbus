import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
declare var google: any;
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../service/theme.service';
import { DataserviceService } from '../../service/dataservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, AfterViewInit {

  isloggedIn: boolean = false;

  constructor(
    private router: Router,
    private customerservice: CustomerService,
    public themeService: ThemeService,
    private dataservice: DataserviceService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.dataservice.isLoggedIn$.subscribe(state => {
      this.isloggedIn = state;

      if (!state) {
        setTimeout(() => {
          this.rendergooglebutton();
        });
      }
    });

    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: "207987864139-l80of2b72909er5qgd3j5nkv5veu1ma3.apps.googleusercontent.com",
        callback: (response: any) => this.handlelogin(response)
      });
    }
  }

  ngAfterViewInit(): void {
    this.rendergooglebutton();
  }

  private rendergooglebutton(): void {
    const googlebtn = document.getElementById('google-btn');
    if (googlebtn) {
      googlebtn.innerHTML = '';
      google.accounts.id.renderButton(googlebtn, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        width: 150
      });
    }
  }

  private decodetoken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handlelogin(response: any) {
    this.ngZone.run(() => {
      const payload = this.decodetoken(response.credential);
      this.customerservice.addcustomermongo(payload).subscribe({
        next: (res) => {
          sessionStorage.setItem('Loggedinuser', JSON.stringify(res));
          this.dataservice.setLoginState(true);
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }

  handlelogout() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('Loggedinuser');
    this.dataservice.setLoginState(false);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
