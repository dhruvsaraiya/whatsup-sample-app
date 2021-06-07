import React, { useState, useCallback, useEffect } from 'react';
import { whatsupWidget } from 'whatsup-sdk';
import { useHistory } from 'react-router-dom';

const QRForm = function QRForm(props) {
    const history = useHistory();

    useEffect(() => {
        console.log("FUCK BITCH : ", 'QRForm');
        whatsupWidget.showQrCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = useCallback(async (e) => {
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <h1>Reload once you scan QR Code</h1>
            <label htmlFor="qrcode">Name</label>
            <div id="qrcode" />
            <input type='submit' />
        </form>
    )
}

export default QRForm;