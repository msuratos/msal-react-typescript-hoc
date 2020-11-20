import { connect } from "react-redux";
import React from "react";

import { WithAzureAdProps } from '../../utils/authProvider'
import { increment } from '../../redux/sampleSlice';

interface SecuredComponentProps extends WithAzureAdProps {
    increment: Function,
    count: Number
}

class SecuredComponent extends React.Component<SecuredComponentProps> {
    render() {
        return (
            <div>
                <button onClick={() => this.props.increment()}>Increment</button>
                <div>
                    {this.props.count}
                    <p>
                        <h5>Token:</h5>
                        {this.props.acquireToken}
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any, userprops: any) => {
    return { count: state.sample };
};

const mapDispatchToProps = {
    increment
}

export default connect(mapStateToProps, mapDispatchToProps)(SecuredComponent);