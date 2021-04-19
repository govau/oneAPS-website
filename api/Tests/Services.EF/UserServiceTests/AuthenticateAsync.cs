using Dta.OneAps.Api.Services.Entities;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Moq;
using System;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Sql;

namespace Dta.OneAps.Api.Tests.Services.EF.UserServiceTests {
    public class AuthenticateAsync : IDisposable {
        private OneApsContext _context;
        public AuthenticateAsync() {
            var options = new DbContextOptionsBuilder<OneApsContext>()
                .UseInMemoryDatabase("db")
                .Options;

            _context = new OneApsContext(options);
            _context.Database.EnsureCreated();
        }
        public void Dispose() {
            _context.Dispose();
        }

        [Theory]
        [InlineData("foo@email.com0", "foobar", true, 0)]
        [InlineData("foo@email.com1", "foobar", true, 1)]
        [InlineData("foo@email.com2", "foobar", true, 2)]
        [InlineData("foo@email.com3", "foobar", true, 3)]
        [InlineData("foo@email.com4", "foobar", true, 4)]
        [InlineData("foo@email.com5", "foobar", true, 5)]
        public async Task Can_Authenticate(string emailAddress, string password, bool active, int failedLoginCount) {
            await _context.User.AddAsync(new User {
                EmailAddress = emailAddress,
                Password = password,
                Active = active,
                FailedLoginCount = failedLoginCount
            });
            await _context.SaveChangesAsync();

            var usersController = new UserService(_context);
            var user = await usersController.AuthenticateAsync(emailAddress);

            Assert.NotNull(user);
        }

        [Theory]
        [InlineData("fail@email.com0", "foobar", false, 0, null)]
        [InlineData("fail@email.com2", "foobar", true, 0, "fail@email.com22")]
        public async Task Cannot_Authenticate(string emailAddress, string password, bool active, int failedLoginCount, string wrongEmailAddress) {
            await _context.User.AddAsync(new User {
                EmailAddress = emailAddress,
                Password = password,
                Active = active,
                FailedLoginCount = failedLoginCount
            });
            await _context.SaveChangesAsync();

            var usersController = new UserService(_context);
            var e = emailAddress;
            if (!string.IsNullOrWhiteSpace(wrongEmailAddress)) {
                e = wrongEmailAddress;
            }
            var user = await usersController.AuthenticateAsync(e);

            Assert.Null(user);
        }
    }
}
