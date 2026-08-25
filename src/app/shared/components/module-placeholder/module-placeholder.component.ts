import { Component, Input } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector:'app-module-placeholder', standalone:true, imports:[PageHeaderComponent],
  template:`
  <app-page-header [title]="title" [subtitle]="subtitle"><button class="btn primary">{{primaryAction}}</button></app-page-header>
  <section class="module-grid">
    @for (item of cards; track item.title) {
      <article class="module-card"><span>{{item.icon}}</span><h3>{{item.title}}</h3><p>{{item.text}}</p><button class="text-btn">Open →</button></article>
    }
  </section>
  <section class="foundation"><strong>Frontend foundation ready</strong><p>This module has its own route and feature folder. Backend APIs can be connected later without changing the overall CRM structure.</p></section>
  `,
  styles:[`.module-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.module-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:22px}.module-card>span{width:40px;height:40px;border-radius:12px;background:#f0f9ff;color:#0284c7;display:grid;place-items:center;font-weight:800}.module-card h3{margin:16px 0 8px;font-size:16px;color:#0f172a}.module-card p{margin:0;color:#64748b;font-size:13px;line-height:1.65;min-height:64px}.text-btn{border:0;background:transparent;color:#0284c7;font-weight:800;padding:14px 0 0;cursor:pointer}.foundation{margin-top:20px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:16px;padding:18px;color:#475569}.foundation strong{color:#0f172a}.foundation p{margin:6px 0 0;font-size:13px}@media(max-width:1000px){.module-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.module-grid{grid-template-columns:1fr}}`]
})
export class ModulePlaceholderComponent {
 @Input({required:true}) title=''; @Input() subtitle=''; @Input() primaryAction='Add New';
 @Input() cards:{icon:string;title:string;text:string}[]=[];
}
