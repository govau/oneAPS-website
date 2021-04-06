using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Shared;
using Microsoft.Extensions.Options;
using Xunit;
using Moq;

namespace Dta.OneAps.Api.Tests.Controllers.UsersControllerTests {
    public class Encrypt {
        public Encrypt() {
        }

        [Theory]
        [InlineData("foobar", "ZFL10I69XCjk5iImBDBz+vDTVH3kBx8piuLqIE3G/FY=")]
        [InlineData("barfoo", "PqT6cAfYK7rIq+3Mh8say/g0/7OXbKQqwSPLY6T0o7g=")]
        public void Can_Encrypt(string value, string expected) {
            var appSettingsMock = new Mock<IOptions<AppSettings>>();
            appSettingsMock.Setup(ac => ac.Value).Returns(new AppSettings {
                Salt = "secret"
            });
            var encryptionUtil = new EncryptionUtil(appSettingsMock.Object);
            var encrypted = encryptionUtil.Encrypt(value);
            Assert.Equal(expected, encrypted);
        }

        [Theory]
        [InlineData("foobar", "ZFL10I69XCjk5iImBDBz+vDTVH3kBx8piuLqIE3G/FY=")]
        [InlineData("barfoo", "PqT6cAfYK7rIq+3Mh8say/g0/7OXbKQqwSPLY6T0o7g=")]
        public void Can_Encrypt_With_Random_Salt(string value, string expected) {
            var appSettingsMock = new Mock<IOptions<AppSettings>>();
            appSettingsMock.Setup(ac => ac.Value).Returns(new AppSettings {
                Salt = "secret"
            });
            var encryptionUtil = new EncryptionUtil(appSettingsMock.Object);
            var encrypted = encryptionUtil.Encrypt(value, true);
            Assert.NotEqual(expected, encrypted);
        }
    }
}
