import { Component, OnInit } from '@angular/core';
import { Group, QueryService } from './shared/query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filter: any;
  output: string = '';

  constructor(private queryService: QueryService) {

  }

  ngOnInit() {
    const data = '( Firstname < XY AND Lastname > 10 AND ( Birthdate <= AA OR Birthdate <= BYA OR City > 10 ) AND Lastname >= SOME )';
    console.log(data);
    this.filter = { group: this.queryService.tokenizeExpression(data, undefined) };
    console.log(this.filter.group)
  }

  onQueryChanged(group: Group) {
    this.output = this.queryService.computed(group);
  }
}
