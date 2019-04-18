import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import { allContacts } from "../../actions/contactsActions";
import { getContacts } from "../../contactsApiEndPoint";
import { Table, Button } from "react-bootstrap";
import { formatPhone, formatName } from "../../util";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: "" };
    this.getContactsFromApi();
    this.updateContact = this.updateContact.bind(this);
  }

  async getContactsFromApi() {
    let result = await getContacts();
    let formattedData = this.mapFormattedData(result);
    this.setState({ contacts: formattedData });
    await this.props.allContacts(formattedData);
  }

  mapFormattedData(data) {
    let formattedData = data.map(item => {
      return {
        id: item.id,
        name: formatName(item.name),
        email: item.email,
        phone: formatPhone(item.phone)
      };
    });
    return formattedData;
  }

  findContact(id) {
    const { contacts } = this.state;
    return contacts.find(contact => {
      return contact.id === id;
    });
  }

  updateContact(event, id) {
    event.preventDefault();
    let contactToUpdate = this.findContact(id);
    console.log("contactToUpdate", contactToUpdate);
  }

  deleteContact(event, id) {
    event.preventDefault();
    let contactTodelete = this.findContact(id);
    console.log("contactTodelete", contactTodelete);
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
            <Button
              variant="secondary"
              onClick={e => {
                this.updateContact(e, contacts[i]["id"]);
              }}
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              variant="danger"
              onClick={e => {
                this.deleteContact(e, contacts[i]["id"]);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    }
    return rows;
  }
  render() {
    const { contacts } = this.state;
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
