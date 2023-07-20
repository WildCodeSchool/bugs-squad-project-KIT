import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent,
} from '@daypilot/daypilot-lite-angular';
import { DataService, EventCreateParams, EventDeleteParams, EventMoveParams } from '../../services/data.service';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="container">
      <div class="navigator">
        <daypilot-navigator
          [config]="configNavigator"
          [events]="events"
          [(date)]="date"
          (dateChange)="changeDate($event)"
          #navigator
        ></daypilot-navigator>
      </div>
      <div class="content">
        <div class="buttons">
          <button (click)="viewDay()" [class]="this.configNavigator.selectMode === 'Day' ? 'selected' : ''">Day</button>
          <button (click)="viewWeek()" [class]="this.configNavigator.selectMode === 'Week' ? 'selected' : ''">
            Week
          </button>
          <button (click)="viewMonth()" [class]="this.configNavigator.selectMode === 'Month' ? 'selected' : ''">
            Month
          </button>
        </div>

        <daypilot-calendar [config]="configDay" [events]="events" #day></daypilot-calendar>
        <daypilot-calendar [config]="configWeek" [events]="events" #week></daypilot-calendar>
        <daypilot-month [config]="configMonth" [events]="events" #month></daypilot-month>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
      }

      .navigator {
        margin-right: 10px;
      }

      .content {
        flex-grow: 1;
      }

      .buttons {
        margin-bottom: 10px;
      }

      button {
        background-color: #3c78d8;
        color: white;
        border: 0;
        padding: 0.5rem 1rem;
        width: 80px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 5px;
      }

      button.selected {
        background-color: #1c4587;
      }
    `,
  ],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('navigator') nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args) => {
      this.loadEvents();
    },
  };
  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {};

  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1');
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) {
        return;
      }
      dp.events.add(
        new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
        })
      );
    },
  };

  configMonth: DayPilot.MonthConfig = {};

  constructor(private ds: DataService) {
    this.viewWeek();
  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe((result: DayPilot.EventData[]) => {
      this.events = result;
    });
  }

  viewDay(): void {
    this.configNavigator.selectMode = 'Day';
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = 'Week';
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = 'Month';
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }
}
