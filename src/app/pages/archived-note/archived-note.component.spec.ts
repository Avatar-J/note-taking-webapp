import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedNoteComponent } from './archived-note.component';

describe('ArchivedNoteComponent', () => {
  let component: ArchivedNoteComponent;
  let fixture: ComponentFixture<ArchivedNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
