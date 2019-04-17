import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import { allContacts } from "../../actions/contactsActions";
import { getContacts } from "../../contactsApiEndPoint";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: "" };
    this.getContactsFromApi();
  }
  async getContactsFromApi() {
    let result = await getContacts();
    this.setState({ contacts: result });
    await this.props.allContacts(result);
  }
  renderContactList() {
    const { contacts } = this.state;
    let rows = [];
    for (let i = 0; i < contacts.length; i++) {
      rows.push(
        <tr key={contacts[i]["id"]}>
          <td>{contacts[i]["name"]} </td>
          <td> {contacts[i]["email"]} </td>
          <td> {contacts[i]["phone"]} </td>
          <td>
            <button>Update</button>
          </td>
          <td>
            <button>Delete</button>
          </td>
        </tr>
      );
    }
    return rows;
  }
  render() {
    const contacts = this.state.contacts;
    return (
      contacts && (
        <div className="contact-class">
          <div className="contacts-header">
            <h1> All contacts</h1>
          </div>
          <div className="table-class">
            <table>
              <tbody>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th> Phone</th>
                </tr>
                {this.renderContactList()}
              </tbody>
            </table>
          </div>
        </div>
      )
    );
  }
}

export default connect(
  null,
  { allContacts }
)(Contacts);
