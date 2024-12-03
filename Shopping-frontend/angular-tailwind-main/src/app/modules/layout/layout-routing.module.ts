import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'components',
    component: LayoutComponent,
    loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  },
  {
    path: 'attribute',
    component: LayoutComponent,
        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'brand',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'option',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'category',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'product',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'transporter',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'forwardingAgent',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'marketplace',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'sourcing',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'team',
    component: LayoutComponent,

        loadChildren: () => import('../components/components.module').then((m) => m.ComponentsModule),
  },



  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
