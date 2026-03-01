// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.

using IdentityModel;
using System.Security.Claims;
using System.Text.Json;
using Duende.IdentityServer;
using Duende.IdentityServer.Test;

namespace IdentityServer;

public static class TestUsers
{
    public static List<TestUser> Users
    {
        get
        {
            var address = new
            {
                street_address = "One Hacker Way",
                locality = "Heidelberg",
                postal_code = "69118",
                country = "Germany"
            };
                
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "admin",
                    Password = "pass",
                    Claims =
                    {
                        new Claim(JwtClaimTypes.Name, "Admin User"),
                        new Claim(JwtClaimTypes.GivenName, "Admin"),
                        new Claim(JwtClaimTypes.FamilyName, "User"),
                        new Claim(JwtClaimTypes.Email, "admin@personalweb.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim("role", "admin")
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "guest",
                    Password = "pass",
                    Claims =
                    {
                        new Claim(JwtClaimTypes.Name, "Guest User"),
                        new Claim(JwtClaimTypes.GivenName, "Guest"),
                        new Claim(JwtClaimTypes.FamilyName, "User"),
                        new Claim(JwtClaimTypes.Email, "guest@personalweb.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim("role", "guest")
                    }
                }
            };
        }
    }
}