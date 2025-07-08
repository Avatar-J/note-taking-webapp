import { Routes } from '@angular/router';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { ViewNoteComponent } from './pages/view-note/view-note.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ArchivedNoteComponent } from './pages/archived-note/archived-note.component';

export const routes: Routes = [
  {
    path: '',
    component: ViewNoteComponent,
    pathMatch: 'full',
    outlet: 'desktop',
  },
  {
    path: '',
    component: DashboardComponent,
    outlet: 'mobile',
  },
  {
    path: 'create',
    component: CreateNoteComponent,
    outlet: 'mobile',
  },
  {
    path: 'archived',
    component: ArchivedNoteComponent,
    outlet: 'mobile',
  },
  {
    path: 'view',
    component: ViewNoteComponent,
    outlet: 'mobile',
  },
  {
    path: 'create',
    component: CreateNoteComponent,
    outlet: 'desktop',
  },
  {
    path: 'archived',
    component: ArchivedNoteComponent,
  },
  {
    path: 'view',
    component: ViewNoteComponent,
    outlet: 'desktop',
  },
];
