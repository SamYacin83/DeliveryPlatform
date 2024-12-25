using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.Extensions;

namespace Digitalizer.DeliveryPlatform.WebApi.AddTestEndpoint;

public class EndPointTest : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/", () => "Hello World!")
           .WithName("Test")
           .WithTags("DeliveryPlatformTest")
           .WithOpenApi()
           .WithApiDescription(
               "Endpoint de test",
               "Retourne un message Hello World"
           );

#pragma warning disable CA1861
        app.MapGet("/api/items", () => Results.Ok(new[] { "item1", "item2" }))
#pragma warning restore CA1861
           .WithApiDescription(
               "Récupère la liste des items",
               "Retourne tous les items disponibles"
           );
    }
}
