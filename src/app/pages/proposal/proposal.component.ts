import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProposalService } from 'src/app/services/proposal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  constructor(private proposalService: ProposalService) {}

  ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    // this.proposalService.getAllProposals().subscribe((e) => console.log(e));
  }
}
