import {LANG_DEFAULT} from '../const';
import * as pt_BR from './pt_BR';
import * as en_US from './en_US';

const mapping: any = {
    'pt-BR': pt_BR,
    'pt-PT': pt_BR,
    'en-US': en_US,
    'en-EN': en_US,
};

let strings: any = (Object.keys(mapping).indexOf(navigator.language)>-1)?
    mapping[navigator.language] : mapping[LANG_DEFAULT];

export default strings;