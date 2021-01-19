export default function (str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .map((e) => e.replace(/\W/g, ''))
        .filter((e) => e.length > 0)
        .join('-')
        .toLowerCase();
}