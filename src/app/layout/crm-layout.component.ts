import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationService } from '../core/services/navigation.service';

@Component({
 selector:'app-crm-layout', standalone:true, imports:[RouterOutlet,RouterLink,RouterLinkActive],
 templateUrl:'./crm-layout.component.html', styleUrl:'./crm-layout.component.css'
})
export class CrmLayoutComponent {
 nav = inject(NavigationService);
 menuOpen = signal(false);
 toggleMenu(){ this.menuOpen.update(v=>!v); }
 closeMenu(){ this.menuOpen.set(false); }
}
