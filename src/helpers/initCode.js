import Prism from 'prismjs';

import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js';

export default function (element) {
    const codes = element.querySelectorAll('code');
    for (const code of codes) {
        code.parentElement.classList.add('line-numbers');
        code.parentElement.style.maxHeight = '500px';
        Prism.highlightElement(code);
    }
}
