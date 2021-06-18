import React, { Component } from 'react';
import { UserActions, LedgerActions, SessionActions } from "../../actions";
import Dashboard from "../Dashboard";
import Loader from "../Loader";
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      amount: 1,
      description: "",
      isFormValid: false,
      isLoading: false,
      userList: [],
      email:"",
      currentBalance:""

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }
  componentDidMount() {
    this.fetchUsers()
    SessionActions
    .getUserDetails((err, res) => {
      if (!err) {
        this.setState({
          email: res && res.data && res.data.email,
          currentBalance: res && res.data && res.data.currenBalance || 0,
          isLoading: false
        })
      }
    })
    
  }
  fetchUsers() {
    this.setState({ isLoading: true })
    let dataToSend = {
      // customerFilter,
    }
    
    UserActions
      .getUsersList(dataToSend, (err, res) => {
        if (!err) {
          this.setState({
            userList: res && res.data && res.data.user,
            isLoading: false
          })
        }
      })
  }

  handleChange(event) {
    let target = event.target,
      value = target.type === 'checkbox' ? target.checked : target.value,
      name = target.name;
    let errors = this.state.err;

    this.setState({
      err: errors,
      [name]: value
    }, () => {
      this.validateForm()
    })
  }

  validateForm() {
    let { amount, description, userId } = this.state;

    if (parseFloat(amount) >=0  && description && userId) {
      this.setState({ isFormValid: true })
    } else {
      this.setState({ isFormValid: false })
    }
  }
  handleSubmitForm(e) {
    // e.preventDefault();

    let { amount, description, isFormValid, userId } = this.state;
    this.setState({ isLoading: true })

    if (!isFormValid) {
      return false
    };

    let dataToSend = {
      userId,
      amount,
      description
    }
    
    LedgerActions
        .transferMoney(dataToSend, (err, body = {}) => {
          if (err) {
            // TODO SHOW ERROR
            this.setState({ isLoading: false })
            toast.notify(err.message , {
              duration: 3000
          });
          } else {
            this.props.history.push("/history")
          }
        })
    
  }
  render() {
    let { amount, description, userList, userId, currentBalance, email } = this.state;
    return (
      <div id="page-container" className="sidebar-o enable-page-overlay side-scroll page-header-modern ">

        <Dashboard></Dashboard>
        <main id="main-container">
          <div className="content">
            {
              this.state.isLoading ?
                <div className="custm-loader">
                  <Loader></Loader>
                </div> : null
            }
            <div className="row mb-30 mt-30">
              <div className="col-12">
                <h2 className="pt-0 mt-10 mb-0 font-size-md">{email}   Current Balance: {currentBalance}</h2>
              </div>

            </div>

            <div className="block">

              <div className="block-header block-header-default">
                <h3 className="block-title">Transfer Money</h3>

              </div>

              <div className="block-content block-content-full">



                <div className="">
                  <form action="">
                    <div className="row">
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Amount </label>
                          <input type="number" className="form-control" id="amount" name="amount" min="1" placeholder="Enter Amount.." value={amount} onChange={this.handleChange} />
                        </div>
                      </div>

                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Description</label>
                          <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description.." value={description} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">User</label>
                          <select class="form-control " name="userId" id="userId" onChange={this.handleChange} value={userId}>

                            <option value="">Please select</option>
                            {
                              userList.map((user) => {
                                return <option value={user.uuid} key={user.uuid}>{user.email}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-20">
                      <div className="col-lg-12 col-sm-12">
                        <div className="form-group">
                          <button type="submit"
                            disabled={!this.state.isFormValid}
                            onClick={(e) => {
                              e.preventDefault()
                              this.handleSubmitForm()
                            }} className="btn btn-primary btn-hero">Submit</button>
                        </div>
                      </div>
                    </div>



                  </form>
                </div>
              </div>
            </div>



          </div>



        </main>
      </div>

    );
  }
}

export default Transfer;