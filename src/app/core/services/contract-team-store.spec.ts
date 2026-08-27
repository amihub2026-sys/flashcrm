import { TestBed } from '@angular/core/testing';
import { ContractTeamStore } from './contract-team-store';

describe('ContractTeamStore', () => {
  let service: ContractTeamStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractTeamStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
