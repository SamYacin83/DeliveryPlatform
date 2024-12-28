using Digitalizer.DeliveryPlatform.Application.Features.Product.GetAllProducts;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Product;

internal sealed class GetAllProductEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetAllProduct", GetAllProductAsync)
           .WithName("GetAllProductAsync")
           .WithTags(Tags.Product)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get all product details";
               operation.Description = "Returns the details of all products including their items";
               return operation;
           });
    }

    private static async Task<IResult> GetAllProductAsync(IMediator mediator)
    {
        var query = new GetAllProductsQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
