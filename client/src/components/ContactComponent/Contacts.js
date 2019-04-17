import React, { Component } from "react";
import "./Contacts.scss";
class Contacts extends Component {
  render() {
    const contacts = [
      {
        id: "1",
        name: "Vergie -    Vankirk",
        email: "Vergie.Vankirk@gmailio.com",
        phone: "374 684-683"
      },
      {
        id: "2",
        name: "Milford^Mizzell",
        email: "milfordmizzell@gmailio.com",
        phone: "5052812342"
      },
      {
        id: "3",
        name: "Magen Mart",
        email: "magen.mart@eggmail.com",
        phone: "(757) 702-8058"
      }
    ];
    const conatctList = contacts.map(contact => (
      <tr>
        <td>{contact.name} </td>
        <td> {contact.email} </td>
        <td> {contact.phone} </td>
        <td>
          <button>Update</button>
        </td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    ));
    return (
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
              {conatctList}
            </tbody>
          </table>
        </div>
        {/* <ul>{peopleLis}</ul> */}
      </div>
    );
  }
}

export default Contacts;
