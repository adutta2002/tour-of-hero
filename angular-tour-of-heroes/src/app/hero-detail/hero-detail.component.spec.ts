import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        HeroService,
        MessageService
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Doesn't display anything", () => {
    const heroServiceStub = TestBed.get(HeroService);
    spyOn(heroServiceStub, "getHero").and.returnValue(of(undefined));
    fixture.detectChanges();
    const anyDiv = fixture.debugElement.query(By.css("div"));
    expect(anyDiv).toBeFalsy();
  });

  it('should run #ngOnInit() method', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled(); 
 });
 

});

