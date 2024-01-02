import { Injectable } from '@angular/core';

export interface Rule {
    group?: any;
    field?: string;
    condition?: string;
    data?: string;
}

export interface Group {
    operator: string;
    rules: Rule[];
    parent?: Group;
}

@Injectable({
    providedIn: 'root'
})
export class QueryService {
    computed(group: Group) {
        if (!group) return '';
        let str = '(';
        for (let i = 0; i < group.rules.length; i++) {
            if (i > 0) {
                str += '<strong>' + group.operator + '</strong> ';
            }
            str += group.rules[i].group ?
                this.computed(group.rules[i].group) :
                group.rules[i].field + ' ' + this.htmlEntities(group.rules[i].condition as string) + ' ' + group.rules[i].data;
        }
        return str + ')';
    }

    htmlEntities(str: string) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}
