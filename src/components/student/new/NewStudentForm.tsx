import * as React from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router';
import { Col, FormGroup, ControlLabel, FormControl, Radio, Form, Button } from 'react-bootstrap';
import { FormButtons } from './../../common';
import { IStudent } from './../../../models';

interface INewStudentFormProps {
    onSubmit: (newStudent: IStudent) => void;
}

interface INewStudentFormState {
    student: IStudent;
}

export class NewStudentForm extends React.Component<INewStudentFormProps, INewStudentFormState> {
    constructor(props) {
        super(props);
    
        this.state = {
            student: { 
                id: '',
                registrationNumber: '',
                name: '',
                registered: false
            }
        };
    }
    
    render() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="name">
                    <Col md={2} componentClass={ControlLabel}>Name</Col>
                    <Col md={10}>
                        <FormControl
                            type="text"
                            placeholder="Student name"
                            onInput={(e) => this.onChange('name', (e.target as HTMLInputElement).value)}
                        />
                    </Col>
                </FormGroup>
                
                <FormGroup controlId="registered">
                    <Col md={2} componentClass={ControlLabel}>Registered?</Col>                                
                    <Col md={10}>
                        <Radio 
                            name="registered"
                            onChange={() => this.onChange('registered', true)}>Yes</Radio>
                        <Radio 
                            name="registered" 
                            onChange={() => this.onChange('registered', false)}>No</Radio>
                    </Col>
                </FormGroup>
                
                <FormButtons>
                    <Button bsStyle="primary" type="submit">Save</Button>
                    <Link className="btn btn-default" to="/students">Cancel</Link>
                </FormButtons>
            </Form>
        );
    }
    
    onChange = (studentProperty: string, value) => {
        const student: IStudent = _.assign({}, this.state.student, { 
            [studentProperty]: value 
        }) as IStudent;
        
        this.setState({ student });
    }
    
    onSubmit = (e) => {
        e.preventDefault();        
        this.props.onSubmit(this.state.student);
    }
}