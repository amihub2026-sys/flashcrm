import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractTeamForm } from './contract-team-form';

describe('ContractTeamForm', () => {
  let component: ContractTeamForm;
  let fixture: ComponentFixture<ContractTeamForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractTeamForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContractTeamForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
