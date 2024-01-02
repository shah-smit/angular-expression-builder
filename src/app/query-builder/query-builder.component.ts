import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group, QueryService, Rule } from '../shared/query.service';


@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent {
  @Input() group: Group = { operator: 'AND', rules: [] };
  @Input() index: number = -1;
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
    let maxIndex = -1;
    this.group.rules.forEach(rule => {
      if(rule.field != undefined){
        maxIndex = Math.max(rule.index as number, maxIndex);
      }
    })
    this.group.rules.push({ index: maxIndex+1, field: 'Firstname', condition: '=', data: '' });
    this.queryChanged.emit(this.group);
  }

  addGroup() {
    let maxIndex = -1;
    this.group.rules.forEach(rule => {
      if(rule.group != undefined){
        maxIndex = Math.max(rule.group.index, maxIndex);
      }
    })
    this.group.rules.push({ group: { index: maxIndex+1, operator: 'AND', rules: [], parent: this.group } });
    this.queryChanged.emit(this.group);
  }

  removeGroup() {
    const parent = this.group.parent;
    console.log(parent)
    console.log(this.index)
    if (parent) {
      const updated_parent_rules = parent.rules.filter(rule => {
        if(rule.group && rule.group.index == this.index){
          return false;
        };
        return true;
      })
      parent.rules = updated_parent_rules  
    }

    this.queryChanged.emit(parent);
  }

  removeCondition(rule: Rule) {
    // this.group.rules.splice(index, 1);
    this.group.rules = this.group.rules.filter(obj => {
      if(obj.field && obj.index == rule.index){
        return false;
      }
      return true;
    });
    this.queryChanged.emit(this.group);
  }

  onQueryChanged(group: Group) {
    this.queryChanged.emit(group)
  }
}
