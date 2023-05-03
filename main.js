(()=>{"use strict";var e=document.querySelector(".popup-profile").querySelector(".form"),t=document.querySelector(".profile__edit"),r=document.querySelector(".popup-avatar").querySelector(".form"),n=document.querySelector(".profile__image"),o=document.querySelector(".popup-card").querySelector(".form"),i=document.querySelector(".profile__button"),c={inputSelector:".form__input",submitButtonSelector:".popup__button",errorMessageSelector:".form__text-error_type_",inputErrorClass:"form__input_error",textErrorClass:"form__text-error_visible"};function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return(t=p(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,p(n.key),n)}}function p(e){var t=function(e,t){if("object"!==u(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===u(t)?t:String(t)}var y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers,this._authorization=t.headers.authorization,this._myId=null}var t,r;return t=e,(r=[{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._authorization}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).then((function(t){return t.map((function(t){return l(l({},t),{},{isMyCard:t.owner._id===e._myId,isLike:t.likes.some((function(t){return t._id===e._myId}))})}))})).catch((function(e){console.error(e)}))}},{key:"saveCard",value:function(e,t,r){var n=r.querySelector(".popup__button");return n.textContent="Сохранение...",fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).catch((function(e){console.error(e)})).finally((function(){n.textContent="Создать"}))}},{key:"likeCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:t,headers:{authorization:this._authorization}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).then((function(e){return e})).catch((function(e){console.error(e)}))}},{key:"deleteCard",value:function(e,t){fetch("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:{authorization:this._authorization}}).then((function(t){if(!t.ok)return Promise.reject("Ошибка: ".concat(res.status));e.remove()})).catch((function(e){console.error(e)}))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:{authorization:this._authorization}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).then((function(t){return e._myId=t._id,t})).catch((function(e){console.error(e)}))}},{key:"saveUserInfo",value:function(e,t,r){var n=r.querySelector(".popup__button");return n.textContent="Сохранение...",fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).catch((function(e){console.error(e)})).finally((function(){n.textContent="Сохранить"}))}},{key:"editUserAvatar",value:function(e,t){console.log("Смена аватара",e,t);var r=t.querySelector(".popup__button");return r.textContent="Сохранение...",fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).catch((function(e){console.error(e)})).finally((function(){r.textContent="Сохранить"}))}}])&&f(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==m(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==m(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===m(o)?o:String(o)),n)}var o}var b=function(){function e(t,r,n){var o=n.handleCardClick,i=n.handleLikeClick,c=n.handleDeleteClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardId=t._id,this._name=t.name,this._link=t.link,this._likes=t.likes.length,this._isMyCard=t.isMyCard,this._isLike=t.isLike,this._templateSelector=r,this._openPopupWithImage=o,this._likeCard=i,this._openPopupForDelete=c,this._popupImage=document.querySelector(".popup-image"),this._popupImagePhoto=document.querySelector(".popup-image__photo"),this._popupImageCaption=document.querySelector(".popup-image__caption")}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__item").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._cardElement.querySelector(".elements__like").addEventListener("click",(function(t){e._likeCard(t.target,e._cardId,e._isLike)})),this._cardElement.querySelector(".elements__trash").addEventListener("click",(function(t){e._openPopupForDelete(t.target.closest(".elements__item"),e._cardId)})),this._cardImage.addEventListener("click",(function(){e._openPopupWithImage(e._name,e._link)}))}},{key:"generateCard",value:function(){return this._cardElement=this._getTemplate(),this._cardImage=this._cardElement.querySelector(".elements__photo"),this._setEventListeners(),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardElement.querySelector(".elements__like-count").textContent=this._likes,this._cardElement.querySelector(".elements__title").textContent=this._name,this._isMyCard&&this._cardElement.querySelector(".elements__trash").classList.add("elements__trash_show"),this._isLike&&this._cardElement.querySelector(".elements__like").classList.add("elements__like_type_active"),this._cardElement}}])&&h(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,g(n.key),n)}}function _(e,t,r){return(t=g(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g(e){var t=function(e,t){if("object"!==v(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===v(t)?t:String(t)}var S=function(){function e(t,r){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,"removeValidationErrors",(function(){n._inputList.forEach((function(e){n._hideError(e)}))})),_(this,"enableSubmitButton",(function(){n._submitButton.disabled=!1})),_(this,"disableSubmitButton",(function(){n._submitButton.disabled=!0})),_(this,"enableValidation",(function(){n._setEventListener()})),this._config=t,this._form=r,this._inputList=this._form.querySelectorAll(this._config.inputSelector),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}var t,r;return t=e,(r=[{key:"_hideError",value:function(e){var t=this._form.querySelector("".concat(this._config.errorMessageSelector).concat(e.name));t.textContent="",t.classList.remove(this._config.textErrorClass),e.classList.remove(this._config.inputErrorClass)}},{key:"_showError",value:function(e){var t=this._form.querySelector("".concat(this._config.errorMessageSelector).concat(e.name));t.textContent=e.validationMessage,t.classList.add(this._config.textErrorClass),e.classList.add(this._config.inputErrorClass)}},{key:"_isInputValid",value:function(e){e.validity.valid?this._hideError(e):this._showError(e)}},{key:"_hasInvalidInput",value:function(){return Array.from(this._inputList).some((function(e){return!e.validity.valid}))}},{key:"_toggleSubmitButton",value:function(){this._submitButton.disabled=this._hasInvalidInput()}},{key:"_setEventListener",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(t){e._isInputValid(t.target),e._toggleSubmitButton()}))}))}}])&&d(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function k(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==w(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==w(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===w(o)?o:String(o)),n)}var o}var O=function(){function e(t,r){var n=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=n,this._container=document.querySelector(r)}var t,r;return t=e,r=[{key:"addItem",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._itemElement;this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._itemElement=t._renderer(e),t.addItem()}))}}],r&&k(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function P(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==j(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==j(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===j(o)?o:String(o)),n)}var o}var E=function(){function e(t){var r=t.nameSelector,n=t.aboutSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(r),this._about=document.querySelector(n),this._avatar=document.querySelector(o)}var t,r;return t=e,(r=[{key:"setUserAvatar",value:function(e){this._avatar.src=e}},{key:"setUserInfo",value:function(e,t){this._name.textContent=e,this._about.textContent=t,this._avatar.alt=e}}])&&P(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function L(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,q(n.key),n)}}function I(e,t,r){return(t=q(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function q(e){var t=function(e,t){if("object"!==C(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==C(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===C(t)?t:String(t)}var T=function(){function e(t){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),I(this,"_handleEscClose",(function(e){"Escape"===e.key&&r.close()})),I(this,"_handleCloseClick",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&r.close()})),this._popup=document.querySelector(t)}var t,r;return t=e,(r=[{key:"setEventListeners",value:function(){this._popup.addEventListener("click",this._handleCloseClick),document.addEventListener("keyup",this._handleEscClose)}},{key:"open",value:function(){this.setEventListeners(),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose),this._popup.removeEventListener("click",this._handleCloseClick)}}])&&L(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function x(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==R(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==R(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===R(o)?o:String(o)),n)}var o}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=B(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},D.apply(this,arguments)}function U(e,t){return U=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},U(e,t)}function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},B(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&U(e,t)}(c,e);var t,r,n,o,i=(n=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=B(n);if(o){var r=B(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===R(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e))._popupImagePhoto=t._popup.querySelector(".popup-image__photo"),t._popupImageCaption=t._popup.querySelector(".popup-image__caption"),t}return t=c,(r=[{key:"_setImageParameters",value:function(){this._popupImagePhoto.src=this._link,this._popupImagePhoto.alt=this._name,this._popupImageCaption.textContent=this._name}},{key:"open",value:function(e,t){D(B(c.prototype),"open",this).call(this),this._name=e,this._link=t,this._setImageParameters()}}])&&x(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(T);function V(e){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},V(e)}function z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?z(Object(r),!0).forEach((function(t){G(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function F(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,K(n.key),n)}}function N(){return N="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=W(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},N.apply(this,arguments)}function J(e,t){return J=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},J(e,t)}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function W(e){return W=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},W(e)}function G(e,t,r){return(t=K(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function K(e){var t=function(e,t){if("object"!==V(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==V(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===V(t)?t:String(t)}var Q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&J(e,t)}(c,e);var t,r,n,o,i=(n=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=W(n);if(o){var r=W(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===V(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return H(e)}(this,e)});function c(e,t){var r,n=t.callbackSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),G(H(r=i.call(this,e)),"_getInputValues",(function(){return Array.from(r._form.querySelectorAll(".form__input")).reduce((function(e,t){return M(M({},e),{},G({},t.name,t.value))}),{})})),G(H(r),"_hanldeSubmitClick",(function(e){return r._callbackSubmit(e,r._getInputValues(),r._popup)})),r._callbackSubmit=n,r._form=r._popup.querySelector(".form"),r}return t=c,(r=[{key:"setEventListeners",value:function(){N(W(c.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._hanldeSubmitClick)}},{key:"close",value:function(){N(W(c.prototype),"close",this).call(this),this._form.removeEventListener("submit",this._hanldeSubmitClick),this._form.reset()}}])&&F(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(T);function X(e){return X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},X(e)}function Y(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,re(n.key),n)}}function Z(){return Z="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=te(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},Z.apply(this,arguments)}function $(e,t){return $=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},$(e,t)}function ee(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function te(e){return te=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},te(e)}function re(e){var t=function(e,t){if("object"!==X(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==X(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===X(t)?t:String(t)}var ne=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&$(e,t)}(c,e);var t,r,n,o,i=(n=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=te(n);if(o){var r=te(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===X(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return ee(e)}(this,e)});function c(e,t){var r,n,o,u,a=t.handleButtonClick;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),n=ee(r=i.call(this,e)),u=function(){r._handleButtonClick(r._elementForDelete,r._cardId)},(o=re(o="_deleteCard"))in n?Object.defineProperty(n,o,{value:u,enumerable:!0,configurable:!0,writable:!0}):n[o]=u,r._handleButtonClick=a,r._button=r._popup.querySelector(".button"),r}return t=c,(r=[{key:"setEventListeners",value:function(){Z(te(c.prototype),"setEventListeners",this).call(this),this._button.addEventListener("click",this._deleteCard)}},{key:"open",value:function(e,t){Z(te(c.prototype),"open",this).call(this),this._cardId=t,this._elementForDelete=e}},{key:"close",value:function(){Z(te(c.prototype),"close",this).call(this),this._button.removeEventListener("click",this._deleteAction)}}])&&Y(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(T),oe=new y({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-65",headers:{authorization:"76bd6af4-1eb8-427e-97cd-2bc6cdc45941","Content-Type":"application/json"}}),ie=new S(c,e);ie.enableValidation();var ce=new S(c,o);ce.enableValidation();var ue=new S(c,r);ue.enableValidation();var ae=new ne(".popup-delete",{handleButtonClick:function(e,t){oe.deleteCard(e,t),ae.close()}}),le=new A(".popup-image"),se=function(e){return new b(e,"#elements__template",{handleCardClick:function(e,t){le.open(e,t)},handleLikeClick:function(e,t){var r=e.classList.contains("elements__like_type_active")?"DELETE":"PUT";oe.likeCard(t,r).then((function(t){e.classList.toggle("elements__like_type_active"),e.closest(".elements__content").querySelector(".elements__like-count").textContent=t.likes.length})).catch((function(e){console.error(e)}))},handleDeleteClick:function(e,t){ae.open(e,t)}}).generateCard()},fe=new O({renderer:function(e){return se(e)}},".elements__list-item"),pe=new E({nameSelector:".profile__name",aboutSelector:".profile__profession",avatarSelector:".profile__image"});oe.getUserInfo().then((function(e){var t=e.name,r=e.about,n=e.avatar;return pe.setUserInfo(t,r),pe.setUserAvatar(n),oe.getInitialCards()})).then((function(e){return fe.renderItems(e)})).catch((function(e){console.error(e)}));var ye=new Q(".popup-profile",{callbackSubmit:function(e,t,r){var n=t["profile-name"],o=t["profile-profession"];e.preventDefault(),oe.saveUserInfo(n,o,r).then((function(e){var t=e.name,r=e.about;pe.setUserInfo(t,r)})).catch((function(e){console.error(e)})),ye.close()}}),me=new Q(".popup-avatar",{callbackSubmit:function(e,t,r){var n=t["avatar-link"];e.preventDefault(),oe.editUserAvatar(n,r).then((function(e){var t=e.avatar;pe.setUserAvatar(t)})).catch((function(e){console.error(e)})),me.close()}}),he=new Q(".popup-card",{callbackSubmit:function(e,t,r){var n=t["card-name"],o=t["card-link"];e.preventDefault(),oe.saveCard(n,o,r).then((function(e){e.isMyCard=!0;var t=se(e);fe.addItem(t)})).catch((function(e){console.error(e)})),he.close()}});t.addEventListener("click",(function(){oe.getUserInfo().then((function(t){var r=t.name,n=t.about;e["profile-name"].value=r,e["profile-profession"].value=n,ie.removeValidationErrors(),ie.enableSubmitButton(),ye.open()})).catch((function(e){console.error(e)}))})),n.addEventListener("click",(function(){ue.removeValidationErrors(),ue.disableSubmitButton(),me.open()})),i.addEventListener("click",(function(){ce.removeValidationErrors(),ce.disableSubmitButton(),he.open()}))})();