import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'test',
    loadChildren: () => import('./modules/components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'category/create',
    loadComponent: () => import('./core/components/components/category/category-create/category-create.component').then((m)=>m.CategoryCreateComponent)
  },
  {
    path: 'category/list',
    loadComponent: () => import('./core/components/components/category/category-list/category-list.component').then((m)=>m.CategoryListComponent)

  },
  {
    path: 'category/update/:id',
    loadComponent: () => import('./core/components/components/category/category-update/category-update.component').then((m)=>m.CategoryUpdateComponent)

  },
  {
    path: 'brand/create',
    loadComponent: () => import('./core/components/components/brand/brand-create/brand-create.component').then((m)=>m.BrandCreateComponent)
  },
  {
    path: 'brand/list',
    loadComponent: () => import('./core/components/components/brand/brand-list/brand-list.component').then((m)=>m.BrandListComponent)
  },
  {
    path: 'brand/update/:id',
    loadComponent: () => import('./core/components/components/brand/brand-update/brand-update.component').then((m)=>m.BrandUpdateComponent)
  },
  {
    path: 'attribute/create',
    loadComponent: () => import('./core/components/components/attribute/attribute-create/attribute-create.component').then((m)=>m.AttributeCreateComponent)
  },
  {
    path: 'attribute/list',
    loadComponent: () => import('./core/components/components/attribute/attribute-list/attribute-list.component').then((m)=>m.AttributeListComponent)
  },
  {
    path: 'attribute/update/:id',
    loadComponent: () => import('./core/components/components/attribute/attribute-update/attribute-update.component').then((m)=>m.AttributeUpdateComponent)
  },
  {
    path: 'option/create',
    loadComponent: () => import('./core/components/components/option/option-create/option-create.component').then((m)=>m.OptionCreateComponent)
  },
  {
    path: 'option/list',
    loadComponent: () => import('./core/components/components/option/option-list/option-list.component').then((m)=>m.OptionListComponent)
  },
  {
    path: 'option/update/:id',
    loadComponent: () => import('./core/components/components/option/option-update/option-update.component').then((m)=>m.OptionUpdateComponent)
  },
  {
    path: 'product/create',
    loadComponent: () => import('./core/components/components/product/product-create/product-create.component').then((m)=>m.ProductCreateComponent)
  },
  {
    path: 'product/list',
    loadComponent: () => import('./core/components/components/product/product-list/product-list.component').then((m)=>m.ProductListComponent)
  },
  {
    path: 'product/update/:id',
    loadComponent: () => import('./core/components/components/product/product-update/product-update.component').then((m)=>m.ProductUpdateComponent)
  },
  {
    path: 'transporter/create',
    loadComponent: () => import('./core/components/components/transporter/transporter-create/transporter-create.component').then((m)=>m.TransporterCreateComponent)
  },
  {
    path: 'transporter/list',
    loadComponent: () => import('./core/components/components/transporter/transporter-list/transporter-list.component').then((m)=>m.TransporterListComponent)
  },
  {
    path: 'transporter/update/:id',
    loadComponent: () => import('./core/components/components/transporter/transporter-update/transporter-update.component').then((m)=>m.TransporterUpdateComponent)
  },
  {
    path: 'forwardingAgent/create',
    loadComponent: () => import('./core/components/components/forwardingAgent/forwarding-agent-create/forwarding-agent-create.component').then((m)=>m.ForwardingAgentCreateComponent)
  },
  {
    path: 'forwardingAgent/list',
    loadComponent: () => import('./core/components/components/forwardingAgent/forwarding-agent-list/forwarding-agent-list.component').then((m)=>m.ForwardingAgentListComponent)
  },
  {
    path: 'forwardingAgent/update/:id',
    loadComponent: () => import('./core/components/components/forwardingAgent/forwarding-agent-update/forwarding-agent-update.component').then((m)=>m.ForwardingAgentUpdateComponent)
  },
  {
    path: 'sourcing/create',
    loadComponent: () => import('./core/components/components/sourcing/sourcing-create/sourcing-create.component').then((m)=>m.SourcingCreateComponent)
  },
  {
    path: 'sourcing/list',
    loadComponent: () => import('./core/components/components/sourcing/sourcing-list/sourcing-list.component').then((m)=>m.SourcingListComponent)
  },
  {
    path: 'sourcing/update/:id',
    loadComponent: () => import('./core/components/components/sourcing/sourcing-update/sourcing-update.component').then((m)=>m.SourcingUpdateComponent)
  },
  {
    path: 'team/create',
    loadComponent: () => import('./core/components/components/team/team-create/team-create.component').then((m)=>m.TeamCreateComponent)
  },
  {
    path: 'team/list',
    loadComponent: () => import('./core/components/components/team/team-list/team-list.component').then((m)=>m.TeamListComponent)
  },
  {
    path: 'team/update/:id',
    loadComponent: () => import('./core/components/components/team/team-update/team-update.component').then((m)=>m.TeamUpdateComponent)
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./core/components/components/marketplace/marketplace.component').then((m)=>m.MarketplaceComponent)
  },
  {
    path: 'product/favorite',
    loadComponent: () => import('./core/components/components/product/product-favorite/product-favorite.component').then((m)=>m.ProductFavoriteComponent)
  },
  {
    path: 'product/cart',
    loadComponent: () => import('./core/components/components/product/product-cart/product-cart.component').then((m)=>m.ProductCartComponent)
  },
  {
    path: 'modal',
    loadComponent: () => import('./core/components/components/marketplace/dialog-overview-example-dialog/dialog-overview-example-dialog.component').then((m)=>m.DialogOverviewExampleDialogComponent)
  },
  { path: '**', redirectTo: 'errors/404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
