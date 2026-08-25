import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card', standalone:true,
  template:`<div class="stat"><div class="icon">{{icon}}</div><div><span>{{label}}</span><strong>{{value}}</strong><small>{{hint}}</small></div></div>`,
  styles:[`.stat{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:20px;display:flex;gap:15px;align-items:center;box-shadow:0 8px 25px rgba(15,23,42,.04)}.icon{width:44px;height:44px;border-radius:14px;background:#f0f9ff;color:#0284c7;display:grid;place-items:center;font-weight:800;font-size:18px}.stat span,.stat small{display:block;color:#64748b}.stat span{font-size:12px;font-weight:700}.stat strong{display:block;font-size:25px;color:#0f172a;margin:4px 0}.stat small{font-size:11px}`]
})
export class StatCardComponent { @Input() icon='•'; @Input() label=''; @Input() value=''; @Input() hint=''; }
