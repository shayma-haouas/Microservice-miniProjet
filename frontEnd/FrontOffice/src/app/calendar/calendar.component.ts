import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // Signal pour la visibilité du calendrier
  calendarVisible = signal(true);

  // Removed duplicate declaration of TODAY_STR

  // La date d'aujourd'hui au format YYYY-MM-DD
  private TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

  // Définition des événements initiaux
  public INITIAL_EVENTS: EventInput[] = [
    {
      id: this.createEventId(),
      title: 'All-day event',
      start: this.TODAY_STR
    },
    {
      id: this.createEventId(),
      title: 'Timed event',
      start: this.TODAY_STR + 'T00:00:00',
      end: this.TODAY_STR + 'T03:00:00'
    },
    {
      id: this.createEventId(),
      title: 'Timed event',
      start: this.TODAY_STR + 'T12:00:00',
      end: this.TODAY_STR + 'T15:00:00'
    }
  ];

  // Signal pour les options du calendrier
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.INITIAL_EVENTS, // Utilisation des événements initiaux définis ici
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  });

  // Signal pour stocker les événements actuels
  currentEvents = signal<EventApi[]>([]);

  // Méthode pour générer l'ID des événements
  private eventGuid = 0;

 

  constructor(private changeDetector: ChangeDetectorRef) {}

  // Méthode pour générer un ID unique pour chaque événement
  private createEventId() {
    return String(this.eventGuid++);
  }

  // Méthode pour basculer la visibilité du calendrier
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  // Méthode pour basculer la visibilité des week-ends
  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  // Méthode pour gérer la sélection d'une date
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Clear la sélection de date

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  // Méthode pour gérer le clic sur un événement
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  // Méthode pour mettre à jour les événements actuels
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // Workaround pour éviter l'erreur pressionChangedAfterItHasBeenCheckedError
  }
}
