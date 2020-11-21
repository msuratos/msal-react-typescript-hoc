import React from "react";
import * as msal from "@azure/msal-browser";

const msalConfig: msal.Configuration = {
    auth: {
        clientId: process.env.REACT_APP_MSAL_CLIENTID as string,
        authority: process.env.REACT_APP_MSAL_AUTHORITY,
        redirectUri: process.env.REACT_APP_MSAL_REDIRECT_URI
    }
}

const msalInstance = new msal.PublicClientApplication(msalConfig);

export interface WithAzureAdProps {
    acquireToken: (username: string) => Promise<msal.AuthenticationResult>,
    signin: () => Promise<msal.AuthenticationResult>,
    signout: Function
}

export const withAzureAd = <P extends object>(WrappedComponent: React.ComponentType<P>) => 
    class WithAzureAd extends React.Component {
        render() {
            const { ...props } = this.props;

            return (
                <WrappedComponent
                    { ...props as P}
                    acquireToken={this.acquireToken}
                    signin={this.signIn}
                    signout={this.signOut} />
            )
        }

        signIn() {
            /*  
                If you need the pre consent of the api scope during
                login of user, uncomment section below
            */
            // const apiScope = process.env.REACT_APP_MSAL_API_SCOPE as string;
            // const loginRequest = {
            //     scopes: [apiScope]
            // }

            return msalInstance.loginPopup();
        }

        signOut() {
            console.log("Signing out...");
        }

        acquireToken(username: string) {
            const apiScope = process.env.REACT_APP_MSAL_API_SCOPE as string;
            const request: any = {
                scopes: [apiScope],
                account: msalInstance.getAccountByUsername(username)
            }

            return msalInstance.acquireTokenSilent(request);
        }
    };