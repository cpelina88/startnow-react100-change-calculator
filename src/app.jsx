import React, { Component } from 'react';

var headerStyle = {
  color: 'white'
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeDue: Array(8).fill(0),
      successIsHidden: false,
      failureIsHidden: false,
      amountBack: 0
    };
    this.inputData = this.inputData.bind(this);
    this.successStatus = this.successStatus.bind(this);
    this.failureStatus = this.failureStatus.bind(this);
  }

  inputData (dataFromChild, displayAmount) {
        this.setState({ changeDue: dataFromChild,
                        amountBack: displayAmount });
        console.log(dataFromChild);
  }
  
  successStatus (successData, failureData) {
        this.setState({ successIsHidden: successData,
                        failureIsHidden: failureData });
        console.log(successData);
  }

  failureStatus (failureStatus, successStatus) {
        this.setState({ failureIsHidden: failureStatus,
                        successIsHidden: successStatus });
        console.log(failureStatus);
  }

  render() {
    return (
      <div className="container">
        <h1 style={headerStyle}>Change Calculator</h1>
        <hr />
        <div className="row">       
          <Input callbackFromParent={this.inputData} callbackForSuccess={this.successStatus} callbackForFailure={this.failureStatus} />
          <Output changeBack={this.state.changeDue} successPanel={this.state.successIsHidden} failurePanel={this.state.failureIsHidden} changeOutput={this.state.amountBack}/>
        </div>
      </div>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: '',
      amountReceived: '' 
    };
    this.handleAmountReceivedChange = this.handleAmountReceivedChange.bind(this);
    this.handleAmountDueChange = this.handleAmountDueChange.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
  }

  handleAmountDueChange (event) {
    this.setState({amountDue: event.target.value})
    console.log('change');
  }

  handleAmountReceivedChange (event) {
    this.setState({amountReceived: event.target.value})
    console.log('change');
  }

  calculateChange () {
    var owedAmount = this.state.amountDue;
    var receivedAmount = this.state.amountReceived;
    console.log(owedAmount);
    var owedAmount2 = parseFloat(owedAmount);
    var owedAmount3 = owedAmount2.toFixed(2);
    var receivedAmount2 = parseFloat(receivedAmount);
    var receivedAmount3 = receivedAmount2.toFixed(2);
    var success; 
    var fail;
    // console.log(owedAmount3);
    // console.log(receivedAmount3);
    if (parseFloat(owedAmount3) > parseFloat(receivedAmount3)) {
      fail = true;
      success = false;
      this.props.callbackForFailure(fail, success);
    }

    if (parseFloat(receivedAmount3) >= parseFloat(owedAmount3)) {
      success = true;
      fail = false;
      this.props.callbackForSuccess(success, fail);
    }

    var changeOwed = receivedAmount3 - owedAmount3;
    var changeOwed2 = changeOwed.toFixed(2);
    var changeOwed3 = changeOwed2;

    var twentiesBack = 0;
    var tensBack = 0;
    var fivesBack = 0;
    var onesBack = 0;
    var quartersBack = 0;
    var dimesBack = 0;
    var nickelsBack = 0;
    var penniesBack = 0;
    var inputList = [];
    while  (changeOwed2 >= 20) {
     
        changeOwed2 -= 20;
        twentiesBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
    while  (changeOwed2 >= 10) {
     
        changeOwed2 -= 10;
        tensBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
    while  (changeOwed2 >= 5) {
     
        changeOwed2 -= 5;
        fivesBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
     while  (changeOwed2 >= 1) {
     
        changeOwed2 -= 1;
        onesBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
     while  (changeOwed2 >= 0.25) {
     
        changeOwed2 -= 0.25;
        quartersBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
     while  (changeOwed2 >= 0.10) {
        
        changeOwed2 -= 0.10;
        dimesBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
     while  (changeOwed2 >= 0.05) {
        
        changeOwed2 -= 0.05;
        nickelsBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    }
    while  (changeOwed2 >= 0.01) {
        
        changeOwed2 -= 0.01;
        penniesBack += 1;
        changeOwed2 = changeOwed2.toFixed(2);
    } 
    inputList.push(twentiesBack, tensBack, fivesBack, onesBack, quartersBack, dimesBack, nickelsBack, penniesBack);  
    console.log(inputList);

    this.props.callbackFromParent(inputList, changeOwed3);

  }
  

  render () {
    return (

      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-heading">Enter Information</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label>How much is due?</label>
                <input onChange={this.handleAmountDueChange} value={this.state.amountDue} type="text" className="form-control" id="howMuchDue" placeholder=""></input>
              </div>
              <div className="form-group">
                <label>How much was received?</label>
                <input onChange={this.handleAmountReceivedChange} value={this.state.amountReceived} type="text" className="form-control" id="howMuchWasReceived" placeholder=""></input>
              </div>
            </form>
          </div>
          <div className="panel-footer">
            <button type="submit" className="btn btn-primary btn-block" onClick={this.calculateChange}>Calculate</button>
          </div>
        </div>
      </div>
      
    )
  }
}

class Output extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="col-md-8">
        <div className="panel panel-default">
          <div className="panel-body">
            {this.props.successPanel && 
              <div className="panel">
                <div className="panel-body bg-success text-center">
                  <p className="text-success"><strong>Success!  The change comes out to ${this.props.changeOutput}.</strong></p>
                </div>
              </div>
            }
            {this.props.failurePanel &&   
              <div className="panel">
                <div className="panel-body bg-danger text-center">
                  <p className="text-danger"><strong>Failure...  Please enter a valid amount.</strong></p>
                </div>
              </div> 
            }             
            <div className="row">
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Twenties</p>
                    <p id="twenties-output" className="text-center">{this.props.changeBack[0]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Tens</p>
                    <p id="tens-output" className="text-center">{this.props.changeBack[1]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Fives</p>
                    <p id="fives-output" className="text-center">{this.props.changeBack[2]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Ones</p>
                    <p id="ones-output" className="text-center">{this.props.changeBack[3]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Quarters</p>
                    <p id="quarters-output" className="text-center">{this.props.changeBack[4]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Dimes</p>
                    <p id="dimes-output" className="text-center">{this.props.changeBack[5]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Nickels</p>
                    <p id="nickel-output" className="text-center">{this.props.changeBack[6]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-default">
                  <div className="panel-footer">
                    <p className="text-center lead">Pennies</p>
                    <p id="pennies-output" className="text-center">{this.props.changeBack[7]}</p>
                  </div>
                </div>
              </div>
            </div>             
          </div>
        </div>
      </div>
    )
  }
}
export default App;
