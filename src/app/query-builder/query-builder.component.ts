import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group, QueryService, Rule } from '../shared/query.service';


@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent {
  @Input() group: Group = { operator: 'AND', rules: [] };
  operators = [{
    name: 'AND'
  }, {
    name: 'OR'
  }];;
  fields = [{
    name: 'Firstname'
  }, {
    name: 'Lastname'
  }, {
    name: 'Birthdate'
  }, {
    name: 'City'
  }, {
    name: 'Country'
  }];;
  conditions = [{
    name: '='
  }, {
    name: '<>'
  }, {
    name: '<'
  }, {
    name: '<='
  }, {
    name: '>'
  }, {
    name: '>='
  }];
  @Output() queryChanged = new EventEmitter<Group>();

  constructor(private queryService: QueryService) {
    
   }

  addCondition() {
    this.group.rules.push({ field: '', condition: '', data: '' });
    this.queryChanged.emit(this.group);
  }

  addGroup() {
    this.group.rules.push({ group: { operator: 'AND', rules: [] } });
    this.queryChanged.emit(this.group);
  }

  removeGroup() {
    const parent = this.group.parent;
    if (parent) {
      // TODO TO BE FINALISED
      // parent.rules.splice(index, 1);
      this.queryChanged.emit(parent);
    }
  }

  removeCondition(rule: Rule) {
    // this.group.rules.splice(index, 1);
    this.queryChanged.emit(this.group);
  }
}
