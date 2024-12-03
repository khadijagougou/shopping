import {Component, inject} from '@angular/core';
import {BrandService} from "../../../services/brand/brand.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss'
})
export class BrandListComponent {


  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false
  private brandService = inject(BrandService)
  private route = inject(ActivatedRoute)

  brands :any;
  findAll(){
    this.brandService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.brands=value
      },
      error:err => console.log("pas de valeur")
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
    this.brandService.deleteById(id).subscribe({
      next:value => {
        console.log(value)
        this.findAll()
        this.submissionSuccessDelete=true
        setTimeout(() => {
          this.submissionSuccessDelete = false;
        }, 3000);
      },error:err => console.log(err)
    })
  }
}


