import { BEFORE_CMS, GET_CMS, LIST_CMS } from '../../redux/types';

const initialState = {
    listCms: {},
    listCmsAuth: false,
    getCms: {},
    getCmsAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_CMS:
            return {
                ...state,
                listCms: action.payload,
                listCmsAuth: true
            }
        case GET_CMS:
            return {
                ...state,
                getCms: action.payload,
                getCmsAuth: true
            }
        case BEFORE_CMS:
            return {
                ...state,
                listCms: {},
                listCmsAuth: false,
                getCms: {},
                getCmsAuth: false
            }
        default:
            return {
                ...state
            }
    }
}