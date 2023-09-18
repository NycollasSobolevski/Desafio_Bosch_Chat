const CryptoJS = require('crypto-js')

class Decrypt {
    static async decrypt(data, verbose=false) { 
        const pass = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD

        const decrypt = JSON.parse(
            CryptoJS.AES.decrypt(data, pass)
            .toString(
                CryptoJS.enc.Utf8
            )
        )
        
        if (verbose) {
            console.log("Pass: " + pass)

            console.log("Decrypted: ")
            console.log(decrypt)
        }

        return decrypt
    }
}

module.exports = Decrypt