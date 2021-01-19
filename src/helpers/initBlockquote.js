import { VBtn } from 'vuetify/lib';

export default function (element) {
    element.childNodes.forEach((child) => {
        if (child instanceof HTMLQuoteElement) {
            const children = Array.prototype.slice.call(child.childNodes);
            children.forEach((grandChild) => {
                if (grandChild instanceof HTMLQuoteElement) {
                    grandChild.style.display = 'none';

                    const node = document.createElement('div');
                    grandChild.insertAdjacentElement('beforebegin', node);

                    const btn = new VBtn({
                        propsData: {
                            color: 'secondary',
                            xSmall: true,
                            depressed: true
                        }
                    });

                    const displayText = btn.$createElement('div', ['Voir la citation']);
                    btn.$slots.default = [displayText];

                    btn.$mount(node);
                    let display = false;
                    btn.$el.classList.add('mb-4');
                    btn.$el.addEventListener('click', () => {
                        display = !display;
                        if (display) {
                            grandChild.style.display = 'block';
                            displayText.elm.textContent = 'Replier la citation';
                        } else {
                            grandChild.style.display = 'none';
                            displayText.elm.textContent = 'Voir la citation';
                        }
                    });
                }
            });
        }
    });
}