import { Injectable } from '@angular/core';

export interface Rule {
    index?: number;
    group?: any;
    field?: string;
    condition?: string;
    data?: string;
}

export interface Group {
    index?: number;
    operator?: string;
    rules: Rule[];
    parent?: Group;
}

@Injectable({
    providedIn: 'root'
})
export class QueryService {
    filter: Group = { index: 0, operator: "AND", rules: [] };


    computed(group: Group) {
        if (!group) return '';
        let str = '( ';
        for (let i = 0; i < group.rules.length; i++) {
            if (i > 0) {
                str += ' <strong>' + group.operator + '</strong> ';
            }
            str += group.rules[i].group ?
                this.computed(group.rules[i].group) :
                group.rules[i].field + ' ' + this.htmlEntities(group.rules[i].condition as string) + ' ' + group.rules[i].data;
        }
        return str + ' )';
    }

    htmlEntities(str: string) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    tokenizeExpression(input: string, parentGroup: Group | undefined): Group {
        let arr = input.split(" ");
        arr = arr.slice(1, -1);
        console.log(arr);
        const firstIndexForCircleBracket = arr.indexOf("(");
        const lastIndexForCircleBrakcet = arr.lastIndexOf(")");

        let sub = []

        let i = 0;
        let isItAnd = false;

        while (i < arr.length) {
            if (i == firstIndexForCircleBracket) {
                sub.push(arr.slice(firstIndexForCircleBracket, lastIndexForCircleBrakcet + 1).join(" "));
                i = lastIndexForCircleBrakcet + 1
            } else {
                if (arr[i] === "AND") {
                    isItAnd = true;
                } if (arr[i] === "OR") {
                    isItAnd = false;
                }
                sub.push(arr[i]);
                i++;
            }
        }
        console.log(sub)
        const result: string[] = [];
        let currentGroup = '';

        for (const item of sub) {
            if (item.toUpperCase() === 'AND' || item.toUpperCase() === "OR") {
                if (currentGroup !== '') {
                    result.push(currentGroup.trim());
                    currentGroup = '';
                }
            } else {
                currentGroup += item + ' ';
            }
        }

        if (currentGroup !== '') {
            result.push(currentGroup.trim());
        }

        console.log(result)

        let subExpressions: Rule[] = []

        let group: Group = { rules: []}

        if(parentGroup == undefined){
            group = {
                index: 1,
                rules: subExpressions,
                operator: isItAnd ? "AND" : "OR",
            }
        } else {
            group = {
                index: parentGroup?.index as number + 1,
                rules: subExpressions,
                operator: isItAnd ? "AND" : "OR",
                parent: parentGroup
            }
        }

        for(i=0; i<result.length; i++) {
            let item = result[i]
            let rule: Rule = {}
            if(item.indexOf("(") > -1){
                rule.group = this.tokenizeExpression(item, group)
            } else {
                rule = this.parseRule(item, i+1);
            }
            group.rules.push(rule)
        }
        return group;
    }

    parseRule(item: string, index: number): Rule {
        let operators = [{  name: '='}, {  name: '<>'}, {  name: '<'}, {  name: '<='}, {  name: '>'}, {  name: '>='}]


        let operatorFound = operators.filter(o => item.split(" ").includes(o.name) )

        return {
            index: index,
            field: item.split(operatorFound[0].name)[0].trim(),
            data: item.split(operatorFound[0].name)[1].trim(),
            condition: operatorFound[0].name
        }


    }



}
