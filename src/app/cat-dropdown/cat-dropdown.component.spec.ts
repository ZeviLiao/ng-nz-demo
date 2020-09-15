import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatDropdownComponent } from './cat-dropdown.component';

describe('CatDropdownComponent', () => {
  let component: CatDropdownComponent;
  let fixture: ComponentFixture<CatDropdownComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
