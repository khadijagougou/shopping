import {Component, inject} from '@angular/core';
import {AttributeService} from "../../../services/attribute/attribute.service";
import {
    NftAuctionsTableItemComponent
} from "../../../../../modules/dashboard/components/nft/nft-auctions-table-item/nft-auctions-table-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-attribute-list',
  standalone: true,
  imports: [
    NftAuctionsTableItemComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './attribute-list.component.html',
  styleUrl: './attribute-list.component.scss'
})
export class AttributeListComponent {


  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false

  private attributeService = inject(AttributeService)
  private route = inject(ActivatedRoute)
  attributes :any;
  findAll(){
    this.attributeService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.attributes=value

      },
      error:err => {
        console.log("pas de valeur")
      }
    })
  }
  ngOnInit(){
    this.findAll()
    this.route.queryParams.subscribe((params) => {
      if (params['successcreate'] === 'true') {
        this.submissionSuccessCreate = true;
        setTimeout(() => {
          this.submissionSuccessCreate = false; // Le message disparaît après un moment
        }, 3000);
      }else if(params['successupdate'] === 'true'){
        this.submissionSuccessUpdate = true;
        setTimeout(() => {
          this.submissionSuccessUpdate = false; // Le message disparaît après un moment
        }, 3000)
      }
    });
  }
  deleteById(id:number){
    this.attributeService.deleteById(id).subscribe({
      next:value => {
        console.log(value)
        this.findAll()
        this.submissionSuccessDelete=true
        setTimeout(() => {
          this.submissionSuccessDelete = false;
        }, 3000);
      },
      error:err => {
        console.log(err)
      }
    })
  }
}



