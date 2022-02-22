import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./../../../../assets/plugins/bootstrap/dist/css/bootstrap.min.css',
    './../../../../assets/plugins/font-awesome/css/font-awesome.min.css',
    './../../../../assets/1/css/sstyle.css',
    './home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToBookshelf() {
    this.router.navigate(['/book']);
  }

}
