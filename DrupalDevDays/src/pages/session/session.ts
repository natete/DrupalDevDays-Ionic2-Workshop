import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { SessionService } from '../../providers/session.service';
import { SessionDetails } from '../../shared/session-details';
import { CalendarService } from '../../providers/calendar.service';
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
              private toastCtrl: ToastController,
              private sessionService: SessionService,
              private calendarService: CalendarService) {
    const date = (this.navParams.get('date') as Moment).format('DD dddd');

    this.title = `${date} - ${this.navParams.get('startTime')}`;
  }

  ionViewDidLoad() {
    const sessionId = this.navParams.get('sessionId');

    this.sessionService
        .getSession(sessionId)
        .subscribe(session => this.session = session);
  }

  addToCalendar() {
    const startTime = this.navParams.get('startTime').split(':');
    const endTime = this.navParams.get('endTime').split(':');
    const startDate = moment(this.navParams.get('date')).hour(startTime[0]).minute(startTime[1]);
    const endDate = moment(this.navParams.get('date')).hour(endTime[0]).minute(endTime[1]);

    this.calendarService.addSession(this.session, startDate.toDate(), endDate.toDate())
        .then(res => this.showToastMessage(res))
        .catch(res => this.showToastMessage(res));
  }

  private showToastMessage(toastContent: any) {
    const toast = this.toastCtrl.create({
      message: toastContent.message,
      duration: 3000,
      cssClass: toastContent.status
    });

    toast.present();
  }
}
