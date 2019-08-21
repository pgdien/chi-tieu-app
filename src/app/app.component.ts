import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chi-tieu-app';
  myDate = new Date();
  listNguoiQL = null;
  listLoaiBienDong = null;
  listBienDong = null;
  selectedNguoiQL = null;
  selectedLoaiBienDong = null;
  selectedBienDong = null;
  selectedNgay = null;
  selectedTien = null;
  selectedNoiDung = null;
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
    this.httpClient.get('https://chi-tieu-api.herokuapp.com/api/biendong').subscribe((data) => {
      this.listBienDong = data;
      //console.log(this.listBienDong);
      this.selectedBienDong = this.listBienDong[0].bienDong_ID;
    });
  }
  ChonNgay(){
    console.log(this.selectedNgay);
  }
  taoBienDong(){
    console.log(this.selectedNguoiQL);
    console.log(this.selectedBienDong);
    console.log(this.selectedNgay);
    console.log(this.selectedTien);
    console.log(this.selectedNoiDung);
    // this.httpClient.post('https://chi-tieu-api.herokuapp.com/api/CT_BienDong', JSON.stringify('"NguoiQL_ID"="'+this.selectedNguoiQL+'",'+
    //                                                                                           '"BienDong_ID"="'+this.selectedBienDong+'",'+
    //                                                                                           '"Ngay"="'+this.selectedNgay+'",'+
    //                                                                                           '"Tien"="'+this.selectedTien+'",'+
    //                                                                                           '"NoiDung"="'+this.selectedNoiDung+'",'+
    //                                                                                           '"GhiChu"="'+''+'",')).pipe(
    //   data => {
    //     return data;
    // });
  }
}
