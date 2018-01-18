import React from "react";
const Person = props => {
  const {
    id,
    name,
    username,
    email,
    address,
    phone,
    website,
    company
  } = props.user;
  return (
    <tr>
      <td>{id}</td>
      <td>
        <p className="name">{name}</p>
        <p className="username">@{username}</p>
        <p className="email">{email}</p>
      </td>
      <td>
        <p className="address">{`${address.zipcode}, ${address.city}, ${
          address.street
        }, ${address.suite}`}</p>
      </td>
      <td>{phone}</td>
      <td>
        <a href={"http://" + website}>{website}</a>
      </td>
      <td>
        <p>{company.name}</p>
        <p>{company.catchPhrase}</p>
        <p>{company.bs}</p>
      </td>
      <td>
        <button className="remove" onClick={e => props.removePerson(id)}>
          x
        </button>
      </td>
    </tr>
  );
};

export default Person;
