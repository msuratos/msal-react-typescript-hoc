import React from "react";

export interface WithAzureAdProps {
    acquireToken: string,
    signin: Promise<boolean>,
    signout: Function
}

export const withAzureAd = (WrappedComponent: React.ComponentType<WithAzureAdProps>) => 
    class WithAzureAd extends React.Component {
        render() {
            return (
                <WrappedComponent
                    acquireToken={this.acquireToken()}
                    signin={this.signIn()}
                    signout={this.signOut} />
            )
        }

        signIn(): Promise<boolean> {
            return new Promise((resolve) => {
                setTimeout(() => resolve(true), 5000);
            })
        }

        signOut() {
            console.log("Signing out...");
        }

        acquireToken() {
            return ";lkj(SD*F)(*";
        }
    };