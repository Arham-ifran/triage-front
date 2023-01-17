// importing layout
import Layout1 from "./layouts/layout1";

// importing all the themes
import Home from './components/home/home';
import Login from "./components/login/login";
import Layout2 from "./layouts/layout2";
import ForgetPassword from "./components/login/forgetPassword";
import Signup from "./components/signup/signup";
import Wallets from "./components/wallets/wallets";
import Deposit from "./components/deposit/deposit";
import EarnInterest from "./components/earnInterest/earnInterest";
import Dashboard from "./components/dashboard/dashboard";
import Tri_Management from "./components/triManagement/triManagement";
import WalletDetails from "./components/wallets/walletDetails";
import Withdrawal from "./components/withdrawal/withdrawal";
import MyAccount from "./components/myAccount/myAccount";
import KYC from "./components/KYC/KYC";
import ResetPassword from "./components/login/resetPassword";
import LiveTriage from "./components/liveTriage/liveTriage";
import Exchange from "./components/exchange/exchange";
import AccountLevel from "./components/accountLevel/accountLevel";
import History_side from "./components/history/history";
import Referral from "./components/referral/referral";
import Promo_Code from "./components/promoCode/promoCode";
import Locked from "./components/dashboard/lockedProfit";
import Staking from "./components/staking/staking";
import ContactUs from "./components/contactUs/contactUs";
import Cms from "./components/cms/cms";
import Faqs from "./components/faqs/faqs";
import Arbitrage from "./components/arbitrage/arbitrage";
import ExchangeTriage from "./components/exchangeTriage/exchangeTriage";
import About from "./components/about/about";
import SmartLevels from "./components/smartLevels/smartLevels";
import TermsConditions from "./components/termsConditions/termsConditions";
import Payment from "./components/payment/payment";
import NotFound from "./notFoundPage/notFoundPage";
import Layout3 from "./layouts/layout3";
import InformativePages from "./components/InformativePages/informativePages"
import PrivacyPolicy from "./components/privacyPolicy/privacyPolicy"

const routes = [
    {
        path: "/",
        layout: Layout1,
        access: true,
        exact: true,
        component: Home,
    },
    {
        path: "/cms/:slug",
        layout: Layout1,
        access: true,
        exact: true,
        component: Cms,
    },
    {
        path: "/sign-in",
        layout: Layout1,
        access: true,
        exact: true,
        component: Login,
    },
    {
        path: "/forget-password",
        layout: Layout1,
        access: true,
        exact: true,
        component: ForgetPassword,
    },
    {
        path: "/terms-conditions",
        layout: Layout1,
        access: true,
        exact: true,
        component: TermsConditions,
    },
    {
        path: "/privacy-policy",
        layout: Layout1,
        access: true,
        exact: true,
        component: PrivacyPolicy,
    },
    {
        path: "/informative-pages",
        layout: Layout1,
        access: true,
        exact: true,
        component: InformativePages,
    },
    {
        path: "/reset-password/:userId/:resetPasswordToken",
        layout: Layout1,
        access: true,
        exact: true,
        component: ResetPassword,
    },
    {
        path: "/sign-up",
        layout: Layout1,
        access: true,
        exact: true,
        component: Signup,
    },
    {
        path: "/staking",
        layout: Layout1,
        access: true,
        exact: true,
        component: Staking,
    },
    {
        path: "/contact",
        layout: Layout1,
        access: true,
        exact: true,
        component: ContactUs,
    },
    {
        path: "/faqs",
        layout: Layout1,
        access: true,
        exact: true,
        component: Faqs,
    },
    {
        path: "/arbitrage",
        layout: Layout1,
        access: true,
        exact: true,
        component: Arbitrage,
    },
    {
        path: "/exchange-triage",
        layout: Layout1,
        access: true,
        exact: true,
        component: ExchangeTriage,
    },
    {
        path: "/about",
        layout: Layout1,
        access: true,
        exact: true,
        component: About,
    },
    {
        path: "/smart-levels",
        layout: Layout1,
        access: true,
        exact: true,
        component: SmartLevels,
    },
    {
        path: "/payment",
        layout: Layout1,
        access: true,
        exact: true,
        component: Payment,
    },
    {
        path: "/wallet",
        layout: Layout2,
        access: true,
        exact: true,
        component: Wallets,
    },
    {
        path: "/deposit",
        layout: Layout2,
        access: true,
        exact: true,
        component: Deposit,
    },
    {
        path: "/deposit/:currencyParam",
        layout: Layout2,
        access: true,
        exact: true,
        component: Deposit,
    },
    {
        path: "/earn-interest",
        layout: Layout2,
        access: true,
        exact: true,
        component: EarnInterest,
    },
    {
        path: "/earn-interest/:currencyParam",
        layout: Layout2,
        access: true,
        exact: true,
        component: EarnInterest,
    },
    {
        path: "/dashboard",
        layout: Layout2,
        access: true,
        exact: true,
        component: Dashboard,
    },
    {
        path: "/tri-management",
        layout: Layout2,
        access: true,
        exact: true,
        component: Tri_Management,
    },
    {
        path: "/wallets/details",
        layout: Layout2,
        access: true,
        exact: true,
        component: WalletDetails,
    },
    {
        path: "/withdrawal",
        layout: Layout2,
        access: true,
        exact: true,
        component: Withdrawal,
    },
    {
        path: "/withdrawal/:currencyParam",
        layout: Layout2,
        access: true,
        exact: true,
        component: Withdrawal,
    },
    {
        path: "/my-account",
        layout: Layout2,
        access: true,
        exact: true,
        component: MyAccount,
    },
    {
        path: "/KYC",
        layout: Layout2,
        access: true,
        exact: true,
        component: KYC,
    },
    {
        path: "/live-triage",
        layout: Layout2,
        access: true,
        exact: true,
        component: LiveTriage,
    },
    {
        path: "/exchange",
        layout: Layout2,
        access: true,
        exact: true,
        component: Exchange,
    },
    {
        path: "/account-level",
        layout: Layout2,
        access: true,
        exact: true,
        component: AccountLevel,
    },
    {
        path: "/history",
        layout: Layout2,
        access: true,
        exact: true,
        component: History_side,
    },
    {
        path: "/referral",
        layout: Layout2,
        access: true,
        exact: true,
        component: Referral,
    },
    {
        path: "/promo-code",
        layout: Layout2,
        access: true,
        exact: true,
        component: Promo_Code,
    },
    {
        path: "*",
        layout: Layout3,
        access: true,
        exact: true,
        component:NotFound ,
    },

];

export default routes;