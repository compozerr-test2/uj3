using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Uj3.Services;

namespace Uj3.Endpoints.Uj3;

public static class Uj3Route
{
    public static RouteHandlerBuilder AddUj3Route(this IEndpointRouteBuilder app)
    {
        return app.MapGet("/", (string name, IUj3Service uj3Service) => new GetUj3Response($"Hello, {uj3Service.GetObfuscatedName(name)}!"));
    }
}