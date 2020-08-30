import React, { Component } from "react";
import "./main.css";
import "./main";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    email: "",
    f_name: "",
    l_name: "",
    password: "",
    conf_password: "",
    errors: [],
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {
      name: this.state.f_name,
      lastname: this.state.l_name,
      email: this.state.email,
      password: this.state.password,
    };
    if (this.isFormvalid(this.state)) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: [
                `Failed to sign you up, Please, check back later maybe its some kind of technical issue.`,
              ],
            });
          }
        })
        .catch((err) => this.setState({ errors: [err] }));
    } else {
      console.error("Form isn't valid");
    }
  };
  isFormvalid = ({ email, password, f_name, l_name }) => {
    if (this.isFormEmpty(this.state)) {
      this.setState({
        errors: ["Please, Fill in all the fields."],
      });
    } else if (!this.isPasswordConfirmed(this.state)) {
      this.setState({
        errors: [
          "Check the password and password confirmation Or Provide a suiable password",
        ],
      });
    } else return true;
  };

  isFormEmpty = ({ l_name, f_name, email, password, conf_password }) => {
    return (
      !f_name.length ||
      !l_name.length ||
      !email.length ||
      !password.length ||
      !conf_password.length
    );
  };
  isPasswordConfirmed = ({ password, conf_password }) => {
    if (password.length < 6 || conf_password.length > 6) {
      return false;
    } else if (password !== conf_password) {
      return false;
    } else {
      return true;
    }
  };
  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  render() {
    return (
      <React.Fragment>
        <div className="body">
          <main className="d-sm-flex align-items-center">
            <div className="container col-md-5 pt-4.5 pb-5">
              <div className="text-center h3">Welcome Newcomer!</div>
              <p className="text-center">Let's get you settled up!</p>
              <form className="pl-4 pr-4 needs-validation">
                <div className="form-row">
                  <div className="mb-4 form-group col">
                    <input
                      name="f_name"
                      type="text"
                      id="f_name"
                      className="form-control validate"
                      placeholder="First name"
                      required=""
                      value={this.state.f_name}
                      onChange={(e) => this.handleChange(e)}
                    />
                    <div className="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="mb-4 form-group col">
                    <input
                      name="l_name"
                      type="text"
                      id="l_name"
                      className="form-control validate"
                      placeholder="Last name"
                      required=""
                      value={this.state.l_name}
                      onChange={(e) => this.handleChange(e)}
                    />
                    <div className="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="form-control validate"
                    placeholder="E-mail"
                    required=""
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <div className="invalid-feedback">
                    Please fill out this field correctly.
                  </div>
                </div>
                <div className="form-group mb-4">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="form-control validate"
                    placeholder="Password"
                    required=""
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <small
                    id="defaultRegisterFormPasswordHelpBlock"
                    class="form-text text-muted mb-4 small"
                  >
                    At least 8 characters and 1 digit
                  </small>
                  <div className="invalid-feedback">
                    Please fill out this field correctly.
                  </div>
                </div>
                <div className="form-group mb-4">
                  <input
                    name="conf_password"
                    type="password"
                    id="conf_password"
                    className="form-control validate"
                    placeholder="Confirm Password"
                    required=""
                    value={this.state.conf_password}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <small
                    id="defaultRegisterFormPasswordHelpBlock"
                    class="form-text text-muted mb-4 small"
                  >
                    Enter the same password to confirm.
                  </small>
                  <div className="invalid-feedback">
                    Please check the password entries both values most be same.
                  </div>
                </div>
                {this.state.errors.length > 0 && (
                  <div className="alert text-center mr-1 ml-1 mb-3 p-0">
                    {this.displayErrors(this.state.errors)}
                  </div>
                )}
                <button
                  className="col-12 mb-0 p-2"
                  type="submit"
                  onClick={this.submitForm}
                >
                  Sign Up
                </button>
                <small class="form-text text-muted text-center mb-4 small">
                  After signing up you will be redirected to the login page.
                </small>
                <div className="text-center">
                  <p className="small mt-2 ml-0">or sign in with:</p>
                  <a href="#" className="small m-1" role="button">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="small m-1" role="button">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="small m-1" role="button">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="small m-1" role="button">
                    <i className="fab fa-github"></i>
                  </a>
                  <p className="small mt-2 ml-0">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(Register);
