import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function QrCode({ value, size = 140, ...rest }) {
    // Check if the value is valid
    if (!value) {
        console.error("Invalid value for QR Code:", value);
        return null; // Return null if the value is invalid
    }

    return (
        <QRCodeSVG
            value={value}
            size={size}
            style={{ padding: "10px" }}
            {...rest} // Spread any additional props
        />
    );
}