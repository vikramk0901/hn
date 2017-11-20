import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/of";
import * as _ from "lodash";
import * as moment from "moment";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private api = "https://hacker-news.firebaseio.com/v0";
  items = {};

  constructor(public http: HttpClient) {}

  fetchItems(ids): Observable<any[]> {
    return Observable.forkJoin(
      ids.map((id: any) => {
        return this.http
          .get(`${this.api}/item/${id}.json?print=pretty`)
          .map((res: any) => {
            let story: any = res;
            story = this.sanitizePost(story);
            return story;
          });
      })
    );
  }

  getItems(type): any[] {
    return this.items[type];
  }

  getPosts(type): Observable<any[]> {
    return this.http
      .get(`${this.api}/${type}.json?print=pretty`)
      .map((res: any) => {
        this.items[type] = this.items[type] || [];
        this.items[type] = _.union(this.items[type], res);
        return res.slice(0, 20);
      })
      .mergeMap((ids: string[]) => {
        if (ids.length > 0) {
          return Observable.forkJoin(
            ids.map((id: any) => {
              return this.http
                .get(`${this.api}/item/${id}.json?print=pretty`)
                .map((res: any) => {
                  let story: any = res;
                  story = this.sanitizePost(story);
                  return story;
                });
            })
          );
        }
      });
  }

  //TODO : Handle gracefully if nextId doesn't exists
  loadMore(type, nextId) {
    let indexOf = this.items[type].indexOf(nextId) + 1;
    let ids = this.items[type].slice(indexOf, indexOf + 20);
    return this.fetchItems(ids);
  }

  sanitizePost(story) {
    story.domain = (story.url && story.url.split("/")[2]) || "";
    story.ago = moment.unix(story.time).fromNow();
    return story;
  }

  getPost(nextId) {
    return this.http.get(`${this.api}/item/${nextId}.json?print=pretty`);
  }
}
