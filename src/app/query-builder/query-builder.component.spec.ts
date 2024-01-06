import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueryBuilderComponent } from './query-builder.component';
import { FormsModule } from '@angular/forms';

describe('QueryBuilderComponent', () => {
  let component: QueryBuilderComponent;
  let fixture: ComponentFixture<QueryBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryBuilderComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the QueryBuilderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should add a condition', () => {
    const initialRulesLength = component.group.rules.length;
    component.addCondition();
    expect(component.group.rules.length).toBe(initialRulesLength + 1);
  });

  it('should add a group', () => {
    const initialRulesLength = component.group.rules.length;
    component.addGroup();
    expect(component.group.rules.length).toBe(initialRulesLength + 1);
    expect(component.group.rules[initialRulesLength].group).toBeDefined();
  });

  it('should remove a condition', () => {
    component.addCondition(); // Add a condition to remove
    const initialRulesLength = component.group.rules.length;
    component.removeCondition(component.group.rules[initialRulesLength - 1]);
    expect(component.group.rules.length).toBe(initialRulesLength - 1);
  });

  it('should remove a group', () => {
    component.addGroup(); // Add a group to remove
    const initialRulesLength = component.group.rules.length;
    component.onGroupRemoved(component.group.rules[initialRulesLength - 1].group);
    expect(component.group.rules.length).toBe(initialRulesLength - 1);
  });

  // Add more test cases for other functionality as needed
});
