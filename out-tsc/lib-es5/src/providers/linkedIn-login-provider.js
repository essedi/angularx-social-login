var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
var LinkedInLoginProvider = /** @class */ (function (_super) {
    __extends(LinkedInLoginProvider, _super);
    function LinkedInLoginProvider(clientId, authorize, lang, fields) {
        if (fields === void 0) { fields = 'id,first-name,last-name,email-address,picture-url'; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.authorize = authorize;
        _this.lang = lang;
        _this.fields = fields;
        return _this;
    }
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ inner_text = '';
        inner_text += 'api_key: ' + this.clientId + '\r\n';
        inner_text += 'authorize:' + (this.authorize ? 'true' : 'false') + '\r\n';
        inner_text += 'lang: ' + (this.lang ? this.lang : 'fr_FR') + '\r\n';
        return new Promise(function (resolve, reject) {
            _this.loadScript(LinkedInLoginProvider.PROVIDER_ID, '//platform.linkedin.com/in.js', function () {
                var /** @type {?} */ that = _this;
                setTimeout(function () {
                    _this._readyState.next(true);
                    resolve();
                }, 800);
            }, false, inner_text);
        });
    };
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.getLoginStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                _this.signIn().then(function (user) { return resolve(user); });
            });
        });
    };
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                IN.User.authorize(function () {
                    IN.API.Raw("/people/~:(" + this.fields + ")").result(function (res) {
                        var /** @type {?} */ user = new SocialUser();
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
    };
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                IN.User.logout(function () {
                    resolve();
                }, {});
            });
        });
    };
    LinkedInLoginProvider.PROVIDER_ID = 'LINKEDIN';
    return LinkedInLoginProvider;
}(BaseLoginProvider));
export { LinkedInLoginProvider };
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