/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class LinkedInLoginProvider extends BaseLoginProvider {
    /**
     * @param {?} clientId
     * @param {?=} authorize
     * @param {?=} lang
     * @param {?=} fields
     */
    constructor(clientId, authorize, lang, fields = 'id,first-name,last-name,email-address,picture-url') {
        super();
        this.clientId = clientId;
        this.authorize = authorize;
        this.lang = lang;
        this.fields = fields;
    }
    /**
     * @return {?}
     */
    initialize() {
        let /** @type {?} */ inner_text = '';
        inner_text += 'api_key: ' + this.clientId + '\r\n';
        inner_text += 'authorize:' + (this.authorize ? 'true' : 'false') + '\r\n';
        inner_text += 'lang: ' + (this.lang ? this.lang : 'fr_FR') + '\r\n';
        return new Promise((resolve, reject) => {
            this.loadScript(LinkedInLoginProvider.PROVIDER_ID, '//platform.linkedin.com/in.js', () => {
                let /** @type {?} */ that = this;
                setTimeout(() => {
                    this._readyState.next(true);
                    resolve();
                }, 800);
            }, false, inner_text);
        });
    }
    /**
     * @return {?}
     */
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                this.signIn().then(user => resolve(user));
            });
        });
    }
    /**
     * @return {?}
     */
    signIn() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                IN.User.authorize(function () {
                    IN.API.Raw(`/people/~:(${this.fields})`).result(function (res) {
                        let /** @type {?} */ user = new SocialUser();
                        user.id = res.id;
                        user.name = res.firstName + ' ' + res.lastName;
                        user.email = res.emailAddress;
                        user.photoUrl = res.pictureUrl;
                        user.firstName = res.firstName;
                        user.lastName = res.lastName;
                        user.authToken = IN.ENV.auth.oauth_token;
                        user.linkedIn = res;
                        resolve(user);
                    });
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
                IN.User.logout(function () {
                    resolve();
                }, {});
            });
        });
    }
}
LinkedInLoginProvider.PROVIDER_ID = 'LINKEDIN';
function LinkedInLoginProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    LinkedInLoginProvider.PROVIDER_ID;
    /** @type {?} */
    LinkedInLoginProvider.prototype.clientId;
    /** @type {?} */
    LinkedInLoginProvider.prototype.authorize;
    /** @type {?} */
    LinkedInLoginProvider.prototype.lang;
    /** @type {?} */
    LinkedInLoginProvider.prototype.fields;
}
//# sourceMappingURL=linkedIn-login-provider.js.map