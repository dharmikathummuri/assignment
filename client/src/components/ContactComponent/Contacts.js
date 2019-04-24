import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import { allContacts } from "../../actions/contactsActions";
import { getContacts } from "../../contactsApiEndPoint";
import { Table, Button, Form } from "react-bootstrap";
import { formatPhone, formatName } from "../../util";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: "",
      showForm: false,
      name: "",
      email: "",
      phone: "",
      counter: 0,
      update: false
    };
    this.getContactsFromApi();
    this.updateContact = this.updateContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getContactsFromApi() {
    let result = await getContacts();
    let formattedData = this.mapFormattedData(result);
    this.setState({ contacts: formattedData });
    let contactsLength = this.state.contacts.length + 1;
    this.setState({ counter: contactsLength });
    this.updateContactsInStore(formattedData);
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
    this.setState({
      showForm: true,
      name: formatName(contactToUpdate.name),
      email: contactToUpdate.email,
      phone: formatPhone(contactToUpdate.phone),
      update: true,
      id: id
    });
  }
  async updateContactsInStore(contacts) {
    await this.props.allContacts(contacts);
  }
  async deleteContact(event, id) {
    event.preventDefault();
    this.setState({ update: false, showForm: false });
    let { contacts } = this.state;
    // eslint-disable-next-line no-restricted-globals
    let deleteContact = confirm(
      "Are you sure you want to delete this contact?"
    );
    if (deleteContact) {
      let objIndex = contacts.findIndex(obj => obj.id === id);
      contacts.splice(objIndex, 1);
      this.setState({ contacts: contacts });
      this.updateContactsInStore(contacts);
    }
  }

  handleclick(event) {
    event.preventDefault();
    this.state.showForm
      ? this.setState({ showForm: false, name: "", email: "", phone: "" })
      : this.setState({ showForm: true, name: "", email: "", phone: "" });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let { contacts, counter, name, phone, email, update, id } = this.state;
    if (update) {
      let objIndex = contacts.findIndex(obj => obj.id === id);
      contacts[objIndex].name = formatName(name);
      contacts[objIndex].email = email;
      contacts[objIndex].phone = formatPhone(phone);
      this.setState({ update: false });
    } else {
      this.setState({ counter: counter + 1 });
      contacts.push({
        id: `${this.state.counter}`,
        name: formatName(name),
        email: email,
        phone: formatPhone(phone)
      });
    }
    this.setState({ contacts: contacts });
    this.updateContactsInStore(contacts);
    this.clearForm();
  }
  clearForm() {
    this.setState({ name: "", email: "", phone: "" });
  }
  checkButtonDisabled() {
    const { name, email, phone } = this.state;
    let checkForEmptyString = element => {
      return element === "";
    };
    if ([name, email, phone].some(checkForEmptyString)) {
      return true;
    } else {
      return false;
    }
  }
  renderForm() {
    return (
      <div className="form-class">
        <Form>
          <Form.Group controlId="formBasicName" onSubmit={this.handleSubmit}>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="name"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicemail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              size="lg"
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={this.state.phone}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={e => {
              this.handleSubmit(e);
            }}
            disabled={this.checkButtonDisabled()}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
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
            <Button
              onClick={e => {
                this.handleclick(e);
              }}
            >
              Create Contact
            </Button>
          </div>
          <div className="container">
            <div className="table-class">
              <Table responsive striped bordered hover variant="dark" size="sm">
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
            <div className="create-button">
              {this.state.showForm && this.renderForm()}
            </div>
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
