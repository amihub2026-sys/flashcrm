import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractTeamDetails } from './contract-team-details';

describe('ContractTeamDetails', () => {
  let component: ContractTeamDetails;
  let fixture: ComponentFixture<ContractTeamDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractTeamDetails]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContractTeamDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
