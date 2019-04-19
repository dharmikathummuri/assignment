import React, { Component } from "react";
import "./CreateEdit.scss";
import { connect } from "react-redux";

class CreateEdit extends Component {
  render() {
    return (
      <div className="form-class">
        <h1>create page</h1>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(CreateEdit);
