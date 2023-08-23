import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const CRUD = () => {

    const [show,
        setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //new customer
    const[name,setName] = useState("")
    const[description,setDescription] = useState("")
    const[address,setAddress] = useState("")
    const[city,setCity] = useState("")
    const[state,setState] = useState("")
    const[zip,setZip] = useState("")
    const[customertype,setCustomerType] = useState({
        name: ""
    })
    //const[lastupdated,setLastUpdated] = useState("")

    //edit customer
    const[editId,setEditId] = useState("")
    const[editName,setEditName] = useState("")
    const[editDescription,setEditDescription] = useState("")
    const[editAddress,setEditAddress] = useState("")
    const[editCity,setEditCity] = useState("")
    const[editState,setEditState] = useState("")
    const[editZip,setEditZip] = useState("")
    const[editCustomertype,setEditCustomerType] = useState("")
    //const[editLastUpdated,setEditLastUpdated] = useState("")

    //Dummy Data Not in Use
    const empdata = [
        {
            id: 1,
            name: "abc",
            description: "Hello",
            Address: "Pune",
            City: "Pune",
            State: "MH",
            Zip: "411057",
            LastUpdated: "2021-01-01",
            CustomerType: "New"
        }, {
            id: 2,
            name: "abc",
            description: "Hello",
            Address: "Pune",
            City: "Pune",
            State: "MH",
            Zip: "411057",
            LastUpdated: "2021-01-01",
            CustomerType: "New"
        }, {
            id: 3,
            name: "abc",
            description: "Hello",
            Address: "Pune",
            City: "Pune",
            State: "MH",
            Zip: "411057",
            LastUpdated: "2021-01-01",
            CustomerType: "New"
        }
    ]

    const [data,
        setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    //Getting all the customer Data
    const getData = () => {
        axios.get('https://localhost:7114/api/GetAllCustomers')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) => {
            console.log(error);
        }) 
    }

    //Getting Customer Data in Modal for Data Updation
    const handleEdit = (id) => {
        handleShow();
        axios.get('https://localhost:7114/api/GetCustomerById/' + id)
        //shows the data in the modal
        .then((result) => {
             setEditName(result.data.name);
             setEditDescription(result.data.description);
             setEditAddress(result.data.address);
             setEditCity(result.data.city);
             setEditState(result.data.state);
             setEditZip(result.data.zip);
             setEditCustomerType(result.data.customerType.name);
             setEditId(result.data.id);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //Deleting Customer Data
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?") == true) {
            axios.delete('https://localhost:7114/api/DeleteCustomer/' + id)
            .then((result) => {
                if(result.status === 200) {
                    toast.success("Customer Deleted Successfully");
                    getData();
                }
            })
            .catch((error) => {
                toast.error(error);
            })
        }
    }

    //Handling Updation of customer data
    const handleUpdate = () => {
        const url = 'https://localhost:7114/api/UpdateCustomer/'+ editId;
        const data = {
                "name": editName,
                "description": editDescription,
                "address": editAddress,
                "city": editCity,
                "state": editState,
                "zip": editZip,
                "customerTypeName": editCustomertype
        }

        axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success("Customer Updated Successfully");
        })
        .catch((error) => {
            console.error("Put request error:",error);
        })
    }

    //Adding new Customer
    const handleSave = () => {
        const url = 'https://localhost:7114/api/CreateCustomer';
        const currentDate = new Date();
        const data = {
                "name": name,
                "description": description,
                "address": address,
                "city": city,
                "state": state,
                "zip": zip,
                "lastUpdated": currentDate.toISOString(),
                "customerType": {
                  "name": customertype.name
                }
        }

        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success("Customer Added Successfully");
        })
        .catch((error) => {
            toast.error(error);
        })
    }

    //clearing all field after addming new customer
    const clear = () => {
        //clear field after adding
        setName("");
        setDescription("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        setCustomerType("");

        //clear field after editing
        setEditName("");
        setEditDescription("");
        setEditAddress("");
        setEditCity("");
        setEditState("");
        setEditZip("");
        setEditCustomerType("");
        setEditId("");
    }

    return (
        <Fragment>
            <ToastContainer/>
            { /*   Form for adding new customer */}
            <Container>
            <Row>
                    <Col sm={6}>
                        <input type="text" className="form-control" placeholder="Enter Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </Col>

                    <Col sm={6} >
                        <input type="text" className="form-control" placeholder="Enter Description"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>

                    <Col sm={6}>
                        <input type="text" className="form-control" placeholder="Enter Address"
                        value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Col>

                    <Col sm={6}>
                        <input type="text" className="form-control" placeholder="Enter City"
                        value={city} onChange={(e) => setCity(e.target.value)}/>
                    </Col>

                    <Col sm={6}>
                        <input type="text" className="form-control" placeholder="Enter State"
                        value={state} onChange={(e) => setState(e.target.value)}/>
                    </Col>

                    <Col sm={6}>
                        <input type="text" className="form-control" placeholder="Enter Zip"
                        value={zip} onChange={(e) => setZip(e.target.value)}/>
                    </Col>

                    <Col sm={6}>
                        <input type="text" className="form-control" placeholder="Enter CustomerType"
                        value={customertype.name} onChange={(e) => setCustomerType({ name: e.target.value})}
                        />
                    </Col>
                    { /*
                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter LastUpdated"
                        value={lastupdated} onChange={(e) => setLastUpdated(e.target.value)}/>
                    </Col>
                    */ } 
                    <Col sm={6}>
                    {/*<button className="btn btn-primary" onClick={() => handleSave()} >Submit</button> */}
                    <button className="btn btn-primary" onClick={() => {
                        // Validate fields before calling handleSave
                        if (!name || !description || !address || !city || !state || !zip || !customertype.name) {
                            toast.error("Please fill in all fields before submitting.");
                        } else {
                            //Add new customer
                            handleSave();
                        }
                    }}>
                        Submit
                    </button>
                    </Col>
                </Row>
            </Container>
            <br/>
            { /*   Table for showing all the customer data */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>CustomerType</th>
                        <th>LastUpdated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0
                        ? data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.address}</td>
                                    <td>{item.city}</td>
                                    <td>{item.state}</td>
                                    <td>{item.zip}</td>
                                    <td>{item.customerType.name}</td>
                                    <td>{item.lastUpdated}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        : 'Loading...'
}

                </tbody>
            </Table>
            { /*   Modal Form for Updating Customer Record */ }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                <Row>
                <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter Name"
                        value={editName} onChange={(e) => setEditName(e.target.value)}
                        />
                    </Col>

                    <Col sm={4} >
                        <input type="text" className="form-control" placeholder="Enter Description"
                        value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                        />
                    </Col>

                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter Address"
                        value={editAddress} onChange={(e) => setEditAddress(e.target.value)}/>
                    </Col>

                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter City"
                        value={editCity} onChange={(e) => setEditCity(e.target.value)}/>
                    </Col>

                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter State"
                        value={editState} onChange={(e) => setEditState(e.target.value)}/>
                    </Col>

                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter Zip"
                        value={editZip} onChange={(e) => setEditZip(e.target.value)}/>
                    </Col>

                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter CustomerType"
                        value={editCustomertype} onChange={(e) => setEditCustomerType(e.target.value)}/>
                    </Col>
                { /* 
                    <Col sm={4}>
                        <input type="text" className="form-control" placeholder="Enter LastUpdated"
                        value={editLastUpdated} onChange={(e) => setEditLastUpdated(e.target.value)}/>
                    </Col>
                */ }
                </Row>
                </Modal.Body> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;