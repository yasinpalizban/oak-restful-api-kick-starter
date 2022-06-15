import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import AuthController from "../controllers/auth.controller.ts";
import isSignInMiddleware from "../middlewares/is.sign.in.middleware.ts";
import {authResetPasswordPhoneValidation} from "../validations/auth.reset.password.phone.validation.ts";
import {authResetPasswordEmailValidation} from "../validations/auth.reset.password.email.validation.ts";
import {authForgotValidation} from "../validations/auth.forgot.validation.ts";
import {authSendActivatePhoneValidation} from "../validations/auth.send.activate.phone.validation.ts";
import {authSignupValidation} from "../validations/auth.signup.validation.ts";
import {authActivateTokenEmailValidation} from "../validations/auth.activate.token.email.validation.ts";
import {authSendActivateEmailValidation} from "../validations/auth.send.activate.email.validation.ts";
import {authActivateTokenPhoneValidation} from "../validations/auth.activate.token.phone.validation.ts";
import {authSigninValidation} from "../validations/auth.signin.validation.ts";

export default class AuthRoute implements Routes {
  public pathNested = '/api/auth/';
  public router =  new Router();
  public controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // const createLimiter = rateLimit({
    //   windowMs: 60 * 60 * 1000, // 1 hour window
    //   max: 5, // start blocking after 5 requests
    //   message: i18n.t('middleWear.throttle'),
    // });
    this.router.post(`${this.pathNested}signin`, isSignInMiddleware,validatorMiddleware({bodyRules:authSigninValidation}), this.controller.signIn);
    this.router.post(`${this.pathNested}signout`, authMiddleware, this.controller.signOut);

    this.router.post(`${this.pathNested}signup`, isSignInMiddleware,validatorMiddleware({bodyRules:authSignupValidation}), this.controller.signUp);
    this.router.post(
      `${this.pathNested}activate-account-email`,
      isSignInMiddleware,
     validatorMiddleware({bodyRules:authActivateTokenEmailValidation}),
      this.controller.activationViaEmail,
    );
    this.router.post(
      `${this.pathNested}send-activate-email`,
      isSignInMiddleware,
     validatorMiddleware({bodyRules:authSendActivateEmailValidation}),
      this.controller.sendActivateCodeViaEmail,
    );
    this.router.post(
      `${this.pathNested}activate-account-sms`,
      isSignInMiddleware,
     validatorMiddleware({bodyRules:authActivateTokenPhoneValidation}),
      this.controller.activationViaSms,
    );
    this.router.post(
      `${this.pathNested}send-activate-sms`,
      isSignInMiddleware,
     validatorMiddleware({bodyRules:authSendActivatePhoneValidation}),
      this.controller.sendActivateCodeViaSms,
    );

    this.router.post(`${this.pathNested}forgot`, isSignInMiddleware,validatorMiddleware({bodyRules:authForgotValidation}), this.controller.forgot);
    this.router.post(
      `${this.pathNested}reset-password-email`,
      isSignInMiddleware,
     validatorMiddleware({bodyRules:authResetPasswordEmailValidation}),
      this.controller.resetPasswordViaEmail,
    );
    this.router.post(
      `${this.pathNested}reset-password-sms`,
      isSignInMiddleware,
     validatorMiddleware({bodyRules:authResetPasswordPhoneValidation}),
      this.controller.resetPasswordViaSms,
    );
  }
}
