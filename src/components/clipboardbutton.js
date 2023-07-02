import React from 'react';

export function withoutToast(Component) {
    return function(props) {
        const copyEmail = () => {
            const email = "aeongaeong70@gmail.com";
            navigator.clipboard.writeText(email);
        }
        return <Component {...props} onClick={copyEmail} />;
    }
}