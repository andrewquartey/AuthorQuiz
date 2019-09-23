import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const moment = new Date(1522422423343);

function Hello (props) {
    return <h1>Hello at {props.now}</h1>;
}

describe('How tests work',() => {

    let result;

    beforeAll(() => {
        result = Hello({now: moment.toISOString()})
    })

    it('should have a value',() => {
        expect(result).not.toBeNull();
    });

    it('is a h1',() => {
        expect(result.type).toBe("h1")
    })

    it('is a h1',() => {
        expect(result.props.children).toBeTruthy();
    })
})

describe('When testing with ReactDom', () => {
    it("renders without crashing",() =>{
        const div = document.createElement('div');
        ReactDOM.render(<Hello now={moment.toISOString()} />, div);
    })
})

Enzyme.configure({ adapter: new Adapter() })

describe('When testing with Enzyme', () => {
    it("renders an h1",() => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.find("h1").length).toBe(1);
    });

    it("contains Hello at some timestamp", () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.contains(<h1>Hello at 2018-03-30T15:07:03.343Z</h1>)).toBe(true);
    })
})