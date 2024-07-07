import { Component, OnInit } from '@angular/core';
import { RedtestService } from '../../redtest.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IpinfoService } from '../../ipinfo.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  speedMbps: number = 0;
  speedBps = '';
  speedKbps = '';
  ipinformtaion = '';

  showMoreInfo: boolean = false; 

  constructor(private api: RedtestService, private ipInfo: IpinfoService) { }

  ngOnInit(): void {
    this.getSpeed();

    this.ipInfo.getIp().subscribe((data: any) => {
      this.ipinformtaion = data.ip;
    });
    
  }

  getSpeed(): void {
    this.api.measureSpeed().subscribe((data: any) => {
      this.speedMbps = data.speedMbps;
      this.speedBps = data.speedBps;
      this.speedKbps = data.speedKbps;
    });
  }

  showMoreInfor(){
    this.showMoreInfo =!this.showMoreInfo;
  }



}
