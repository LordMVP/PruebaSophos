import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import { map, filter } from 'rxjs/operators';

declare var dataLayer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gp works!';
  constructor(
    public _router: Router,
    public route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.sendHitGoogleAnalytics();
  }

  sendHitGoogleAnalytics() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        dataLayer.push({ event: 'pageview', page: { page: event.url } });
      })
    ).subscribe();
  }
}
