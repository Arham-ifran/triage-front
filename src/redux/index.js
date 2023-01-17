import { combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import kycReducer from '../components/KYC/kyc.reducer'
import errorReducer from './shared/error/error.reducer'
import addressBookReducer from './addressBook/addressBook.reducer'
import cmsReducer from '../components/cms/cms.reducer'
import walletReducer from './wallet/wallet.reducer'
import footerReducer from '../components/shared/footer/footer.reducer'
import faqsReducer from '../components/faqs/faqs.reducer'
import promoCodeReducer from "../components/promoCode/promoCode.reducer"
import accountLevelReducer from '../components/accountLevel/accountLevel.reducer'
import dashboardReducer from './dashboard/dashboard.reducer'
import historyReducer from '../components/history/history.reducer'
import qrReucer from '../components/qrCode/qr.reducer'
import settingsReducer from "./settings/settings.reducer"


export default combineReducers({
    user: userReducer,
    error: errorReducer,
    kyc: kycReducer,
    address: addressBookReducer,
    cms: cmsReducer,
    wallets: walletReducer,
    footer: footerReducer,
    faqs: faqsReducer,
    promocodes: promoCodeReducer,
    accountLevel: accountLevelReducer,
    dashboard: dashboardReducer,
    history: historyReducer,
    settings: settingsReducer,
    qr: qrReucer
})