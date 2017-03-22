import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProgramPage } from '../pages/program/program';
import { SessionPage } from '../pages/session/session';
import { ProgramService } from '../providers/program.service';
import { SessionService } from '../providers/session.service';
import { SpeakerService } from '../providers/speaker.service';

@NgModule({
  declarations: [
    MyApp,
    ProgramPage,
    SessionPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgramPage,
    SessionPage
  ],
  providers: [
    ProgramService,
    SessionService,
    SpeakerService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
