import { Routes } from '@angular/router';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { ViewNoteComponent } from './pages/view-note/view-note.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ArchivedNoteComponent } from './pages/archived-note/archived-note.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateNoteComponent,
  },
  {
    path: 'archived',
    component: ArchivedNoteComponent,
  },
  {
    path: 'notes/:id',
    component: ViewNoteComponent,
  },
];
