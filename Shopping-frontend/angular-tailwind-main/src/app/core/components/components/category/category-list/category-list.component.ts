import {Component, inject} from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-category-list',
  standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  private categoryService = inject(CategoryService)
  categories :any;
  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false
  private route = inject(ActivatedRoute)
  findAll(){
    this.categoryService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.categories=value
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
    this.categoryService.deleteById(id).subscribe({
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

