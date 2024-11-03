import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookImportComponent } from './workbook-import.component';

describe('WorkbookImportComponent', () => {
  let component: WorkbookImportComponent;
  let fixture: ComponentFixture<WorkbookImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkbookImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkbookImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
