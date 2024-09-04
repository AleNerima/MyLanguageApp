using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using LanguageAppBackend.Data;
using LanguageAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackend.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _secretKey = configuration.GetValue<string>("Jwt:SecretKey");
            _issuer = configuration.GetValue<string>("Jwt:Issuer");
            _audience = configuration.GetValue<string>("Jwt:Audience");
        }

        public async Task<string> AuthenticateUserAsync(LoginViewModel loginModel)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginModel.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, user.PasswordHash))
            {
                Console.WriteLine("Authentication failed for user: {0}", loginModel.Email);
                return null;
            }

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Name, user.Username)
    };

            // Debug: Stampa i claims
            Console.WriteLine("Claims:");
            foreach (var claim in claims)
            {
                Console.WriteLine("Type: {0}, Value: {1}", claim.Type, claim.Value);
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Debug: Stampa il token
            Console.WriteLine("Generated JWT token: {0}", tokenString);

            return tokenString;
        }


        public async Task<User> RegisterUserAsync(RegisterViewModel registerModel)
        {
            var user = new User
            {
                Email = registerModel.Email,
                Username = registerModel.Username,
                NativeLanguage = registerModel.NativeLanguage,
                TargetLanguage = registerModel.TargetLanguage,
                CreatedAt = DateTime.UtcNow,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerModel.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public Task LogoutAsync()
        {
            // JWT è stateless, quindi il logout è gestito dal client.
            return Task.CompletedTask;
        }
    }
}
