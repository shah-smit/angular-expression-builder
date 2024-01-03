import { TestBed } from '@angular/core/testing';
import { QueryService, Group, Rule } from './query.service';

describe('QueryService', () => {
  let service: QueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryService]
    });
    service = TestBed.inject(QueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compute filter string for a group', () => {
    const testGroup: Group = {
      operator: 'AND',
      rules: [
        { field: 'Firstname', condition: '=', data: 'John' },
        { field: 'Lastname', condition: '=', data: 'Doe' }
      ]
    };

    const expectedOutput = '(Firstname = John<strong>AND</strong> Lastname = Doe)';
    expect(service.computed(testGroup)).toEqual(expectedOutput);
  });

  it('should handle nested groups and rules while computing', () => {
    const nestedGroup: Group = {
      operator: 'AND',
      rules: [
        { field: 'Firstname', condition: '=', data: 'John' },
        {
          group: {
            operator: 'OR',
            rules: [
              { field: 'Lastname', condition: '=', data: 'Doe' },
              { field: 'Age', condition: '>', data: '30' }
            ]
          }
        }
      ]
    };

    const expectedOutput = '(Firstname = John<strong>AND</strong> (Lastname = Doe<strong>OR</strong>Age &gt; 30))';
    expect(service.computed(nestedGroup)).toEqual(expectedOutput);
  });

  it('should handle HTML entities in conditions', () => {
    const ruleWithHtmlEntities: Rule = {
      field: 'Field',
      condition: '<',
      data: 'Value'
    };

    const expectedOutput = 'Field &lt; Value';
    expect(service.htmlEntities(ruleWithHtmlEntities.condition as string)).toEqual(expectedOutput);
  });

  // Add more test cases to cover other functionalities as needed
});
