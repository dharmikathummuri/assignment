import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import { allContacts } from "../../actions/contactsActions";
import { getContacts } from "../../contactsApiEndPoint";
import { Table, Button } from "react-bootstrap";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: "" };
    this.getContactsFromApi();
  }

  async getContactsFromApi() {
    let result = await getContacts();
    this.setState({ contacts: result });
    await this.props.allContacts(this.mapFormattedData(result));
  }

  formatPhone(number) {
    return `number ${number}`;
  }

  mapFormattedData(data) {
    const { contacts } = this.state;
    let formattedData = contacts.map(item => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        phone: this.formatPhone(item.phone)
      };
    });
    return formattedData;
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
            <Button variant="secondary">Update</Button>
          </td>
          <td>
            <Button variant="danger">Delete</Button>
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
            <h1>All contacts</h1>
          </div>
          <div className="table-class">
            <Table responsive="sm" striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th> Phone</th>
                  <th> Update</th>
                  <th> Delete </th>
                </tr>
                {this.renderContactList()}
              </tbody>
            </Table>
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
