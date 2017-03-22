import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import Moment = moment.Moment;

@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {

  title: string;

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {
    this.title = (this.navParams.data as Moment).format('DD dddd');
  }
}
