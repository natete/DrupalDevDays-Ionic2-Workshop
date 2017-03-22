import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { ProgramService } from '../../providers/program.service';
import { Session } from '../../shared/session';
import { SessionPage } from '../session/session';
import Moment = moment.Moment;

@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {

  title: string;
  sessions: Session[];

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private programService: ProgramService) {
    this.title = (this.navParams.data as Moment).format('DD dddd');
  }

  ionViewDidLoad() {
    this.programService.getProgram(this.navParams.data as Moment)
        .subscribe(program => this.sessions = program);
  }

  getStartTime(record, recordIndex, records): string {
    if (recordIndex === 0) {
      return record.startTime;
    } else {
      return record.startTime === records[recordIndex - 1].startTime ? null : record.startTime;
    }
  }

  getImage(session: Session): string {
    if (session.type) {
      const imageName: string = this.getImageNameFromTrack(session.track);
      return `assets/images/${imageName}.svg`
    } else {
      return 'assets/images/poison.svg';
    }
  }

  goToSession(session: Session): void {
    // We don't want to see the details of the breaks.
    if (session.type) {
      this.navCtrl.push(SessionPage, {
        sessionId: session.id,
        date: this.navParams.data,
        startTime: session.startTime
      });
    }
  }

  private getImageNameFromTrack(track: string): string {
    const result = track || 'other';
    return result.toLowerCase()
                 .replace(' ', '-');
  }
}
