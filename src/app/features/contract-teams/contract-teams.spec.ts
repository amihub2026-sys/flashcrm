import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractTeams } from './contract-teams';

describe('ContractTeams', () => {
  let component: ContractTeams;
  let fixture: ComponentFixture<ContractTeams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractTeams]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContractTeams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
