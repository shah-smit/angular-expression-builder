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
    const data = '{"group": {"operator": "AND","rules": []}}';
    this.filter = JSON.parse(data);
  }

  onQueryChanged(group: Group) {
    this.output = this.queryService.computed(group);
  }
}
