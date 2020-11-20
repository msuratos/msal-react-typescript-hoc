import React from "react";
import {WithAzureAdProps} from '../../utils/authProvider'

class SecuredComponent extends React.Component<WithAzureAdProps> {
    render() {
        return (
            <div>
                {this.props.acquireToken}
            </div>
        )
    }
}

export default SecuredComponent;