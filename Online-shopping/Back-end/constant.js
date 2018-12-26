var bcrypt = require('bcrypt');

bcrypt.hash('online-shopping-secret-key-encryption', 12, (err, hash) => {
    if(err) throw err;
    if(hash) {
        const secretKey = hash;
    }
});

module.exports = {
    SECRET_KEY: 'hdfgkjdghds-fdg-s--f-dsf--g-fds-fdgfdmmgnhmf-3465463-@#$@$4546456577-mb-gh'+
    'jfhgjkhkfdhjgfkj-gfhfhgfgh-hgfd-65685784894095809trjgfjfdhgjkhkjhgjgkjgjknkjfdskjngkdgjkj'+
    'hkjfgkhljklhlk-97865809*(*(*88904853297576928965898767687567590008908)^&%$%^$^%%$^%$674755'
}

