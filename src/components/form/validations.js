import { isEmpty as _isEmpty } from 'lodash';

export const validateDate = value => {
    const reg = /^((((?:((0?[1-9])|([12][0-9]))|30)\/(?:([0]?[13-9]|10|11|12))|(?:31\/(?:([0]?[13578]|10|12)))|(?:(0?[1-9])|(1[0-9])|(2[0-8]))\/0?2)\/(?:\d{4}))|(29\/0?2\/\d{2}(?:([02468][048])|([159][26]))))$/;

    if( !_isEmpty(value) && !reg.test(value) ){
        throw 'Invalid date';
    }
}