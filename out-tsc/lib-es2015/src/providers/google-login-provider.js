/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class GoogleLoginProvider extends BaseLoginProvider {
    /**
     * @param {?} clientId
     * @param {?=} opt
     */
    constructor(clientId, opt = { scope: 'email' }) {
        super();
        this.clientId = clientId;
        this.opt = opt;
    }
    /**
     * @return {?}
     */
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(GoogleLoginProvider.PROVIDER_ID, '//apis.google.com/js/platform.js', () => {
                gapi.load('auth2', () => {
                    this.auth2 = gapi.auth2.init(Object.assign({}, this.opt, { client_id: this.clientId }));
                    this.auth2.then(() => {
                        this._readyState.next(true);
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });
        });
    }
    /**
     * @return {?}
     */
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                if (this.auth2.isSignedIn.get()) {
                    let /** @type {?} */ user = new SocialUser();
                    let /** @type {?} */ profile = this.auth2.currentUser.get().getBasicProfile();
                    let /** @type {?} */ token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    let /** @type {?} */ backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    resolve(user);
                }
            });
        });
    }
    /**
     * @param {?=} opt
     * @return {?}
     */
    signIn(opt) {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                let /** @type {?} */ promise = this.auth2.getAuthInstance().grantOfflineAccess(opt);
                promise.then(() => {
                    let /** @type {?} */ user = new SocialUser();
                    let /** @type {?} */ profile = this.auth2.currentUser.get().getBasicProfile();
                    let /** @type {?} */ token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    let /** @type {?} */ backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    this.auth2.currentUser.grantOfflineAccess(opt);
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    resolve(user);
                }, (closed) => {
                    reject('User cancelled login or did not fully authorize.');
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    /**
     * @return {?}
     */
    signOut() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                this.auth2.signOut().then((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    /**
     * @return {?}
     */
    revokeAuth() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                this.auth2.disconnect().then((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
}
GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
function GoogleLoginProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleLoginProvider.PROVIDER_ID;
    /** @type {?} */
    GoogleLoginProvider.prototype.auth2;
    /** @type {?} */
    GoogleLoginProvider.prototype.clientId;
    /** @type {?} */
    GoogleLoginProvider.prototype.opt;
}
//# sourceMappingURL=google-login-provider.js.map