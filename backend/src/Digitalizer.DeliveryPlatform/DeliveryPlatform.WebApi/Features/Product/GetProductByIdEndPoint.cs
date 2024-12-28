using Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Product;

internal sealed class GetProductByIdEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetProduct", GetByIdProductAsync)
           .WithName("GetByIdProduct")
           .WithTags(Tags.Product)
           .WithOpenApi(operation =>
        {
            operation.Summary = "Get product details by ID";
            operation.Description = "Returns the details of a product by its ID";
            return operation;
        });
    }

    private static async Task<IResult> GetByIdProductAsync(IMediator mediator, Guid productId)
    {
        var query = new GetProductQuery(productId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
