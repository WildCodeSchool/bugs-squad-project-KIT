import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface CalendarEvent {
  id: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  summary: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarEvents: CalendarEvent[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Check if the user is authenticated and has a valid access token
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Set the authorization header with the access token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      // Make an HTTP GET request to fetch the events
      this.http
        .get<any>('https://www.googleapis.com/calendar/v3/users/me/calendarList', { headers })
        .subscribe((res: any) => {
          console.log(res);
          // Set the calendarlist
          this.calendarEvents = res.items;
        });
    }
  }
}
