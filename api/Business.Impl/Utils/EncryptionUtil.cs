using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business.Utils {
    public class EncryptionUtil : IEncryptionUtil {
        private readonly IOptions<AppSettings> _appSettings;
        public EncryptionUtil(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings;
        }
        public string Encrypt(string value) {
            return Encrypt(value, false);
        }
        public string Encrypt(string value, bool randomSalt) {
            var salt = System.Text.Encoding.Unicode.GetBytes(_appSettings.Value.Salt);
            if (randomSalt) {
                salt = new byte[128 / 8];
                using (var rng = RandomNumberGenerator.Create()) {
                    rng.GetBytes(salt);
                }
            }
            string encrypted = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: value,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 1000000,
                    numBytesRequested: 256 / 8
                )
            );
            return encrypted;
        }
    }
}
