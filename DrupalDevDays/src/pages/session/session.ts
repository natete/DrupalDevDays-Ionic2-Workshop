import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { SessionService } from '../../providers/session.service';
import { SessionDetails } from '../../shared/session-details';
import Moment = moment.Moment;

@Component({
  selector: 'page-session',
  templateUrl: 'session.html'
})
export class SessionPage {

  title: string;
  session: SessionDetails = new SessionDetails();

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private sessionService: SessionService) {
    const date = (this.navParams.get('date') as Moment).format('DD dddd');

    this.title = `${date} - ${this.navParams.get('startTime')}`;
  }

  ionViewDidLoad() {
    const sessionId = this.navParams.get('sessionId');

    this.sessionService
        .getSession(sessionId)
        .subscribe(session => this.session = session);
  }
}
