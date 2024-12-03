import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {TeamService} from "../../../services/team/team.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent {


  private teamService = inject(TeamService)
  teams :any;
  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false
  private route = inject(ActivatedRoute)
  findAll(){
    this.teamService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.teams=value
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
    this.teamService.deleteById(id).subscribe({
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



toggleStatus(team: any): void {
    this.teamService.updateStatusById(team.id).subscribe({
      next: (updatedTeam) => {
        team.status = updatedTeam.status;
      },
      error: (err) => console.error(err)
    });
  }

}


