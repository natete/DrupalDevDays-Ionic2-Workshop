import { Injectable } from '@angular/core';
import { SessionDetails } from '../shared/session-details';
import { Calendar } from 'ionic-native';

@Injectable()
export class CalendarService {

  addSession(session: SessionDetails, startDate: Date, endDate: Date): Promise<string> {

    return Calendar.findEvent(session.title, null, null, startDate, endDate)
                   .then(
                     calendarEvent =>
                       calendarEvent && calendarEvent.length ?
                         { status: 'warn', message: 'Event already added' } :
                         this.createEvent(session, startDate, endDate),
                     () => Promise.reject({
                       status: 'error',
                       message: 'Error adding event to Calendar\nReview your permissions'
                     })
                   );
  }

  private createEvent(session: SessionDetails, startDate: Date, endDate: Date): Promise<any> {
    return Calendar.createEvent(session.title, 'Seville, Fuerte de Isla Mágica', session.description, startDate, endDate)
                   .then(
                     () => ({ status: 'success', message: 'Event added to your calendar' }),
                     () => Promise.reject({
                       status: 'error',
                       message: 'Error adding event to Calendar\nReview your permissions'
                     })
                   );
  }
}