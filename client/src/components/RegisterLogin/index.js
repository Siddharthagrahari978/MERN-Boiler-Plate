import React, { Component } from "react";
import "./main.css";
import "./main";

export default class RegisterLogin extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body">
          <main className="d-sm-flex align-items-center">
            <div className="container col-md-6">
              <div className="text-center h2">Welcome back!</div>
              <p className="text-center">We're so excited to see you again!</p>
              <form
                className="pl-4 pr-4 needs-validation"
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
                    //value={this.state.email}
                    //onChange={(e) => this.handleChange(e)}
                  />
                  <label
                    htmlFor="email"
                    data-error="Please fill out this field."
                    data-success="Looks good."
                  ></label>
                </div>

                <div className="form-group mb-4">
                  <input
                    name="pass"
                    type="password"
                    id="pass"
                    className="form-control validate"
                    placeholder="Password"
                    required=""
                    //value={this.state.pass}
                    //onChange={(e) => this.handleChange(e)}
                  />
                  <div className="invalid-feedback">
                    Please fill out this field correctly.
                  </div>
                </div>

                <a href="">Forgot password?</a>
                <button
                  className="col-12 my-3 p-2"
                  type="submit"
                  //onClick={event => this.submitForm}
                >
                  Login
                </button>

                <p>
                  Need an account?
                  <a href=""> Register</a>
                </p>

                <p>or sign in with:</p>

                <a href="#" className="m-2" role="button">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="m-2" role="button">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="m-2" role="button">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="m-2" role="button">
                  <i className="fab fa-github"></i>
                </a>
              </form>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}
