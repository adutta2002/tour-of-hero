import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed ,fakeAsync} from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({ selector: 'app-hero-detail', template: '' })
class HeroDetailStubComponent {
  @Input()
  hero!: Hero;
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let service: HeroService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroDetailStubComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        HeroService,
        MessageService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "My Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('My Heroes');
  });

  it('should run ngOnInit() method', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled(); 
  });

    it('add', async(() => {
      spyOn(component, 'add');

      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.add).toHaveBeenCalled();
      });
    }));

    it('delete', fakeAsync(() => {
      spyOn(component, 'delete');

      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.delete).toHaveBeenCalled();
      });
    }));

    it('getHeroes', () => {
      spy = spyOn(component, 'getHeroes');
      component.getHeroes();
      
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
});


