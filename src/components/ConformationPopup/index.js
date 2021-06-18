import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AppConstants from "../../config/AppConstants";
import moment from "moment";
import {  CommissionActions } from "../../actions";

class ConformationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { isOpen, onCancel, onSubmit, commissionPercent, walletAmount } = this.props;
    let percentAmt = parseFloat(walletAmount) *parseFloat(commissionPercent)/100
    let amountToBegivenTOVendor  = parseFloat(walletAmount) - parseFloat(percentAmt)
    let text =`Are you sure You want to settle with Current  ${commissionPercent}% Commission ?    
          For settlement you have to give ${amountToBegivenTOVendor} OMR  to vendor after commission deduction.
    `
    return (
      <Modal isOpen={isOpen} toggle={onCancel}>
        <ModalHeader toggle={onCancel}>Confirm</ModalHeader>
        <ModalBody>{text}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={onCancel}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConformationModal;
