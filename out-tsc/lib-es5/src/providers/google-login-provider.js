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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
var GoogleLoginProvider = /** @class */ (function (_super) {
    __extends(GoogleLoginProvider, _super);
    function GoogleLoginProvider(clientId, opt) {
        if (opt === void 0) { opt = { scope: 'email' }; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        return _this;
    }
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(GoogleLoginProvider.PROVIDER_ID, '//apis.google.com/js/platform.js', function () {
                gapi.load('auth2', function () {
                    _this.auth2 = gapi.auth2.init(__assign({}, _this.opt, { client_id: _this.clientId }));
                    _this.auth2.then(function () {
                        _this._readyState.next(true);
                        resolve();
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.getLoginStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                if (_this.auth2.isSignedIn.get()) {
                    var /** @type {?} */ user = new SocialUser();
                    var /** @type {?} */ profile = _this.auth2.currentUser.get().getBasicProfile();
                    var /** @type {?} */ token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    var /** @type {?} */ backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
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
    };
    /**
     * @param {?=} opt
     * @return {?}
     */
    GoogleLoginProvider.prototype.signIn = /**
     * @param {?=} opt
     * @return {?}
     */
    function (opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                var /** @type {?} */ promise = _this.auth2.getAuthInstance().grantOfflineAccess(opt);
                promise.then(function () {
                    var /** @type {?} */ user = new SocialUser();
                    var /** @type {?} */ profile = _this.auth2.currentUser.get().getBasicProfile();
                    var /** @type {?} */ token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    var /** @type {?} */ backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    _this.auth2.currentUser.grantOfflineAccess(opt);
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    resolve(user);
                }, function (closed) {
                    reject('User cancelled login or did not fully authorize.');
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                _this.auth2.signOut().then(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.revokeAuth = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                _this.auth2.disconnect().then(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
    return GoogleLoginProvider;
}(BaseLoginProvider));
export { GoogleLoginProvider };
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