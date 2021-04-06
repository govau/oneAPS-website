namespace Dta.OneAps.Api.Business.Utils {
    public interface IEncryptionUtil {
        string Encrypt(string value);
        string Encrypt(string value, bool randomSalt);
    }
}
