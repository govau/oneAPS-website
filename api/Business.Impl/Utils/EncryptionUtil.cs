using System;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business.Utils {
    public class EncryptionUtil : IEncryptionUtil {
        private readonly IOptions<AppSettings> _appSettings;
        private static readonly char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();

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

        public string GetUniqueKey(int size) {
            byte[] data = new byte[4 * size];
            using (var crypto = new RNGCryptoServiceProvider()) {
                crypto.GetBytes(data);
            }
            var result = new StringBuilder(size);
            for (int i = 0; i < size; i++) {
                var rnd = BitConverter.ToUInt32(data, i * 4);
                var idx = rnd % chars.Length;

                result.Append(chars[idx]);
            }

            return result.ToString();
        }
    }
}
