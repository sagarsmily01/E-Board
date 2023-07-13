import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private modalService: NgbModal) { }

  timeSpend: any = '00:00:00';
  taskName: any;
  startTime: any;
  timeHis: any = [];

  taskNameArray: any[] = [
    {'id': 1, 'startFlag': false, 'name': 'Adding Animation to the website', 'hour': '00', 'minut': '00', 'second': '00', 'milisec': 0 },
    {'id': 2, 'startFlag': false, 'name': 'Creating Basic Layout to the Website', 'hour': '00', 'minut': '00', 'second': '00', 'milisec': 0 }
  ];
  timeObj: any =[];
  getStartTime: any = '';
  getStopTime: any = '';

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  startTimer(id: any){
    for(let i = 0; i < this.taskNameArray.length ; i++){
      if(this.taskNameArray[i].id === id){
        this.taskNameArray[i].startFlag = true
      }
    }
      this.startTime = setInterval(() => { this.timer(id); }, 10);
      this.getStartTime = this.captureStartTime();
  }

  stopTimer(id: any){
    for(let i = 0; i < this.taskNameArray.length ; i++){
      if(this.taskNameArray[i].id === id){
        this.taskNameArray[i].startFlag = false
        clearInterval(this.startTime);
      }
    }
   
    this.getStopTime = this.captureStopTime();
    let stpTime = this.captureStopTime();
    this.timeHis.push({
      'cardId': id,
      'id': this.timeHis.length + 1,
      'strTime': this.getStartTime,
      'stpTime': stpTime
    });
    let totalTime = this.timeHis.reduce((total:any, curr:any) => {
      total = total + (new Date(curr.stpTime).getTime() - new Date(curr.strTime).getTime());
      return total
    }, 0)
    this.timeSpend = this.spendTime(totalTime);
  }

  getTaskHistoryCount(id: any){
    let flag: boolean = false;
    for(let t1 of this.timeHis){
      if(t1.cardId == id){
        flag = true
      }
    }
    return flag;
  }

  spendTime(total:any){
    let seconds:any = Math.floor((total / 1000) % 60);
    let minutes:any = Math.floor((total / (1000 * 60)) % 60);
    let hours:any = Math.floor((total / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  }

  timer(id: any) {
    for(let i = 0; i < this.taskNameArray.length ; i++){
      if(this.taskNameArray[i].id === id && this.taskNameArray[i].startFlag){
        let milisec = this.taskNameArray[i].milisec
        let hr= this.taskNameArray[i].hour;
        let mnt=this.taskNameArray[i].minut;
        let sec=this.taskNameArray[i].second

        if ((milisec += 10) == 1000) {
          milisec = 0;
          sec++;
        }
        if (sec== 60) {
          sec = 0;
          mnt++;
        }
        if (mnt == 60) {
          mnt = 0;
          hr++;
        }

        this.taskNameArray[i].hour = hr;
        this.taskNameArray[i].minut = mnt;        
        this.taskNameArray[i].second = sec;
        this.taskNameArray[i].milisec = milisec;
      }
    }
  }

  captureStartTime(){
    let current = new Date();
    let getStartTime = current.toLocaleString();
    return getStartTime;
  }
  captureStopTime(){
    let current = new Date();
    let getStopTime = current.toLocaleString();
    return getStopTime;
  }

  addTask(modal: any){
    this.taskNameArray.push({
      'id': this.taskNameArray.length + 1,
      'startFlag': false,
      'name': this.taskName, 
      'hour': '00', 
      'minut': '00', 
      'second': '00', 
      'milisec': 0
    });
    modal.close();
    this.taskName = '';
  }

  deleteTask(id: any){
    this.taskNameArray = this.taskNameArray.filter(task => task.id!== id);
  }
}
