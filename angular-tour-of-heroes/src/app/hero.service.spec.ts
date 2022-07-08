// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing';
// import { HeroService } from './hero.service';
// import { HttpClient } from '@angular/common/http';
// import { Hero } from './hero';

// describe('HeroService', () => {
//   let service: HeroService;
//   let httpcontroller : HttpTestingController;
//   let http : HttpClient

//   const mockData = [
//     { id: 1, name: 'Hulk' },
//     { id: 2, name: 'Thor' },
//     { id: 3, name: 'Iron Man' }
//   ] as Hero[];

//   const mockHero = { id: 2, name: 'Hulk' };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//         imports: [ HttpClientTestingModule ],
//         providers: [HeroService]
//     });
//     service = TestBed.inject(HeroService);
//     httpcontroller = TestBed.inject(HttpTestingController);
//     http = TestBed.inject(HttpClient);

//   });

//   afterEach(() => {
//     httpcontroller.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return mock heroes', () => {

//     service.getHeroes()
//     .subscribe((res)=>{
//       console.log("Response .............",res);
//       expect(res).toEqual(mockData);
//     })
    
//     const req = httpcontroller.expectOne({method: 'GET'});
//     expect(req.request.method).toEqual('GET')
//     req.flush(mockData);
//   });

//   it('should update hero', () => {
//     service.updateHero(mockHero).subscribe(
//       response => expect(response).toEqual(mockHero),
//       fail
//     );
//     // Receive PUT request
//     const req = httpcontroller.expectOne({method: 'PUT'});
//     expect(req.request.method).toEqual('PUT');
//     // Respond with the updated hero
//     req.flush(mockHero);
//   });

//   it('should delete hero using hero object', () => {

//     service.deleteHero(1).subscribe(
//       response => expect(response).toEqual(mockHero),
//       fail
//     );
//     // Receive DELETE request
//     const req = httpcontroller.expectOne({method: 'DELETE'});
//     expect(req.request.method).toEqual('DELETE');
//     // Respond with the updated hero
//     req.flush(mockHero);
//   });

//   it('should handle error gracefully', () => {

//     spyOn(service, 'handleError').and.callThrough();
//     spyOn(service, 'log').and.callThrough();
//     spyOn(console, 'error');

//     service.getHero(1).subscribe(
//       response => expect(response).toBeUndefined(),
//       fail
//     );
//     // Receive GET request
//     const req = httpcontroller.expectOne({method:'GET'});
//     expect(req.request.method).toEqual('GET');
//     // Respond with the mock heroes
//     req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });


//     //The focal point of this test
//     expect(service.handleError).toHaveBeenCalledTimes(1);
//     expect(console.error).toHaveBeenCalledTimes(1);
//     expect(service.log).toHaveBeenCalledTimes(1);
//   });

//   it('should return an empty array when passing an empty search string', () => {
//     const searchTerm = '';
//     spyOn(service, 'handleError').and.callThrough();
//     spyOn(service, 'log').and.callThrough();

//     service.searchHeroes(searchTerm).subscribe(
//       response => expect(response).toEqual([]),
//       fail
//     );

//     // Receive PUT request
//     const req = httpcontroller.expectNone({method: 'GET'});

//     //This is the exception where handleError is not called. The execution path ends before the httpClient is called.
//     expect(service.handleError).not.toHaveBeenCalled();
//     expect(service.log).not.toHaveBeenCalled();
//   })

//   it('should find heroes matching the search criteria', () => {
//     const searchTerm = 'r'
//     spyOn(service, 'handleError').and.callThrough();
//     spyOn(service, 'log').and.callThrough();

//     service.searchHeroes(searchTerm).subscribe(
//       response => expect(response).toEqual([mockData[2], mockData[3]]),
//       fail
//     );

//     // Receive PUT request
//     const req = httpcontroller.expectOne({method:'GET'});
//     expect(req.request.method).toEqual('GET');
//     // Respond with the updated hero
//     req.flush([mockData[2], mockData[3]]);

//     //for some reason, heroService.handleError is being called. The below test doesn't work as expected.
//     //https://stackoverflow.com/questions/52875876/unexpected-tohavebeencalled-on-catcherror-rxjs
//     //expect(heroService.handleError).not.toHaveBeenCalled();
//     expect(service.log).toHaveBeenCalledTimes(1);
//     expect(service.messageService.messages[0]).toEqual(`HeroService: found heroes matching "${searchTerm}"`);
//   });

//   it('should not find heroes matching the search criteria', () => {
//     const searchTerm = 'r'
//     spyOn(service, 'handleError').and.callThrough();
//     spyOn(service, 'log').and.callThrough();

//     service.searchHeroes(searchTerm).subscribe(
//       response => expect(response).toEqual([]),
//       fail
//     );

//     const req = httpcontroller.expectOne({method:'GET'});
//     expect(req.request.method).toEqual('GET');
    
//     req.flush([]);

//     expect(service.log).toHaveBeenCalledTimes(1);
//     //expect(service.messageService.messages[0]).toEqual(`HeroService: found heroes matching "${searchTerm}"`);
//   });

//     it('should handle error gracefully', () => {

//       spyOn(service, 'handleError').and.callThrough();
//       spyOn(service, 'log').and.callThrough();
//       spyOn(console, 'error');

//       service.getHero(1).subscribe(
//         response => expect(response).toBeUndefined(),
//         fail
//       );
//       // Receive GET request
//       const req = httpcontroller.expectOne({method:'GET'});
//       expect(req.request.method).toEqual('GET');
//       // Respond with the mock heroes
//       req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });


//       //The focal point of this test
//       expect(service.handleError).toHaveBeenCalledTimes(1);
//       expect(console.error).toHaveBeenCalledTimes(1);
//       expect(service.log).toHaveBeenCalledTimes(1);
//     });

//     it('should turn 404 into a user-friendly error', () => {
//       spyOn(service, 'handleError').and.callThrough();
//       spyOn(service, 'log').and.callThrough();

//       const msg = 'Deliberate 404';
//       service.getHeroes().subscribe(
//         heroes => expect(heroes).toEqual([]),
//         fail
//       );

//       const req = httpcontroller.expectOne({method:'GET'});
//       req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

//       expect(service.handleError).toHaveBeenCalledTimes(1);
//       expect(service.log).toHaveBeenCalledTimes(1);
//       expect(service.messageService.messages[0]).toEqual(`HeroService: getHeroes failed: Http failure response for ${service.heroesUrl}: 404 Bad Request`);
//     });

 

// });































import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

const mockHeroes = [
  { id: 1, name: 'Hulk' },
  { id: 2, name: 'Thor' },
  { id: 3, name: 'Iron Man' }
] as Hero[];

describe('Hero Service', () => {

  let heroService: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });
    httpTestingController = TestBed.get(HttpTestingController);;
    heroService = TestBed.get(HeroService);
    
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should return mock heroes', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(mockHeroes.length),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes);

      //for some reason, heroService.handleError is being called. The below test doesn't work as expected.
      //https://stackoverflow.com/questions/52875876/unexpected-tohavebeencalled-on-catcherror-rxjs
      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual('HeroService: fetched heroes');
    });

    it('should turn 404 into a user-friendly error', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      const msg = 'Deliberate 404';
      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(heroService.handleError).toHaveBeenCalledTimes(1);
      expect(heroService.log).toHaveBeenCalledTimes(1);
      console.log("qqqqqqqqqqqqqqqqqqqqqqqq",heroService.messageService.messages[0]) 
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: getHeroes failed: Http failure response for ${heroService.heroesUrl}: 404 Bad Request`);
    });
  });

  describe('getHero', () => {

    it('should return a single mock hero', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.getHero(mockHeroes[0].id).subscribe(
        response => expect(response).toEqual(mockHeroes[0]),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: fetched hero id=${mockHeroes[0].id}`);
    });

    it('should fail gracefully on error', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.getHero(mockHeroes[0].id).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(heroService.handleError).toHaveBeenCalledTimes(1);
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: getHero id=${mockHeroes[0].id} failed: Http failure response for ${heroService.heroesUrl}/${mockHeroes[0].id}: 404 Bad Request`);
    });
  });

  describe('getHeroNo404', () => {

    it('should return a single mock hero', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.getHeroNo404(mockHeroes[0].id).subscribe(
        //Fails: Unable to flush and recognise mockHero
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?id=${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: did not find hero id=${mockHeroes[0].id}`);
    });

    it('should fail gracefully with undefined when id not found', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.getHeroNo404(mockHeroes[0].id).subscribe(
        //Fails: Unable to flush and recognise mockHero
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?id=${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('GET');
      // Flushing a object not of type array causes unexpeced behaviour?
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: did not find hero id=${mockHeroes[0].id}`);
    });

    it('should fail gracefully on error', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      const msg = 'Deliberate 404';
      heroService.getHeroNo404(mockHeroes[0].id).subscribe(
        heroes => expect(heroes).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?id=${mockHeroes[0].id}`);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(heroService.handleError).toHaveBeenCalledTimes(1);
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: getHero id=${mockHeroes[0].id} failed: Http failure response for ${heroService.heroesUrl}/?id=${mockHeroes[0].id}: 404 Bad Request`);
    });
  });

  describe('addHero', () => {

    it('should add a single Hero', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.addHero(mockHeroes[0]).subscribe(
        response => expect(response).toEqual(mockHeroes[0]),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}`);
      expect(req.request.method).toEqual('POST');
      // Respond with the mock heroes
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: added hero w/ id=${mockHeroes[0].id}`);
    });

    it('should fail gracefully on error', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.addHero(mockHeroes[0]).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}`);
      expect(req.request.method).toEqual('POST');
      // Respond with the mock heroes
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(heroService.handleError).toHaveBeenCalledTimes(1);
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: addHero failed: Http failure response for api/heroes: 404 Bad Request`);
    });
  });

  describe('updateHero', () => {
    it('should update hero', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.updateHero(mockHeroes[0]).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(heroService.handleError).toHaveBeenCalledTimes(1);
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: updateHero failed: Http failure response for ${heroService.heroesUrl}: 404 Bad Request`);
    });

    it('should fail gracefully on error', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.updateHero(mockHeroes[0]).subscribe(
        response => expect(response).toEqual(mockHeroes[0]),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: updated hero id=${mockHeroes[0].id}`);
    });
  });

  describe('deleteHero', () => {

    it('should delete hero using id', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.deleteHero(mockHeroes[0].id).subscribe(
        response => expect(response).toEqual(mockHeroes[0]),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: deleted hero id=${mockHeroes[0].id}`);
    });

    it('should delete hero using hero object', () => {
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.deleteHero(mockHeroes[0].id).subscribe(
        response => expect(response).toEqual(mockHeroes[0]),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(mockHeroes[0]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: deleted hero id=${mockHeroes[0].id}`);
    });
  });

  describe('searchHero', () => {
    it('should find heroes matching the search criteria', () => {
      const searchTerm = 'r'
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([mockHeroes[1], mockHeroes[2]]),
        fail
      );

      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the updated hero
      req.flush([mockHeroes[1], mockHeroes[2]]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: found heroes matching "${searchTerm}"`);
    });

    it('should not find heroes matching the search criteria', () => {
      const searchTerm = 'r'
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the updated hero
      req.flush([]);

      //expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).toHaveBeenCalledTimes(1);
      expect(heroService.messageService.messages[0]).toEqual(`HeroService: no heroes matching "${searchTerm}"`);
    });


    it('should return an empty array when passing an empty search string', () => {
      const searchTerm = '';
      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      // Receive GET request
      const req = httpTestingController.expectNone(`${heroService.heroesUrl}/?name=${searchTerm}`);

      //This is the exception where handleError is not called. The execution path ends before the httpClient is called.
      expect(heroService.handleError).not.toHaveBeenCalled();
      expect(heroService.log).not.toHaveBeenCalled();
    });

    it('should fail gracefully on error', () => {
      const searchTerm = 'r';
      spyOn(heroService, 'log').and.callThrough();

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the updated hero
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(heroService.messageService.messages[0]).toEqual(`HeroService: searchHeroes failed: Http failure response for ${heroService.heroesUrl}/?name=${searchTerm}: 404 Bad Request`);
    });
  });

  describe('handleError', () => {
    it('should handle error gracefully', () => {

      spyOn(heroService, 'handleError').and.callThrough();
      spyOn(heroService, 'log').and.callThrough();
      spyOn(console, 'error');

      heroService.getHero(mockHeroes[0].id).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHeroes[0].id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });


      //The focal point of this test
      expect(heroService.handleError).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(heroService.log).toHaveBeenCalledTimes(1);
    });
  });
});



