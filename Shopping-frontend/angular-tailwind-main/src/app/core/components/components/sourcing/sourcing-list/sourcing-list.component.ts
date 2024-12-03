import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SourcingService} from "../../../services/sourcing/sourcing.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sourcing-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './sourcing-list.component.html',
  styleUrl: './sourcing-list.component.scss'
})
export class SourcingListComponent {


  private sourcingService = inject(SourcingService)
  sourcingList :any;
  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false
  private route = inject(ActivatedRoute)
  findAll(){
    this.sourcingService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.sourcingList=value
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
    this.sourcingService.deleteById(id).subscribe({
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



getFormattedDemande(demande: string): string {
    switch (demande) {
      case 'LOW':
        return 'Low';
      case 'MEDIUM':
        return 'Medium';
      case 'HIGH':
        return 'High';
      default:
        return 'Unknown';
    }
  }
}


