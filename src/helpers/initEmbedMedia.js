export default function (element) {
    const html5VideoRegex = /^(https?:\/\/[^\s]*\.(?:ogg|ogv|mp4|webm))$/;
    const youtubeVideoRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const vocarooRegex = /^https?:\/\/(?:voca.ro|vocaroo.com)\/(.*)$/;

    const links = element.querySelectorAll('a');
    for (const link of links) {
        if (html5VideoRegex.test(link.href)) {
            const video = document.createElement('video');
            video.src = link.href;
            video.style.width = '100%';
            video.controls = true;
            link.insertAdjacentElement('afterend', video);
        }

        if (youtubeVideoRegex.test(link.href)) {
            const matches = youtubeVideoRegex.exec(link.href);
            const videoId = matches[7];
            const url = `https://www.youtube.com/embed/${videoId}`;
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.border = 0;
            iframe.style.width = '100%';
            iframe.allowFullscreen = true;
            link.insertAdjacentElement('afterend', iframe);
            setTimeout(() => {
                const width = iframe.getBoundingClientRect().width;
                iframe.style.height = `${width / (16 / 9)}px`;
            }, 0);
        }

        if (vocarooRegex.test(link.href)) {
            // https://vocaroo.com/1iQV13xqWj0U
            // https://voca.ro/1iQV13xqWj0U
            const [,vocarooId] = vocarooRegex.exec(link.href);
            const url = `https://vocaroo.com/embed/${vocarooId}?autoplay=0`;
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.border = 0;
            iframe.style.width = '300px';
            iframe.style.height = '60px';

            link.insertAdjacentElement('afterend', iframe);
            link.insertAdjacentHTML('afterend', '<br>');
        }

        // if() {
        //     <iframe scrolling="no" frameborder="0" allowtransparency="true" title="Sondages Pixule" width="370" height="365" src="//www.pixule.com/widget443889228928" data-key="443889228928"></iframe>
        // }
    }
}