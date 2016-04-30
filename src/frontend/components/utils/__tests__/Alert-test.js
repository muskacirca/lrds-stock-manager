jest.unmock('../Alert.js');

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Alert from '../Alert'
import Expire from '../Expire'

describe('Alert', () => {
    
    let alertData = {
        type: "success",
        message: "This is a success"
    };

    beforeEach(() => {
        Expire.mockClear();
    });

    it('dont display alert when there is no alert message', () => {

        TestUtils.renderIntoDocument(<Alert delay={5000} alert={undefined}/>);

        expect(Expire.mock.calls.length).toBe(0);

    });

    it('pass the correct delay value to Expire component ', () => {

        TestUtils.renderIntoDocument(<Alert delay={5000} alert={alertData}/>);

        expect(Expire.mock.calls.length).toBe(1);

        var expireMock = Expire.mock.calls[0][0];
        expect(expireMock.delay).toBe(5000);

    });
    
});
