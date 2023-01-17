import { BEFORE_FAQ_CAT, LIST_FAQ_CAT, BEFORE_FAQ, LIST_FAQ } from '../../redux/types';

const initialState = {
    listFaqCats: {},
    listFaqCatsAuth: false,
    listFaq: {},
    listFaqAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_FAQ_CAT:
            return {
                ...state,
                listFaqCats: action.payload,
                listFaqCatsAuth: true
            }
        case BEFORE_FAQ_CAT:
            return {
                ...state,
                listFaqCats: {},
                listFaqCatsAuth: false,
            }
        case LIST_FAQ:
            return {
                ...state,
                listFaq: action.payload,
                listFaqAuth: true
            }
        case BEFORE_FAQ:
            return {
                ...state,
                listFaq: {},
                listFaqAuth: false
            }
        default:
            return {
                ...state
            }
    }
}