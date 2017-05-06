import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
//  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'assets/app/hero-search.component.html',
  styleUrls: [ 'assets/app/hero-search.component.css' ],
  providers: [HeroSearchService],
})
export class HeroSearchComponent implements OnInit {
  public heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  public search(term: string): void {
    console.log('Search Console Debug ' + term);
    this.searchTerms.next(term);
    
    //this.heroes = this.heroSearchService.search(term);
    
    
   // console.log('Search Console Debug Streams ' + this.heroes);
    
  }

  public ngOnInit(): void {
      
    //console.log('Search Init Debug ');
      
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: real error handling
//        console.log(error);
        return Observable.of<Hero[]>([]);
      });
    
    console.log('Search Init Debug ' + JSON.stringify(this.searchTerms));
     
  }

  public gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}


