import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductService} from "../../../services/product/product.service";
import {TransporterService} from "../../../services/transporter/transporter.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-transporter-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './transporter-list.component.html',
  styleUrl: './transporter-list.component.scss'
})
export class TransporterListComponent {

  private transporterService = inject(TransporterService)
  transporters: any

  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false
  private route = inject(ActivatedRoute)
  findAll(){
    this.transporterService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.transporters=value
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
    this.transporterService.deleteById(id).subscribe({
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

