import codecss from '!!raw-loader!./code.css';
import heticss from '!!raw-loader!./heti.css';
import indexcss from '!!raw-loader!./index.css';
import unocss from '!!raw-loader!../../../uno.css';

const blogcss = [codecss, heticss, indexcss, unocss].join('\n');

export default blogcss;
