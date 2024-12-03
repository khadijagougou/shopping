import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TransporterService} from "../../../services/transporter/transporter.service";
import {ForwardingAgentService} from "../../../services/forwardingAgent/forwarding-agent.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-forwarding-agent-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './forwarding-agent-list.component.html',
  styleUrl: './forwarding-agent-list.component.scss'
})
export class ForwardingAgentListComponent {

  private forwardingAgentService = inject(ForwardingAgentService)
  forwardingAgents: any

  submissionSuccessCreate=false
  submissionSuccessUpdate=false
  submissionSuccessDelete=false
  private route = inject(ActivatedRoute)
  findAll(){
    this.forwardingAgentService.findAll().subscribe({
      next:value =>{
        console.log(value)
        this.forwardingAgents=value
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
    this.forwardingAgentService.deleteById(id).subscribe({
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

