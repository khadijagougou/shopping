import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {
  AttributeCreateComponent
} from "../../core/components/components/attribute/attribute-create/attribute-create.component";
import {
  AttributeListComponent
} from "../../core/components/components/attribute/attribute-list/attribute-list.component";
import {BrandCreateComponent} from "../../core/components/components/brand/brand-create/brand-create.component";
import {BrandListComponent} from "../../core/components/components/brand/brand-list/brand-list.component";
import {OptionCreateComponent} from "../../core/components/components/option/option-create/option-create.component";
import {OptionListComponent} from "../../core/components/components/option/option-list/option-list.component";
import {
  CategoryCreateComponent
} from "../../core/components/components/category/category-create/category-create.component";
import {CategoryListComponent} from "../../core/components/components/category/category-list/category-list.component";
import {ProductCreateComponent} from "../../core/components/components/product/product-create/product-create.component";
import {ProductListComponent} from "../../core/components/components/product/product-list/product-list.component";
import {
  TransporterCreateComponent
} from "../../core/components/components/transporter/transporter-create/transporter-create.component";
import {
  TransporterListComponent
} from "../../core/components/components/transporter/transporter-list/transporter-list.component";
import {
  ForwardingAgentCreateComponent
} from "../../core/components/components/forwardingAgent/forwarding-agent-create/forwarding-agent-create.component";
import {
  ForwardingAgentListComponent
} from "../../core/components/components/forwardingAgent/forwarding-agent-list/forwarding-agent-list.component";
import {MarketplaceComponent} from "../../core/components/components/marketplace/marketplace.component";
import {
  ProductFavoriteComponent
} from "../../core/components/components/product/product-favorite/product-favorite.component";
import {
  AttributeUpdateComponent
} from "../../core/components/components/attribute/attribute-update/attribute-update.component";
import {OptionUpdateComponent} from "../../core/components/components/option/option-update/option-update.component";
import {
  CategoryUpdateComponent
} from "../../core/components/components/category/category-update/category-update.component";
import {ProductUpdateComponent} from "../../core/components/components/product/product-update/product-update.component";
import {BrandUpdateComponent} from "../../core/components/components/brand/brand-update/brand-update.component";
import {
  SourcingCreateComponent
} from "../../core/components/components/sourcing/sourcing-create/sourcing-create.component";
import {SourcingListComponent} from "../../core/components/components/sourcing/sourcing-list/sourcing-list.component";
import {
  SourcingUpdateComponent
} from "../../core/components/components/sourcing/sourcing-update/sourcing-update.component";
import {ProductCartComponent} from "../../core/components/components/product/product-cart/product-cart.component";
import {
  TransporterUpdateComponent
} from "../../core/components/components/transporter/transporter-update/transporter-update.component";
import {
  ForwardingAgentUpdateComponent
} from "../../core/components/components/forwardingAgent/forwarding-agent-update/forwarding-agent-update.component";
import {TeamCreateComponent} from "../../core/components/components/team/team-create/team-create.component";
import {TeamListComponent} from "../../core/components/components/team/team-list/team-list.component";
import {TeamUpdateComponent} from "../../core/components/components/team/team-update/team-update.component";

const routes :Routes =[
  {path : 'sourcing/create',component:SourcingCreateComponent},
  {path : 'sourcing/list',component:SourcingListComponent},
  {path : 'sourcing/update/:id',component:SourcingUpdateComponent},

  {path : 'attribute/create',component:AttributeCreateComponent},
  {path : 'attribute/list',component:AttributeListComponent},
  {path : 'attribute/update/:id',component:AttributeUpdateComponent},

  {path : 'brand/create',component:BrandCreateComponent},
  {path : 'brand/list',component:BrandListComponent},
  {path : 'brand/update/:id',component:BrandUpdateComponent},

  {path : 'option/create',component:OptionCreateComponent},
  {path : 'option/list',component:OptionListComponent},
  {path : 'option/update/:id',component:OptionUpdateComponent},

  {path : 'category/create',component:CategoryCreateComponent},
  {path : 'category/list',component:CategoryListComponent},
  {path : 'category/update/:id',component:CategoryUpdateComponent},

  {path : 'product/favorite',component:ProductFavoriteComponent},
  {path : 'product/cart',component:ProductCartComponent},
  {path : 'product/create',component:ProductCreateComponent},
  {path : 'product/list',component:ProductListComponent},
  {path : 'product/update/:id',component:ProductUpdateComponent},

  {path : 'transporter/create',component:TransporterCreateComponent},
  {path : 'transporter/list',component:TransporterListComponent},
  {path : 'transporter/update/:id',component:TransporterUpdateComponent},

  {path : 'forwardingAgent/create',component:ForwardingAgentCreateComponent},
  {path : 'forwardingAgent/list',component:ForwardingAgentListComponent},
  {path : 'forwardingAgent/update/:id',component:ForwardingAgentUpdateComponent},

  {path : 'team/create',component:TeamCreateComponent},
  {path : 'team/list',component:TeamListComponent},
  {path : 'team/update/:id',component:TeamUpdateComponent},

  {path : 'marketplace',component:MarketplaceComponent},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ComponentsModule { }
