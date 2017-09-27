import React from "react"
import { scriptsDirectory } from "../socket";
import axios from "axios";
import {connect} from "react-redux";

class HistoryListPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      amount: 50,
      search: "",
      history: []
    }
  }
  readMore(){
    var amount = this.state.amount += 50;
    this.setState({...this.state, amount: amount}, () => {
      this.pullData();
    });
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({...this.state, [name]: value}, () => {
      this.pullData();
    });
  }
  pullData(){
    axios.get(scriptsDirectory + "history/read", {params: {house: this.props.user.house, amount: this.state.amount, filter: this.state.search}}).then((response) =>{
      if(response.data.success){
        this.setState({...this.state, history: response.data.records});
      }
    }).catch((err) =>{
      console.log(err);
    });

  }
  componentWillMount(){
    this.pullData();
  }
  render(){
    var historyHTML = this.state.history.map((history, key) => {
        var date = new Date(history.time);
        return(<tr key={key}>
          <td>{history.student.firstname} {history.student.surname}</td>
          <td>{history.student.yeargroup}</td>
          <td>{history.location.name}</td>
          <td>{date.toLocaleTimeString()} {date.toLocaleDateString()}</td>
        </tr>);
    });
    return(
      <div class="container">
        <div class="icon-bar">
          <input class="form-input" placeholder="Search..." style={{width: "100%", margin: 5}} onChange={this.handleChange.bind(this)} name="search" />
        </div>
        <table class="table">
          <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Yeargroup
            </th>
            <th>
              Location
            </th>
            <th>
              Time
            </th>
          </tr>
          {historyHTML}
        </tbody>
        </table>
        <button onClick={this.readMore.bind(this)} class="btn-blue" style={{width: "100%"}}>Read More</button>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {user: state.user.user.data};
}
export default connect(mapStateToProps)(HistoryListPage);
