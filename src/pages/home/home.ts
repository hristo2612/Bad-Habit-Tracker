import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CreateNeedPage } from '../create-need/create-need';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data = { title:'', description:'', date:'', time:'' };
  progressBars: any[] = [];

  constructor(public navCtrl: NavController,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController, 
    private storage: Storage) {}

  submit() {
    console.log(this.data);
    //var date = new Date(this.data.date+" "+this.data.time);
    const time: Date = new Date(); // tslint:disable-line
    time.setSeconds(time.getSeconds() + 6);
    //console.log(date);
    if ( this.platform.is('cordova') ) {
      this.localNotifications.requestPermission().then((permission) => {
        // this.localNotifications.schedule({
        //   id: 1,
        //   title: 'Just do it',
        //   at: time,
        //   text: 'Beat The Habbit, stay strong.. bitch',
        //   sound: this.setSound()
        // });
        // this.localNotifications.schedule({
        //    id: 1,
        //    text: 'Delayed ILocalNotification',
        //    at: date,
        //    led: 'FF0000',
        //    sound: this.setSound(),
        // });
        // let alert = this.alertCtrl.create({
        //   title: 'Congratulation!',
        //   subTitle: 'Notification setup successfully at '+date,
        //   buttons: ['OK']
        // });
        // alert.present();
        this.data = { title:'', description:'', date:'', time:'' };
      });
    }

  }

  ngOnInit() {
    this.storage.get('progressBars').then((progressData) => {
      console.log(progressData);
      this.progressBars = progressData;
      // Set progress bar coloring classes
      this.progressBars.forEach((bar) => {
        this.setProgressBarClass(bar);
      });
    });
  }

  setProgressBarClass(target) {
    if (target.percent > 75) {
      target.className = 'good';
    } else if (target.percent > 59) {
      target.className = 'decent';
    } else if (target.percent > 29) {
      target.className = 'warning';
    } else {
      target.className = 'danger';
    }
  }

  createNeed(): void {
    this.navCtrl.push(CreateNeedPage);
  }


  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

}
