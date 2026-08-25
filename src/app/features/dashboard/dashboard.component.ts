import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({selector:'app-dashboard',standalone:true,imports:[PageHeaderComponent,StatCardComponent],templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.css'})
export class DashboardComponent { data=inject(MockDataService); }
