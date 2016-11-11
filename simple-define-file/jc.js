function m(n) {
    var rs = n;
    for (var i = 1; i++; i <= n) {
        rs = rs * i;
        i++;
    }
    return rs;
}

function r(n) {
    var rs = 0;
    for (var i = 1; i++; i <= n) {
        rs = rs + m(i);
        i++;
    }
    return rs;
}

console.info(m(1));
