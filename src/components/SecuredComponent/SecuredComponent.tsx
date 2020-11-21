import { connect } from "react-redux";
import React from "react";
import * as msal from "@azure/msal-browser";

import { WithAzureAdProps } from '../../utils/authProvider'
import { increment } from '../../redux/sampleSlice';

interface SecuredComponentProps extends WithAzureAdProps {
    increment: Function,
    count: Number,
    auth: string
}

class SecuredComponent extends React.Component<SecuredComponentProps> {
    state = {
        accessToken: ''
    };

    render() {
        return (
            <div>
                <button onClick={() => this.props.increment()}>Increment</button>
                <div>
                    {this.props.count}
                    <div>
                        <h5>Token:</h5>
                        <button onClick={async () => await this.acquireToken()}>Get Token</button>
                        {this.state.accessToken}
                    </div>
                </div>
            </div>
        )
    }

    async acquireToken() {
        try {            
            const currentUserMsal = await this.props.acquireToken(this.props.auth);

            if (currentUserMsal)
                this.setState({accessToken: currentUserMsal.accessToken});
        }
        catch(error) {
            console.log('Error in authProvider acquire token', error);

            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                console.log('Error is Interaction Auth Required');
            }
        }
    }
}

const mapStateToProps = (state: any, userprops: any) => {
    return { count: state.sample, auth: state.auth };
};

const mapDispatchToProps = {
    increment
}

export default connect(mapStateToProps, mapDispatchToProps)(SecuredComponent);