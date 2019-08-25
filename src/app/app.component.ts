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
  // host='https://chi-tieu-api.herokuapp.com';
  host='http://localhost:61994';
  listNguoiQL = null;
  listLoaiBienDong = null;
  listBienDong = null;
  listBienDong2 = [];
  selectedNguoiQL = null;
  selectedLoaiBienDong = null;
  selectedBienDong = null;
  selectedNgay : string = null;
  selectedTien : string = null;
  selectedNoiDung : string = null;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.httpClient.get(this.host + '/api/user/login', JSON.parse('{"NguoiQL_ID":"",'+
                                                                  '"Ten_NguoiQL":"",'+
                                                                  '"Username":"'+'pgdien'+'",'+
                                                                  '"Password":"'+'pgdien'+'"}')).subscribe(
      res => {
        console.log(res);
    });


    this.httpClient.get(this.host + '/api/nguoiql').subscribe((data) => {
      this.listNguoiQL = data;
      //console.log(this.listNguoiQL);
      this.selectedNguoiQL = this.listNguoiQL[0].nguoiQL_ID;
    });
    this.httpClient.get(this.host + '/api/loai_biendong').subscribe((data) => {
      this.listLoaiBienDong = data;
      //console.log(this.listLoaiBienDong);
      this.selectedLoaiBienDong = this.listLoaiBienDong[0].loaiBD_ID;
    });
    this.httpClient.get(this.host + '/api/biendong').subscribe((data) => {
      this.listBienDong = data;
      // console.log(this.listBienDong);
      // this.selectedBienDong = this.listBienDong[0].bienDong_ID;
      for(var i=0; i<this.listBienDong.length-1; i++){
        if(this.listBienDong[i].loaiBD_ID==this.selectedLoaiBienDong){
          this.listBienDong2.push(this.listBienDong[i]);
          this.selectedBienDong=this.listBienDong2[0].bienDong_ID;
        }
      }
    });
  }
  selectLoaiBD(){
    this.listBienDong2=[];
    for(var i=0; i<this.listBienDong.length-1; i++){
      if(this.listBienDong[i].loaiBD_ID==this.selectedLoaiBienDong){
        this.listBienDong2.push(this.listBienDong[i]);
        this.selectedBienDong=this.listBienDong2[0].bienDong_ID;
      }
    }
    // this.listBienDong2=this.selectedBienDong.data(a => a.loaiBD_ID==this.selectedLoaiBienDong);
  }
  taoBienDong(){
    console.log(this.selectedNguoiQL);
    console.log(this.selectedBienDong);
    console.log(this.selectedNgay);
    console.log(this.selectedTien);
    console.log(this.selectedNoiDung);
    this.httpClient.post(this.host + '/api/CT_BienDong/post', JSON.parse('{"NguoiQL_ID":"'+this.selectedNguoiQL+'",'+
                                                                        '"BienDong_ID":"'+this.selectedBienDong+'",'+
                                                                        '"Ngay":"'+this.selectedNgay+'",'+
                                                                        '"Tien":"'+this.selectedTien+'",'+
                                                                        '"NoiDung":"'+this.selectedNoiDung+'",'+
                                                                        '"GhiChu":"'+''+'"}')).subscribe(
      res => {
        console.log(res);
        return res;
    });
  }
}
