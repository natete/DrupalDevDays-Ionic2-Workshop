import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import * as moment from 'moment';
import { ProgramPage } from '../pages/program/program';
import Moment = moment.Moment;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  dates = [
    moment('2017-03-21'),
    moment('2017-03-22'),
    moment('2017-03-23'),
    moment('2017-03-24'),
    moment('2017-03-25')
  ];

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready()
        .then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          StatusBar.styleDefault();
          Splashscreen.hide();

          this.goToFirstDay();
        });
  }

  goToProgram(date: Moment) {
    this.nav.setRoot(ProgramPage, date);
  }

  private goToFirstDay() {
    const now = moment();

    this.nav.setRoot(ProgramPage, this.dates.find(date => now.isSame(date)) || this.dates[0]);
  }
}
