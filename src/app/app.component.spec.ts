import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QueryService, Group } from './shared/query.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let queryService: QueryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, QueryBuilderComponent],
      providers: [QueryService],
      imports: [BrowserModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    queryService = TestBed.inject(QueryService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty output', () => {
    expect(component.output).toEqual('');
  });

  it('should call queryService.computed method on queryChanged', () => {
    spyOn(queryService, 'computed').and.callThrough();

    const mockGroup: Group = {
      operator: 'AND',
      rules: [{ field: 'Firstname', condition: '=', data: 'John' }]
    };

    component.onQueryChanged(mockGroup);
    expect(queryService.computed).toHaveBeenCalledWith(mockGroup);
    expect(component.output).toBeTruthy();
  });

  it('should update output when queryChanged event is triggered', () => {
    const testGroup: Group = {
      operator: 'AND',
      rules: [{ field: 'Firstname', condition: '=', data: 'John' }]
    };

    component.onQueryChanged(testGroup);
    fixture.detectChanges();

    const outputElement = fixture.debugElement.query(By.css('.alert-info')).nativeElement;
    expect(outputElement.textContent).toContain('Firstname = John');
  });

  // Add more test cases to cover other functionalities as needed
});
