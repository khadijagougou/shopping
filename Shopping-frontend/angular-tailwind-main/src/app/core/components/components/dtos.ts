import {Validators} from "@angular/forms";

export class AttributeDto {
  id!: number
  name!: string
  orderNumber!: number
  description!: string
  type!: string
}

export class OptionDto {
  id!: number
  name!: string
  attribute!: AttributeDto
  description!: string
}

export class CategoryDto {
  id!: number
  name!: string
  image!: string
  description!: string
}

export class BrandDto {
  id!: number
  name!: string
  image!: string
  description!: string
}

export class ProductDto {
  id!: number
  name!: string
  description!: string
  sku!: string
  shortDescription!: string
  price!: number
  comparePrice!: number
  affiliatePrice!: number
  recommendedPrice!: number
  option!: OptionDto
  category!: CategoryDto
  brand!: BrandDto
  image!: string
  rating!: number;
}

export class SourcingDto {

  id!: number
  price!:number
  image!:string
  product!:string
  url!:string
  description!:string
  demande!:string
}
export class TransporterDto {

  id!: number
  phone!:string
  image!:string
  rc!:string
  ice!:string
  name!:string
  email!:string
  website!:string
  capital!:string
  adress!:string
}
export class ForwardingAgentDto {

  id!: number
  phone!:string
  image!:string
  rc!:string
  ice!:string
  name!:string
  email!:string
  website!:string
  capital!:string
  adress!:string
}

export class TeamDto {

  id!: number
  phone!:string
  image!:string
  password!:string
  firstname!:string
  lastname!:string
  email!:string
  name!:string
  changePassword!:string
  adress!:string
  status!:boolean
  role!:string

}
