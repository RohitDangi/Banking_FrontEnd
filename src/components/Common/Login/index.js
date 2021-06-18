import React, { Component } from 'react';
import { SessionActions } from "../../../actions";
import appConstants from "../../../config/AppConstants";
import { validateEmail } from "../../../utils/helpers";
import Loader from "../../Loader";
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isFormValid: false,
      isLoading: false,
      loginType: 1
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  validateForm = () => {
    let {
      email,
      password,
    } = this.state;

    if (password && validateEmail(email)) {
      this.setState({
        isFormValid: true,
      });
    } else {
      this.setState({
        isFormValid: false,
      });
    }
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      this.validateForm()
    });
  }

  handleEnter(event) {
    if (event) {
      event.preventDefault()
    }
    if (event.which === 13) {
      this.setState({ isLoading: true }, () => {
        this.submitForm(event)
      })
    }
    else {
      this.handleChange(event)
    }
  }

  submitForm(event) {
    if (event) {
      event.preventDefault()
    }

    const { email, password, isFormValid } = this.state;
    this.setState({ isLoading: true })
    if (!isFormValid) {
      this.validateForm()
      return false;
    };


    const dataToSend = {
      email,
      password,

    };

    SessionActions
      .signIn(dataToSend, (err, res) => {
        if (err) {
          let message = appConstants.SERVER_ERROR
          if (err.message) {
            message = err.message
          }
          let showtoaster = true;
          let dataToSet = {
            errorMessage: message
          };

          // if (err.code === "EMAIL_NOT_VERIFIED") {
          //   dataToSet.errorMessage = message
          //   dataToSet.isResendLink = true
          //   showtoaster = false
          // }
          dataToSet.isLoading = false
          this.setState(dataToSet)
          //   if (showtoaster) {
          toast.notify(err.message || message, {
            duration: 3000
          });
          //   }
        } else {
          this.setState({ isLoading: false })
          window.location.href = "/"
        }
      });


  };


  render() {
    let { email, password, loginType } = this.state;
    return (
      <div id="page-container" className="main-content-boxed">
        <main id="main-container">
          {
            this.state.isLoading ?
              <div className="custm-loader">
                <Loader></Loader>
              </div> : null
          }
          <div className="bg-image login-bg">
            <div className="row mx-0 bg-black-op">
              <div className="hero-static col-md-6 col-xl-8 d-md-flex align-items-md-end">
                <div className="p-30" data-toggle="appear">
                  <p className="font-size-h3 font-w600 text-white">
                    Get Inspired.
                                </p>
                  <p className="font-italic text-white-op">
                    Copyright &copy; <span className="js-year-copy"></span>
                  </p>
                </div>
              </div>
              <div className="hero-static col-md-6 col-xl-4 d-flex align-items-center bg-white" data-toggle="appear" data-className="animated fadeInRight">
                <div className="content content-full">
                  <div className="px-30 py-10">
                    <a className=" font-w700" >
                      {/* <img className="img-avatar" src="wasta.png" alt=""/> */}


                    </a>
                    <h1 className="h3 font-w700 mt-30 mb-10">Welcome to Your Dashboard</h1>
                    {
                      <form className="js-validation-signin px-30" method="post">
                        <div className="form-group row">
                          <div className="col-12">
                            <div className="form-material floating">
                              <input
                                className="form-control"
                                type="email"
                                id="login-username"
                                //  placeholder="joe@email.com"
                                autoComplete="new-email"
                                name="email"
                                value={email}
                                onKeyUp={this.handleEnter}
                                onChange={this.handleChange}
                              />
                              <label for="login-username">Email</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-12">
                            <div className="form-material floating">
                              <input
                                type="password"
                                className="form-control"
                                id="login-password"
                                name="password"
                                onKeyUp={this.handleEnter}
                                onChange={this.handleChange}
                              />
                              <label for="login-password">Password</label>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <button type="submit" onClick={this.submitForm} className="btn btn-sm btn-hero btn-alt-primary">
                            <i className="si si-login mr-10"></i> Sign In
                                        </button>
                          <div className="mt-30">
                            <a className="link-effect text-muted mr-10 mb-5 d-inline-block" onClick={(e) => {
                              e.preventDefault()
                              this.props.history.push("signup")
                            }}>
                              <i className="fa fa-plus mr-5"></i> Create Account
                                            </a>

                          </div>
                        </div>
                      </form>


                    }
                  </div>


                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;