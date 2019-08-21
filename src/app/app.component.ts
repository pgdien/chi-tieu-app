import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chi-tieu-app';
  listNguoiQL;
  listLoaiBienDong;
  listBienDong;
  selectedNguoiQL;
  selectedLoaiBienDong;
  selectedBienDong;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {

    this.httpClient.get('https://chi-tieu-api.herokuapp.com/api/nguoiql').subscribe((data) => {
      this.listNguoiQL = data;
      //console.log(this.listNguoiQL);
      this.selectedNguoiQL = this.listNguoiQL[0].nguoiQL_ID;
    });
    this.httpClient.get('https://chi-tieu-api.herokuapp.com/api/loai_biendong').subscribe((data) => {
      this.listLoaiBienDong = data;
      //console.log(this.listLoaiBienDong);
      this.selectedLoaiBienDong = this.listLoaiBienDong[0].loaiBD_ID;
    });
    this.httpClient.get('https://chi-tieu-api.herokuapp.com/api/biendong/' + this.selectedLoaiBienDong).subscribe((data) => {
      this.listBienDong = data;
      //console.log(this.listBienDong);
      this.selectedBienDong = this.listBienDong[0].bienDong_ID;
    });
  }
}
