using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Template.Services;

namespace Template.Endpoints.Template;

public static class TemplateRoute
{
    public static RouteHandlerBuilder AddTemplateRoute(this IEndpointRouteBuilder app)
    {
        return app.MapGet("/", (string name, ITemplateService templateService) => new GetTemplateResponse($"Hello, {templateService.GetObfuscatedName(name)}!"));
    }
}