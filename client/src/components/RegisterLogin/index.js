import React, { Component } from "react";
import "./main.css";
//import "./main";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";
import { Link } from "react-router-dom";

class RegisterLogin extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormvalid(this.state)) {
      this.setState({ errors: [] });
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload.loginSuccess) {
          this.props.history.push("/");
        } else {
          this.setState({
            errors: this.state.errors.concat(
              "Failed to login, check your E-mail and Paassword."
            ),
          });
        }
      });
    }
  };

  isFormvalid = ({ email, password }) => email && password;

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  render() {
    return (
      <React.Fragment>
        <div className="body">
          <main className="d-sm-flex align-items-center">
            <div className="container col-md-4 pt-4.5 pb-4.5">
              <div className="text-center h3">Welcome back!</div>
              <p className="text-center pb-4">
                We're so excited to see you again!
              </p>
              <form
                className="pl-3 pr-3 needs-validation"
                novalidate
                //onSubmit={(event) => this.submitForm(event)}
              >
                <div className="mb-4 form-group">
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
                    Please fill out this field.
                  </div>
                </div>

                <div className="form-group mb-4">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="form-control validate mb-1"
                    placeholder="Password"
                    required=""
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <div className="invalid-feedback">
                    Please fill out this field correctly.
                  </div>
                  <a href="" className="small">
                    Forgot your password?
                  </a>
                </div>

                {this.state.errors.length > 0 && (
                  <div className="alert text-center pt-1 pb-1">
                    {this.displayErrors(this.state.errors)}
                  </div>
                )}

                <button
                  className="col-12 p-2"
                  type="submit"
                  onClick={this.submitForm}
                >
                  Login
                </button>

                <p className="small mt-2 ml-0">
                  Need an account?
                  <Link to="/register"> Register</Link>
                </p>
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

export default connect(mapStateToProps)(RegisterLogin);
