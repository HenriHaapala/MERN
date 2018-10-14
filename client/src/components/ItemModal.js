import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem, updateItem} from '../actions/itemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    update:false
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.update !== this.props.update && prevProps.add !== this.props.add && this.props.update === true){
      this.setState({update:true,add:false});
      this.toggle();
    }
    if(prevProps.add !== this.props.add && prevProps.update !== this.props.update && this.props.add === true){
      this.setState({update:false,add:true});
      this.toggle();
    }
    if(prevState.modal !== this.state.modal && this.state.modal === false){
      this.props.resetStates();
    }
  }

  toggle = () => {
    if(this.state.update === true){
      this.setState({
        modal: !this.state.modal,
        name: this.props.name
      });
    }
    else{
      this.setState({
        modal: !this.state.modal
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newiItem = {
      name: this.state.name
    }

    if(this.props.update === true){
      //add item via additem actions
      this.props.updateItem(this.props.id,newiItem);
    }
    else{
      //add item via additem actions
      this.props.addItem(newiItem);
    }

    //close modal
    this.toggle();
    this.props.resetStates();
  }

  render() {

    let placeholder = "Add shopping item";
    let modalName = "Add To Shopping List";
    let buttonText = "Add Item";

    if(this.props.update){
      placeholder = "Update shopping item";
      modalName = "Update To Shopping List";
      buttonText = "Update Item";
    }
    else{
      placeholder = "Add shopping item";
      modalName = "Add To Shopping List";
      buttonText = "Add Item";
    }

    return(
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.props.toggle}
        >Add Item</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
        <ModalHeader
          toggle={this.toggle}>{modalName}
        </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder={placeholder}
                  onChange={this.onChange}>
                </Input>
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                {buttonText}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>

        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem, updateItem })(ItemModal);
