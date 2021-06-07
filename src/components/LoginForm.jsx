import React, { useCallback, useState } from 'react';
import { whatsupWidget } from 'whatsup-sdk';
import { useHistory } from 'react-router-dom';
import { setupWhatsup, generateOtp } from '../helpers/loginHelper';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

const LoginForm = function LoginForm(props) {
    const history = useHistory();
    const [showOTP, setShowOTP] = useState(false);

    const onGenerateOtp = useCallback(async (e, values) => {
        e.preventDefault();
        const { contactNumber, name } = values;
        generateOtp(contactNumber, name);
        setShowOTP(true);
    }, []);

    const onSubmit = useCallback(async (values, { setSubmitting }) => {
        const { contactNumber, name, otp } = values;
        await setupWhatsup(contactNumber, name, otp);
        if (!whatsupWidget.isWhatsAppConnected()) {
            history.push('/qrscan');
        } else {
            history.push('/chats');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Formik onSubmit={onSubmit} initialValues={{ name: '', contactNumber: '', otp: '' }}>
            {({ handleSubmit, handleChange, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="username" placeholder="Enter name" value={values.name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formContactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control name="contactNumber" type="text" placeholder="WhatsApp Number" value={values.contactNumber} onChange={handleChange} />
                        <Form.Text className="text-muted">
                            Add country code e.g. 91 (without + i.e. not +91)
                            </Form.Text>
                    </Form.Group>

                    {!showOTP && <Button variant="primary" type="submit" onClick={(e) => { onGenerateOtp(e, values) }}>Generate OTP</Button>}

                    {showOTP && (
                        <Form.Group controlId="formOTP">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control name="otp" type="text" placeholder="Enter otp" value={values.otp} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We have sent you OTP on WhatsApp account linked with {values.contactNumber}
                            </Form.Text>
                        </Form.Group>
                    )}
                    {showOTP && <Button variant="primary" type="submit">Submit</Button>}
                </Form>
            )}
        </Formik>

    )
}

export default LoginForm;