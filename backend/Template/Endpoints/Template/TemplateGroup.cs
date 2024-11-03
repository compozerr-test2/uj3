using Carter;
using Microsoft.AspNetCore.Routing;

namespace Template.Endpoints.Template;

public class TemplateGroup : CarterModule
{
    public TemplateGroup() : base("/template")
    {
        WithTags(nameof(Template));
    }

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.AddTemplateRoute();
    }
}