using Carter;
using Microsoft.AspNetCore.Routing;

namespace Uj3.Endpoints.Uj3;

public class Uj3Group : CarterModule
{
    public Uj3Group() : base("/uj3")
    {
        WithTags(nameof(Uj3));
    }

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.AddUj3Route();
    }
}