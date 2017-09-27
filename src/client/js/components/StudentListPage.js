import React from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { deleteStudent, uploadStudents } from "../actions/studentsActions"
import FileSaver from "file-saver";
import axios from "axios";
import {scriptsDirectory} from "../socket";
import XLSX from "xlsx";

class StudentListPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      deleted: [],
      uploadFile: false
    }
  }
  promptDelete(id){
    var deleted = this.state.deleted;
    deleted.push(id);
    this.setState({...this.state, deleted: deleted});
  }
  removeDelete(id){
    var deleted = this.state.deleted.filter((i) => {
      return i !== id;
    });
    this.setState({...this.state, deleted: deleted});
  }
  delete(id){
    this.props.dispatch(deleteStudent(id));
    var deleted = this.state.deleted.filter((i) => {
      return i !== id;
    });
    this.setState({...this.state, deleted: deleted});
  }
  uploadExcel(){
    this.setState({...this.state, uploadFile: !this.state.uploadFile});
  }
  downloadExcel(){
    var jsonArr = [];
    this.props.students.students.forEach((student) => {
      jsonArr.push({Firstname: student.firstname, Surname: student.surname, Yeargroup: student.yeargroup, Code: student.code.toUpperCase()});
    });
    var ws = XLSX.utils.json_to_sheet(jsonArr, {header: ["Firstname", "Surname", "Yeargroup", "Code", "Password"]});
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("Students")
    wb.Sheets["Students"] = ws;
    const s2ab = function(s){
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };
    var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
    var wbout = XLSX.write(wb, wopts);
    FileSaver.saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "student_download.xlsx");
  }
  handleFileChange(e){
    var files = e.target.files;
    for(var i = 0; i < files.length; i++){
      var f = files[i];
      var reader = new FileReader();
      var name = f.name;
      var dispatch = this.props.dispatch;
      var house = this.props.user.house;
      reader.onload = function(e){
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: "binary"});
        var sheetName = workbook.SheetNames[0];
        var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        dispatch(uploadStudents(json, house));
      }
      reader.readAsBinaryString(f);
    }
  }
  render(){
    const studentHTML = this.props.students.students.map((student, key) => {
      var locationStyle = {
        color: 'white',
        backgroundColor: student.location.colour
      }
      var date = new Date(student.timelastout);
      var timeString = date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
      var link = "/students/" + student.code;
      var deleteHTML = this.state.deleted.indexOf(student._id) != -1 ? (
        <div class="btn-group" style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0}}>
          <button class="btn-green btn-icon-small" style={{width: "50%", height: "100%"}} onClick={this.delete.bind(this, student._id)}><i class="fa fa-trash"></i></button>
          <button class="btn-red btn-icon-small" style={{width: "50%", height: "100%"}} onClick={this.removeDelete.bind(this, student._id)}><i class="fa fa-times"></i></button>
        </div>
      ) : (
        <i class="fa fa-trash" onClick={this.promptDelete.bind(this, student._id)}></i>
      );
      return(<tr key={key}>
        <td>{student.firstname}</td>
        <td>{student.surname}</td>
        <td>{student.code.toUpperCase()}</td>
        <td style={locationStyle}>{student.location.name}</td>
        <td>{timeString}</td>
        <td style={{textAlign: 'center'}}><Link to={link} style={{textDecoration: "none", color: "black"}}><i class="fa fa-edit"></i></Link></td>
        <td style={{textAlign: 'center', height: "100%", position: "relative"}}>{deleteHTML}</td>
      </tr>);
    });
    return(
      <div class="container">
        <div class="icon-bar">
          <Link to="/students/new" style={{textDecoration: "none", color: "white"}}>Add <i class="fa fa-plus-square"></i></Link>
          <a onClick={this.downloadExcel.bind(this)}>Download <i class="fa fa-cloud-download"></i></a>
          <a onClick={this.uploadExcel.bind(this)}>Upload <i class="fa fa-cloud-upload"></i></a>
          <a>Filter <i class="fa fa-filter"></i></a>
        </div>
        {this.state.uploadFile ? <div style={{width: "100%", margin: 5}}>
          <input type="file"  style={{padding: 10, transitionDuration: 2, textAlign: "center"}} onChange={this.handleFileChange.bind(this)} />
        </div> : null}
        <table class="table">
          <tbody>
          <tr>
            <th>
              Firstname
            </th>
            <th>
              Surname
            </th>
            <th>
              Code
            </th>
            <th>
              Location
            </th>
            <th>
              Last Signed Out
            </th>
            <th style={{textAlign: 'center'}}>
              Edit
            </th>
            <th style={{textAlign: 'center'}}>
              Delete
            </th>
          </tr>
          {studentHTML}
        </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    students: state.students,
    user: state.user.user.data
  }
}

export default connect(mapStateToProps)(StudentListPage);
